import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { roadmap } from "@/data/portfolio";
import ScrollReveal from "@/components/animations/ScrollReveal";

const AnimatedBar = ({ value, delay }: { value: number; delay: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="h-2 w-full rounded-full bg-muted overflow-hidden">
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
  <section id="roadmap" className="py-32 px-6">
    <div className="mx-auto max-w-4xl">
      <ScrollReveal>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-16 text-center">
          Learning <span className="text-primary">Roadmap</span>
        </h2>
      </ScrollReveal>

      <div className="space-y-8">
        {roadmap.map((item, i) => (
          <ScrollReveal key={item.name} delay={i * 0.1}>
            <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-display font-bold">{item.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{item.progress}%</span>
                  {item.status === "exploring" && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full animate-pulse">
                      Exploring
                    </span>
                  )}
                </div>
              </div>
              <AnimatedBar value={item.progress} delay={i * 0.1} />
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default RoadmapSection;
