"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import UserCursor from "@/shared/components/common/user-cursor-tw";

type CursorContextValue = {
  cursorName: string;
  setCursorName: (name: string) => void;
  resetCursorName: () => void;
};

const CursorContext = createContext<CursorContextValue | null>(null);

const DEFAULT_NAME = "Merai";

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorName, setCursorNameState] = useState(DEFAULT_NAME);

  const setCursorName = useCallback((name: string) => {
    setCursorNameState(name);
  }, []);

  const resetCursorName = useCallback(() => {
    setCursorNameState(DEFAULT_NAME);
  }, []);

  return (
    <CursorContext.Provider value={{ cursorName, setCursorName, resetCursorName }}>
      <UserCursor fullScreen name={cursorName} trigger="always" />
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) {
    return {
      cursorName: DEFAULT_NAME,
      setCursorName: () => {},
      resetCursorName: () => {},
    } as CursorContextValue;
  }
  return ctx;
}

export function useCursorHover(cursorName: string) {
  const { setCursorName, resetCursorName } = useCursor();

  return {
    onMouseEnter: () => setCursorName(cursorName),
    onMouseLeave: () => resetCursorName(),
  };
}
