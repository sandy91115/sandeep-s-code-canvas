import { techStack } from "@/data/portfolio";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";

const categoryIcons: Record<string, string> = {
  Languages: "{ }",
  Frameworks: "⚡",
  Databases: "◉",
  DevOps: "☁",
  Tools: "⚙",
};

const TechStackSection = () => (
  <section id="tech-stack" className="py-32 px-6 relative overflow-hidden">
    <div className="absolute inset-0 opacity-[0.02]" style={{
      backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
      backgroundSize: '60px 60px',
    }} />

    <div className="mx-auto max-w-6xl relative">
      <ScrollReveal>
        <div className="text-center mb-4">
          <span className="text-xs uppercase tracking-[0.3em] text-primary/60 font-mono">[ ARSENAL.CONFIG ]</span>
        </div>
        <h2 className="font-display text-5xl md:text-6xl font-bold mb-4 text-center">
          Tech <span className="text-primary">Stack</span>
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-xl mx-auto">
          A curated collection of tools and technologies I use to build robust, scalable backend systems.
        </p>
      </ScrollReveal>

      <div className="space-y-10">
        {Object.entries(techStack).map(([category, items], ci) => (
          <ScrollReveal key={category} delay={ci * 0.1}>
            <div className="rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm p-6">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xl">{categoryIcons[category]}</span>
                <h3 className="font-display text-lg font-bold text-primary">{category}</h3>
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">{items.length} tools</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {items.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="rounded-lg border border-border bg-card/60 px-4 py-2.5 text-sm text-foreground hover:border-primary/50 hover:shadow-[0_0_25px_hsl(195_100%_50%/0.15)] hover:text-primary transition-all duration-300 cursor-default"
                    data-hoverable
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default TechStackSection;
