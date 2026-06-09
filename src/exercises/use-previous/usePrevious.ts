import { useEffect, useState } from "react";

export const usePrevious = (val: unknown) => {
  const [state, setState] = useState<unknown>(undefined);
  const [prev, setPrev] = useState<unknown>(undefined);
  useEffect(() => {
    setPrev(state);
    setState(val);
  }, [val, state]);
  return prev;
};
