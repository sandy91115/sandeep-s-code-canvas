import { experiences } from "@/data/portfolio";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Briefcase } from "lucide-react";

const ExperienceSection = () => (
  <section id="experience" className="py-32 px-6 relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent to-primary/30" />

    <div className="mx-auto max-w-4xl">
      <ScrollReveal>
        <div className="text-center mb-4">
          <span className="text-xs uppercase tracking-[0.3em] text-primary/60 font-body">Career Journey</span>
        </div>
        <h2 className="font-display text-5xl md:text-6xl font-bold mb-16 text-center">
          <span className="text-primary">Experience</span>
        </h2>
      </ScrollReveal>

      <div className="relative">
        {/* Animated timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px">
          <div className="w-full h-full bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />
        </div>

        {experiences.map((exp, i) => (
          <ScrollReveal key={i} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.2}>
            <div className={`relative flex ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"} mb-16`}>
              {/* Timeline node */}
              <motion.div
                className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                viewport={{ once: true }}
              >
                <div className="w-10 h-10 rounded-full bg-card border-2 border-primary flex items-center justify-center shadow-[0_0_20px_hsl(30_100%_60%/0.3)]">
                  <Briefcase className="h-4 w-4 text-primary" />
                </div>
              </motion.div>

              <div className={`ml-16 md:ml-0 md:w-5/12 ${i % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6 hover:border-primary/30 transition-all hover:shadow-[0_0_30px_hsl(30_100%_60%/0.08)] group">
                  <span className="inline-block text-xs text-primary font-medium bg-primary/10 px-3 py-1 rounded-full mb-3">
                    {exp.period}
                  </span>
                  <h3 className="font-display text-xl font-bold mb-1 group-hover:text-primary transition-colors">{exp.title}</h3>
                  <p className="text-primary/70 text-sm font-medium mb-3">{exp.company}</p>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{exp.description}</p>
                  <ul className="space-y-2">
                    {exp.highlights.map((h, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: j * 0.1 }}
                        viewport={{ once: true }}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-primary mt-0.5">▸</span> {h}
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
