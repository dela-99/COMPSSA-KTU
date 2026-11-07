<#
.SYNOPSIS
  Measures Next.js dev-server startup and first-route compilation latency.

.DESCRIPTION
  Starts `next dev` on an isolated port, then times:
    1. Server startup  - process spawn -> "Ready" banner.
    2. First route     - GET /        -> first byte (cold compile).
    3. Second route    - GET /library -> first byte (cold compile of a new route).
    4. Warm re-route   - GET /        -> first byte (already compiled).
    5. Warm re-route   - GET /library -> first byte (already compiled).
    6. Deeper route    - GET /past-questions -> first byte.

  All timings are wall-clock on the same machine, so BEFORE and AFTER runs are
  directly comparable.

.PARAMETER Label
  Run label, e.g. "BEFORE" / "AFTER".

.PARAMETER Port
  Port for the dev server.

.PARAMETER Cold
  Delete `.next` before the run for a true cold measurement.

.PARAMETER Turbopack
  Pass `--turbopack` to `next dev`.

.EXAMPLE
  pwsh -File scripts/measure-dev.ps1 -Label BEFORE -Port 3311 -Cold
#>
[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)][string]$Label,
  [int]$Port = 3311,
  [switch]$Cold,
  [switch]$Turbopack
)

$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSScriptRoot
Set-Location $repo

$outLog = Join-Path $repo ".next-devmeasure-$Label.out.log"
$errLog = Join-Path $repo ".next-devmeasure-$Label.err.log"
$jsonOut = Join-Path $repo ".next-devmeasure-$Label.json"

foreach ($f in @($outLog, $errLog, $jsonOut)) {
  if (Test-Path $f) { Remove-Item $f -Force }
}

if ($Cold -and (Test-Path '.next')) {
  Write-Host "[$Label] Clearing .next (cold run)..."
  Remove-Item '.next' -Recurse -Force
}

$devArgs = @('run', 'dev', '--', '--port', "$Port")
if ($Turbopack) { $devArgs += '--turbopack' }

$proc = Start-Process -FilePath 'npm.cmd' -ArgumentList $devArgs `
  -WorkingDirectory $repo -PassThru -WindowStyle Hidden `
  -RedirectStandardOutput $outLog -RedirectStandardError $errLog

# Npm spawns the real server as a child; kill the tree on exit.
function Stop-DevTree {
  param([System.Diagnostics.Process]$Root)
  try {
    Get-CimInstance Win32_Process -Filter "ParentProcessId=$($Root.Id)" -ErrorAction SilentlyContinue |
      ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
    Stop-Process -Id $Root.Id -Force -ErrorAction SilentlyContinue
  } catch { }
}

function Get-LogText {
  $t = ''
  foreach ($f in @($outLog, $errLog)) {
    if (Test-Path $f) { $t += (Get-Content $f -Raw -ErrorAction SilentlyContinue) }
  }
  return $t
}

$results = [ordered]@{}

try {
  # ---- 1. Server startup -------------------------------------------------
  $sw = [Diagnostics.Stopwatch]::StartNew()
  $ready = $false
  while ($sw.Elapsed.TotalSeconds -lt 240) {
    Start-Sleep -Milliseconds 200
    if ((Get-LogText) -match '(?i)(ready in|Ready - started server|Local:)') { $ready = $true; break }
    if ($proc.HasExited) { break }
  }
  $results['serverStartupMs'] = [int]$sw.ElapsedMilliseconds
  $results['serverReady'] = $ready
  Write-Host ("[{0}] Server startup ........ {1} ms  (ready={2})" -f $Label, $results['serverStartupMs'], $ready)

  if (-not $ready) {
    Write-Host "[$Label] --- stdout ---"; Get-Content $outLog -Tail 30 -ErrorAction SilentlyContinue
    Write-Host "[$Label] --- stderr ---"; Get-Content $errLog -Tail 30 -ErrorAction SilentlyContinue
    throw "Dev server never reported ready."
  }

  function Measure-Route {
    param([string]$Path)
    $t = [Diagnostics.Stopwatch]::StartNew()
    try {
      $resp = Invoke-WebRequest -Uri ("http://127.0.0.1:{0}{1}" -f $Port, $Path) `
        -TimeoutSec 240 -UseBasicParsing
      $t.Stop()
      return [ordered]@{ ms = [int]$t.ElapsedMilliseconds; status = [int]$resp.StatusCode; bytes = $resp.RawContentLength }
    } catch {
      $t.Stop()
      return [ordered]@{ ms = [int]$t.ElapsedMilliseconds; status = -1; bytes = 0; error = $_.Exception.Message }
    }
  }

  $results['homeCold'] = Measure-Route '/'
  Write-Host ("[{0}] GET / (cold) .......... {1} ms  status={2} bytes={3}" -f $Label, $results['homeCold'].ms, $results['homeCold'].status, $results['homeCold'].bytes)

  $results['libraryCold'] = Measure-Route '/library'
  Write-Host ("[{0}] GET /library (cold) ... {1} ms  status={2} bytes={3}" -f $Label, $results['libraryCold'].ms, $results['libraryCold'].status, $results['libraryCold'].bytes)

  $results['homeWarm'] = Measure-Route '/'
  Write-Host ("[{0}] GET / (warm) .......... {1} ms  status={2}" -f $Label, $results['homeWarm'].ms, $results['homeWarm'].status)

  $results['libraryWarm'] = Measure-Route '/library'
  Write-Host ("[{0}] GET /library (warm) ... {1} ms  status={2}" -f $Label, $results['libraryWarm'].ms, $results['libraryWarm'].status)

  $results['pastQuestions'] = Measure-Route '/past-questions'
  Write-Host ("[{0}] GET /past-questions .... {1} ms  status={2}" -f $Label, $results['pastQuestions'].ms, $results['pastQuestions'].status)
}
finally {
  Stop-DevTree -Root $proc
  Get-CimInstance Win32_Process -ErrorAction SilentlyContinue |
    Where-Object { $_.CommandLine -like "*next dev*--port $Port*" } |
    ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
}

$results | ConvertTo-Json -Depth 4 | Set-Content -Path $jsonOut -Encoding utf8
Write-Host ""
Write-Host "[$Label] JSON written to $jsonOut"
