import { techStack } from "@/data/portfolio";
import ScrollReveal from "@/components/animations/ScrollReveal";

const TechStackSection = () => (
  <section id="tech-stack" className="py-32 px-6">
    <div className="mx-auto max-w-6xl">
      <ScrollReveal>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-16 text-center">
          Tech <span className="text-primary">Stack</span>
        </h2>
      </ScrollReveal>

      <div className="space-y-12">
        {Object.entries(techStack).map(([category, items], ci) => (
          <ScrollReveal key={category} delay={ci * 0.1}>
            <h3 className="font-display text-xl font-bold text-primary mb-4">{category}</h3>
            <div className="flex flex-wrap gap-3">
              {items.map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-border bg-card/50 px-4 py-2 text-sm text-foreground hover:border-primary/50 hover:shadow-[0_0_20px_hsl(30_100%_60%/0.15)] transition-all duration-300 cursor-default"
                  data-hoverable
                >
                  {item}
                </div>
              ))}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default TechStackSection;
