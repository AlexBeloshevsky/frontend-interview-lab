import { useRef } from "react";

export const useIsFirstRender = () => {
  const isFirst = useRef(true);
  if (isFirst.current) {
    isFirst.current = false;
    return true;
  }
  return false;
};

// Some strict React Compiler lint setups warn about reading/writing refs during render.
// In production, prefer modeling the real state directly instead of depending on render history.
