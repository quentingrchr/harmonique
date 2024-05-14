import { useLayoutEffect, useState } from "react";

type Layout = "mobile" | "tablet" | "desktop";
export default function useGetWindowLayout() {
  const [layout, setLayout] = useState<Layout>("desktop");

  function handleResize() {
    const width = window.innerWidth;
    if (width < 640) {
      setLayout("mobile");
    } else if (width < 1024) {
      setLayout("tablet");
    } else {
      setLayout("desktop");
    }
  }
  useLayoutEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return layout;
}
