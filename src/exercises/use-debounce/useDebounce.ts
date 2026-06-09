import { useState, useEffect } from "react";

export const useDebounce = (val: unknown, timeOut: number) => {
  const [value, setValue] = useState(val);
  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(val);
    }, timeOut);
    return () => {
      clearTimeout(timer);
    };
  }, [val, timeOut]);
  return value;
};
