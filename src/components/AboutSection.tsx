import { stats, personalInfo, achievements } from "@/data/portfolio";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Code2, Server, Database, Zap } from "lucide-react";

const highlights = [
  { icon: Server, label: "Backend Architecture", desc: "Designing scalable distributed systems" },
  { icon: Database, label: "Database Design", desc: "Optimizing queries and schema patterns" },
  { icon: Code2, label: "Clean Code", desc: "Writing maintainable, testable code" },
  { icon: Zap, label: "Performance", desc: "Building high-throughput low-latency APIs" },
];

const AboutSection = () => (
  <section id="about" className="py-32 px-6 relative overflow-hidden">
    <div className="absolute top-1/4 -right-32 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-float" />
    <div className="absolute bottom-1/4 -left-32 w-48 h-48 rounded-full bg-primary/3 blur-3xl animate-float" style={{ animationDelay: '3s' }} />

    <div className="mx-auto max-w-6xl relative">
      <ScrollReveal>
        <div className="text-center mb-4">
          <span className="text-xs uppercase tracking-[0.3em] text-primary/60 font-mono">[ USER.PROFILE ]</span>
        </div>
        <h2 className="font-display text-5xl md:text-6xl font-bold mb-16 text-center">
          About <span className="text-primary">Me</span>
        </h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-16 items-start">
        <ScrollReveal direction="left">
          <div className="space-y-6">
            {personalInfo.bio.map((paragraph, i) => (
              <p key={i} className="text-lg text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}

            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="font-display text-sm uppercase tracking-widest text-primary mb-4">Key Achievements</h3>
              <ul className="space-y-3">
                {achievements.map((achievement, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <span className="text-primary mt-1">▹</span>
                    <span>{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>

        <div className="space-y-6">
          <ScrollReveal direction="right">
            <div className="grid grid-cols-2 gap-3 mb-6">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-4 hover:border-primary/40 transition-all hover:shadow-[0_0_25px_hsl(195_100%_50%/0.1)] group"
                  data-hoverable
                >
                  <item.icon className="h-5 w-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-display text-sm font-bold mb-1">{item.label}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.08}>
                <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-4 text-center hover:border-primary/50 transition-all hover:shadow-[0_0_20px_hsl(195_100%_50%/0.1)]">
                  <div className="font-display text-2xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
