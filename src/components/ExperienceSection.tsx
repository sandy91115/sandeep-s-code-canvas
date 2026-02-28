import { experiences } from "@/data/portfolio";
import ScrollReveal from "@/components/animations/ScrollReveal";

const ExperienceSection = () => (
  <section id="experience" className="py-32 px-6">
    <div className="mx-auto max-w-4xl">
      <ScrollReveal>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-16 text-center">
          <span className="text-primary">Experience</span>
        </h2>
      </ScrollReveal>

      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-primary/30" />

        {experiences.map((exp, i) => (
          <ScrollReveal key={i} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.2}>
            <div className={`relative flex ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"} mb-12`}>
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary z-10 shadow-[0_0_10px_hsl(30_100%_60%/0.5)]" />

              <div className={`ml-12 md:ml-0 md:w-5/12 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6 hover:border-primary/30 transition-colors">
                  <span className="text-sm text-primary font-medium">{exp.period}</span>
                  <h3 className="font-display text-xl font-bold mt-1">{exp.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{exp.company}</p>
                  <p className="text-muted-foreground text-sm mt-3">{exp.description}</p>
                  <ul className="mt-3 space-y-1">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-0.5">▸</span> {h}
                      </li>
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
