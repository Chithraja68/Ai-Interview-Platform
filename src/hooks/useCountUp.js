import { useState, useEffect } from "react";

export function useCountUp(target, active, duration = 1300) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf;
    const start = performance.now();

    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setVal(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return val;
}
