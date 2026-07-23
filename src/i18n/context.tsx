"use client";

import { createContext, useContext, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import type { Copy, Locale } from "./types";

const LocaleContext = createContext<{ copy: Copy; locale: Locale } | null>(null);

export function LocaleProvider({
  copy,
  locale,
  children,
}: {
  copy: Copy;
  locale: Locale;
  children: ReactNode;
}) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ copy, locale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useCopy() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useCopy must be used inside LocaleProvider");
  return value;
}

/** Renders a copy string, turning **segments** into <strong>. */
export function RichText({
  text,
  strongClassName,
}: {
  text: string;
  strongClassName?: string;
}) {
  const parts = text.split("**");
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className={cn("font-bold", strongClassName)}>
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}
