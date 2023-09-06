import { useEffect, useRef } from "react";

const Rightbar = () => {
  const rightBarRef = useRef<HTMLDivElement | null>(null);

  const stickySidebar = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 120 ||
        document.documentElement.scrollTop > 120
      ) {
        if (rightBarRef.current) {
          rightBarRef.current.classList.add("sticky-sidebar");
        }
      } else {
        if (rightBarRef.current) {
          rightBarRef.current.classList.remove("sticky-sidebar");
        }
      }
    });
  };

  useEffect(() => {
    stickySidebar();

    return () => window.removeEventListener("scroll", stickySidebar);
  }, []);
  return <div ref={rightBarRef}>Rightbar</div>;
};
export default Rightbar;
