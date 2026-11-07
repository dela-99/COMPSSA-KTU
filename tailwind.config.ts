import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        "2xl": "1320px",
      },
    },
    extend: {
      colors: {
        // Editorial neutrals — warm-leaning, institutional, never blue/purple AI gradient.
        ink: {
          DEFAULT: "#0B0B0A",
          soft: "#1F1F1D",
          muted: "#3F3F3C",
          subtle: "#6B6B66",
        },
        paper: {
          DEFAULT: "#FAFAF7",
          warm: "#F4F2EC",
          edge: "#E8E5DD",
        },
        rule: {
          DEFAULT: "#E2DFD8",
          strong: "#C9C5BB",
        },
        accent: {
          DEFAULT: "#7A1F1F", // restrained burgundy — academic, not loud
          soft: "#A33838",
          ink: "#3A0E0E",
        },
        // shadcn-compatible semantic tokens (kept aligned with our editorial palette).
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        // We use small radii — institutional, not pillowy.
        DEFAULT: "2px",
        md: "3px",
        lg: "4px",
        xl: "6px",
        // Card system (Phase 3) — rounded rectangles, not squares, not pills.
        card: "14px",
        "card-sm": "9px",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        // Editorial scale — restrained, deliberate.
        "display-2xl": ["clamp(3rem, 6vw + 1rem, 5.5rem)", { lineHeight: "1.02", letterSpacing: "-0.025em", fontWeight: "500" }],
        "display-xl": ["clamp(2.5rem, 4.5vw + 1rem, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.022em", fontWeight: "500" }],
        "display-lg": ["clamp(2rem, 3vw + 1rem, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.018em", fontWeight: "500" }],
        "display-md": ["1.75rem", { lineHeight: "1.2", letterSpacing: "-0.014em", fontWeight: "500" }],
        "eyebrow": ["0.75rem", { lineHeight: "1", letterSpacing: "0.14em", fontWeight: "500" }],
      },
      maxWidth: {
        prose: "68ch",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.2, 0.7, 0.2, 1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate],
};

export default config;