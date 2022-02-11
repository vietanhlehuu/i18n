import { useRef } from "react";

export default function useFirstRenderSync(cb: () => void) {
  const firstRender = useRef(true);
  if (firstRender.current) {
    cb();
    firstRender.current = false;
  }
}
