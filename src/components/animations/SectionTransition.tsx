import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const SectionTransition = ({ children, className = "" }: SectionTransitionProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [60, 0, 0, -30]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.97, 1, 1, 0.98]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ opacity, y, scale }}>
        {children}
      </motion.div>
    </div>
  );
};

export default SectionTransition;
