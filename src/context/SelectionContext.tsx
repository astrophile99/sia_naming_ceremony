"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface SelectionContextType {
  selected: Set<number>;
  isSelecting: boolean;
  toggle: (id: number) => void;
  toggleSelecting: () => void;
  clearSelection: () => void;
  selectAll: (ids: number[]) => void;
  count: number;
}

const SelectionContext = createContext<SelectionContextType>({
  selected: new Set(),
  isSelecting: false,
  toggle: () => {},
  toggleSelecting: () => {},
  clearSelection: () => {},
  selectAll: () => {},
  count: 0,
});

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [isSelecting, setIsSelecting] = useState(false);

  const toggle = useCallback((id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleSelecting = useCallback(() => {
    setIsSelecting((v) => {
      if (v) setSelected(new Set()); // clear on exit
      return !v;
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelected(new Set());
  }, []);

  const selectAll = useCallback((ids: number[]) => {
    setSelected(new Set(ids));
  }, []);

  return (
    <SelectionContext.Provider
      value={{ selected, isSelecting, toggle, toggleSelecting, clearSelection, selectAll, count: selected.size }}
    >
      {children}
    </SelectionContext.Provider>
  );
}

export const useSelection = () => useContext(SelectionContext);
