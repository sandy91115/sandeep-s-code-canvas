import { experiences } from "@/data/portfolio";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";

const ExperienceSection = () => (
  <section id="experience" className="py-28 px-6 relative">
    <div className="mx-auto max-w-4xl">
      <ScrollReveal>
        <p className="text-sm tracking-[0.25em] uppercase text-primary font-body font-medium mb-4 text-center">
          Career
        </p>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-20 text-center italic">
          Experience
        </h2>
      </ScrollReveal>

      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-border to-transparent" />

        {experiences.map((exp, i) => (
          <ScrollReveal key={i} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.15}>
            <div className={`relative flex ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"} mb-20`}>
              <motion.div
                className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                viewport={{ once: true }}
              >
                <div className="w-3 h-3 rounded-full bg-primary" />
              </motion.div>

              <div className={`ml-14 md:ml-0 md:w-5/12 ${i % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                <div className="rounded-2xl border border-border bg-card/30 p-7 hover:border-primary/20 transition-all duration-300 group">
                  <span className="text-xs text-primary font-body font-medium mb-3 block">
                    {exp.period}
                  </span>
                  <h3 className="font-display text-xl font-bold mb-1 group-hover:text-primary transition-colors italic">{exp.title}</h3>
                  <p className="text-muted-foreground text-sm font-medium mb-4 font-body">{exp.company}</p>
                  <p className="text-muted-foreground text-sm mb-5 leading-relaxed font-body">{exp.description}</p>
                  <ul className="space-y-2.5">
                    {exp.highlights.map((h, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: j * 0.08 }}
                        viewport={{ once: true }}
                        className="text-sm text-muted-foreground flex items-start gap-2.5 font-body"
                      >
                        <span className="text-primary text-xs mt-1">●</span> {h}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default ExperienceSection;
