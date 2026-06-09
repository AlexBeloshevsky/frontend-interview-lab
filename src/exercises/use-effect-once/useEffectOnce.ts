import { useRef, useEffect } from "react";

export const useEffectOnce = (callBack: () => void) => {
  const triggered = useRef(false);
  useEffect(() => {
    if (triggered.current) {
      return;
    }
    triggered.current = true;
    callBack();
  }, [callBack]);
};
