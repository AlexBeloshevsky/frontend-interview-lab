import { useState } from "react";

export function useToggle(on: boolean): [boolean, () => void] {
  const [state, setState] = useState(on);
  const toggle = () => {
    setState((state) => !state);
  };
  return [state, toggle];
}
