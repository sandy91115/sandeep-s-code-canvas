import { techStack } from "@/data/portfolio";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";

const TechStackSection = () => (
  <section id="tech-stack" className="py-28 px-6 relative">
    <div className="mx-auto max-w-5xl relative">
      <ScrollReveal>
        <p className="text-sm tracking-[0.25em] uppercase text-primary font-body font-medium mb-4 text-center">
          Arsenal
        </p>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center italic">
          Tech Stack
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-md mx-auto font-body text-sm">
          Tools and technologies I use to build scalable backend systems.
        </p>
      </ScrollReveal>

      <div className="space-y-8">
        {Object.entries(techStack).map(([category, items], ci) => (
          <ScrollReveal key={category} delay={ci * 0.08}>
            <div className="rounded-2xl border border-border bg-card/20 p-6">
              <div className="flex items-center gap-3 mb-5">
                <h3 className="text-sm font-body font-semibold text-primary uppercase tracking-wider">{category}</h3>
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground font-body">{items.length}</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {items.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -2 }}
                    className="rounded-full border border-border bg-card/40 px-4 py-2 text-sm text-foreground/80 hover:border-primary/30 hover:text-primary transition-all duration-300 cursor-default font-body"
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
