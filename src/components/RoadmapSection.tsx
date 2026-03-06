import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { roadmap } from "@/data/portfolio";
import ScrollReveal from "@/components/animations/ScrollReveal";

const AnimatedBar = ({ value, delay }: { value: number; delay: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-primary"
        initial={{ width: 0 }}
        animate={inView ? { width: `${value}%` } : {}}
        transition={{ duration: 1, delay, ease: "easeOut" }}
      />
    </div>
  );
};

const RoadmapSection = () => (
  <section id="roadmap" className="py-28 px-6 relative">
    <div className="mx-auto max-w-3xl">
      <ScrollReveal>
        <p className="text-sm tracking-[0.25em] uppercase text-primary font-body font-medium mb-4 text-center">
          Growth
        </p>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center italic">
          Learning Roadmap
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-md mx-auto font-body text-sm">
          Technologies I'm actively learning to deepen my backend expertise.
        </p>
      </ScrollReveal>

      <div className="space-y-5">
        {roadmap.map((item, i) => (
          <ScrollReveal key={item.name} delay={i * 0.08}>
            <motion.div
              className="rounded-2xl border border-border bg-card/20 p-6 hover:border-primary/15 transition-all duration-300 group"
              whileHover={{ x: 3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-body font-semibold text-sm group-hover:text-primary transition-colors">{item.name}</h3>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-primary font-body">{item.progress}%</span>
                  <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full font-body capitalize">
                    {item.status}
                  </span>
                </div>
              </div>
              <AnimatedBar value={item.progress} delay={i * 0.08} />
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default RoadmapSection;
