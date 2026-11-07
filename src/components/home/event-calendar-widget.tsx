"use client";

import * as React from "react";
import Link from "next/link";
import { events } from "@/data";
import type { EventItem } from "@/types";
import { cn } from "@/lib/utils";

export function EventCalendarWidget({ className }: { className?: string }) {
  // Current view date state (year and month)
  const [currentDate, setCurrentDate] = React.useState(() => {
    // If events exist, default to the month of the first event, or today
    const firstEvent = events[0];
    if (firstEvent) {
      return new Date(firstEvent.startsAt);
    }
    return new Date();
  });

  const [selectedEvent, setSelectedEvent] = React.useState<EventItem | null>(() => events[0] ?? null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Calendar calculations
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Find events in the current viewing month
  const eventsInMonth = React.useMemo(() => {
    return events.filter((e) => {
      const d = new Date(e.startsAt);
      return d.getFullYear() === year && d.getMonth() === month;
    });
  }, [year, month]);

  const getEventForDay = (day: number) => {
    return eventsInMonth.find((e) => new Date(e.startsAt).getDate() === day);
  };

  return (
    <div className={cn("bg-white text-ink rounded-xl p-5 shadow-xl border border-rule/80", className)}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between border-b border-rule/60 pb-3">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="font-serif text-[0.95rem] font-semibold tracking-tight text-ink">
            {monthNames[month]} {year}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-1 rounded hover:bg-paper-warm text-ink-muted hover:text-ink transition-colors"
            aria-label="Previous month"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className="p-1 rounded hover:bg-paper-warm text-ink-muted hover:text-ink transition-colors"
            aria-label="Next month"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-1 mt-3 text-center">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <span key={day} className="font-sans text-[0.6875rem] font-semibold text-ink-subtle uppercase">
            {day}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 mt-1 text-center font-sans text-[0.8125rem]">
        {/* Leading empty cells */}
        {Array.from({ length: firstDayIndex }).map((_, i) => (
          <div key={`empty-${i}`} className="h-7 w-7" />
        ))}

        {/* Days of month */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dayEvent = getEventForDay(day);
          const isSelected = selectedEvent && new Date(selectedEvent.startsAt).getDate() === day && new Date(selectedEvent.startsAt).getMonth() === month && new Date(selectedEvent.startsAt).getFullYear() === year;

          return (
            <button
              key={`day-${day}`}
              type="button"
              onClick={() => {
                if (dayEvent) setSelectedEvent(dayEvent);
              }}
              className={cn(
                "relative h-7 w-7 mx-auto flex items-center justify-center rounded-full transition-all text-[0.75rem]",
                dayEvent ? "font-bold text-white bg-dept-blue hover:bg-dept-blue/90 shadow-sm" : "text-ink hover:bg-paper-warm",
                isSelected && "ring-2 ring-offset-1 ring-dept-blue"
              )}
            >
              <span>{day}</span>
              {dayEvent && !isSelected && (
                <span className="absolute -bottom-0.5 w-1 h-1 bg-white rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected / Upcoming Event Preview */}
      {selectedEvent && (
        <div className="mt-4 pt-3 border-t border-rule/60">
          <span className="font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-accent font-semibold block">
            Featured Event · {new Date(selectedEvent.startsAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
          </span>
          <Link
            href={`/events`}
            className="mt-1 block font-serif text-[0.875rem] font-medium leading-snug text-ink hover:text-accent transition-colors"
          >
            {selectedEvent.title}
          </Link>
          {selectedEvent.location && (
            <p className="mt-0.5 font-sans text-[0.75rem] text-ink-muted line-clamp-1">
              📍 {selectedEvent.location}
            </p>
          )}
        </div>
      )}

      {/* Bottom Row Links */}
      <div className="mt-3 pt-2 flex items-center justify-between text-[0.75rem] text-ink-subtle">
        <Link href="/events" className="hover:text-ink font-medium transition-colors">
          View all events →
        </Link>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-dept-blue" />
          <span className="text-[0.6875rem]">Event day</span>
        </div>
      </div>
    </div>
  );
}
