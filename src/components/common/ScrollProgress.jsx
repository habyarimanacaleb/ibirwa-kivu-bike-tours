import { motion, useScroll } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        transformOrigin: "0% 50%",
        height: 4,
        background: "blue",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
      }}
    />
  );
}
