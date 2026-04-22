import { useEffect, useRef } from "react";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

const GROUPS: { label: string; items: { name: string; value: number }[] }[] = [
  {
    label: "Software Development",
    items: [
      { name: "Python", value: 92 },
      { name: "FastAPI", value: 82 },
      { name: "React", value: 75 },
      { name: "PostgreSQL", value: 80 },
      { name: "SQL", value: 85 },
      { name: "Git", value: 88 },
    ],
  },
  {
    label: "AI & Automation",
    items: [
      { name: "OpenAI API / LLMs", value: 88 },
      { name: "LangChain", value: 82 },
      { name: "RAG", value: 80 },
      { name: "n8n", value: 80 },
      { name: "Firecrawl", value: 78 },
    ],
  },
  {
    label: "Data & ML",
    items: [
      { name: "NumPy / Pandas", value: 88 },
      { name: "Scikit-learn", value: 83 },
      { name: "OpenCV", value: 85 },
    ],
  },
];

const CONCEPTS = [
  "Data Structures & Algorithms",
  "OOP",
  "DBMS",
  "System Design",
  "REST APIs",
];

function SkillRow({ name, value }: { name: string; value: number }) {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = fillRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              el.style.width = `${value}%`;
            });
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div className="grid grid-cols-[120px_1fr] items-center gap-4 py-3 md:grid-cols-[180px_1fr_48px]">
      <span className="text-sm text-white" style={{ letterSpacing: "0.02em" }}>
        {name}
      </span>
      <div className="nc-skill-track">
        <div ref={fillRef} className="nc-skill-fill" />
      </div>
      <span
        className="hidden text-right text-xs md:block"
        style={{ color: "#8888aa", letterSpacing: "0.05em" }}
      >
        {value}%
      </span>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <Reveal>
        <SectionTitle title="Skills" subtitle="Signals across the neural map" />
      </Reveal>

      <div className="space-y-12">
        {GROUPS.map((g) => (
          <Reveal key={g.label}>
            <div>
              <h3
                className="mb-4 text-xs font-semibold uppercase"
                style={{ color: "#9b5de5", letterSpacing: "0.25em" }}
              >
                {g.label}
              </h3>
              <div className="divide-y" style={{ borderColor: "rgba(155,93,229,0.08)" }}>
                {g.items.map((s) => (
                  <SkillRow key={s.name} name={s.name} value={s.value} />
                ))}
              </div>
            </div>
          </Reveal>
        ))}

        <Reveal>
          <div>
            <h3
              className="mb-4 text-xs font-semibold uppercase"
              style={{ color: "#9b5de5", letterSpacing: "0.25em" }}
            >
              Concepts
            </h3>
            <div className="flex flex-wrap gap-3">
              {CONCEPTS.map((c) => (
                <span key={c} className="nc-concept-chip">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}