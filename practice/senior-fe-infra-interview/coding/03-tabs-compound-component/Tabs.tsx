/**
 * Exercise 03 — Tabs (compound, accessible)
 *
 * Implement compound Tabs sharing state via context, supporting controlled and
 * uncontrolled modes, with real keyboard a11y. See TASK.md. These stubs keep things
 * compiling and render naive placeholders until you implement the real behavior.
 */

import type { ReactNode } from "react";

export interface TabsProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  children: ReactNode;
}

export function Tabs({ children }: TabsProps) {
  // TODO: own active value (controlled/uncontrolled) and provide it via context.
  return <div>{children}</div>;
}

export function TabList({ children }: { children: ReactNode }) {
  // TODO: role="tablist" + arrow-key navigation (roving tabindex).
  return <div role="tablist">{children}</div>;
}

export interface TabProps {
  value: string;
  children: ReactNode;
}

export function Tab({ children }: TabProps) {
  // TODO: read context; render <button role="tab"> with aria-selected.
  return (
    <button type="button" role="tab">
      {children}
    </button>
  );
}

export interface TabPanelProps {
  value: string;
  children: ReactNode;
}

export function TabPanel({ children }: TabPanelProps) {
  // TODO: render only when this panel's value is the active one.
  return <div role="tabpanel">{children}</div>;
}
