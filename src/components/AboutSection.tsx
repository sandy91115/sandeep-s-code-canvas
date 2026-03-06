import { stats, personalInfo, achievements } from "@/data/portfolio";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";

const AboutSection = () => (
  <section id="about" className="py-28 px-6 relative">
    <div className="mx-auto max-w-5xl">
      <ScrollReveal>
        <p className="text-sm tracking-[0.25em] uppercase text-primary font-body font-medium mb-4 text-center">
          About
        </p>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-16 text-center italic">
          Who I Am
        </h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-5 gap-16 items-start">
        <ScrollReveal direction="left" className="md:col-span-3">
          <div className="space-y-5">
            {personalInfo.bio.map((paragraph, i) => (
              <p key={i} className="text-base text-muted-foreground leading-[1.8] font-body">
                {paragraph}
              </p>
            ))}

            <div className="mt-10 pt-8 border-t border-border">
              <h3 className="text-xs uppercase tracking-[0.2em] text-primary font-body font-semibold mb-5">
                Key Achievements
              </h3>
              <ul className="space-y-3">
                {achievements.map((achievement, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 text-sm text-muted-foreground font-body"
                  >
                    <span className="text-primary mt-0.5 text-xs">●</span>
                    <span>{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" className="md:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="rounded-xl border border-border bg-card/40 p-5 text-center hover:border-primary/20 transition-all duration-300"
              >
                <div className="font-display text-2xl font-bold text-primary mb-1 italic">{stat.value}</div>
                <div className="text-xs text-muted-foreground font-body">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

export default AboutSection;
