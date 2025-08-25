import { useCallback, useEffect, useRef, useState } from "react";

export function useInfiniteScroll(
  callback: () => Promise<void>,
  threshold: number = 100,
) {
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container || loading) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    if (distanceFromBottom < threshold) {
      setLoading(true);
      callback().finally(() => setLoading(false));
    }
  }, [callback, loading, threshold]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { containerRef, loading };
}
