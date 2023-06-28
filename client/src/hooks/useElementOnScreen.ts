import { useEffect, useMemo, useState } from "react";
import { ScrollOption } from "../types/types";

const useElementOnScreen = (
  options: ScrollOption,
  targetRef: React.RefObject<HTMLDivElement>
) => {
  const [isVisibile, setIsVisible] = useState<boolean>();

  const callbackFunction = (entries: any) => {
    const [entry] = entries; //const entry = entries[0]
    setIsVisible(entry.isIntersecting);
  };

  const optionsMemo = useMemo(() => {
    return options;
  }, [options]);

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, optionsMemo);
    const currentTarget = targetRef.current;
    if (currentTarget) observer.observe(currentTarget);

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [targetRef, optionsMemo]);

  return isVisibile;
};

export default useElementOnScreen;
