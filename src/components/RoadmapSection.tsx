import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { roadmap } from "@/data/portfolio";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Rocket, BookOpen, Compass } from "lucide-react";

const statusConfig = {
  learning: { icon: BookOpen, label: "Learning", color: "text-primary" },
  exploring: { icon: Compass, label: "Exploring", color: "text-primary/70" },
};

const AnimatedBar = ({ value, delay }: { value: number; delay: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
      <motion.div
        className="h-full rounded-full relative overflow-hidden"
        style={{ background: `linear-gradient(90deg, hsl(30 100% 50%), hsl(30 100% 65%))` }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${value}%` } : {}}
        transition={{ duration: 1.2, delay, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
      </motion.div>
    </div>
  );
};

const RoadmapSection = () => (
  <section id="roadmap" className="py-32 px-6 relative">
    <div className="mx-auto max-w-4xl">
      <ScrollReveal>
        <div className="text-center mb-4">
          <Rocket className="h-6 w-6 text-primary mx-auto mb-2" />
          <span className="text-xs uppercase tracking-[0.3em] text-primary/60 font-mono">[ UPGRADE.PATH ]</span>
        </div>
        <h2 className="font-display text-5xl md:text-6xl font-bold mb-4 text-center">
          Learning <span className="text-primary">Roadmap</span>
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-xl mx-auto">
          Technologies and concepts I'm actively learning to level up my backend engineering skills.
        </p>
      </ScrollReveal>

      <div className="space-y-6">
        {roadmap.map((item, i) => {
          const config = statusConfig[item.status];
          const Icon = config.icon;

          return (
            <ScrollReveal key={item.name} delay={i * 0.1}>
              <motion.div
                className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6 hover:border-primary/30 transition-all group"
                whileHover={{ x: 4 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 ${config.color}`} />
                    <h3 className="font-display font-bold text-lg group-hover:text-primary transition-colors">{item.name}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-primary">{item.progress}%</span>
                    <span className={`text-xs ${config.color} bg-primary/10 px-2.5 py-1 rounded-full ${item.status === "exploring" ? "animate-pulse" : ""}`}>
                      {config.label}
                    </span>
                  </div>
                </div>
                <AnimatedBar value={item.progress} delay={i * 0.1} />
              </motion.div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default RoadmapSection;
