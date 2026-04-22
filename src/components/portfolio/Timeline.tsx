import { useEffect, useRef } from "react";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

type Entry = {
  role: string;
  org: string;
  date: string;
  description?: string;
};

const EXPERIENCE: Entry[] = [
  {
    role: "AI Intern",
    org: "Narola AI Studio, Surat",
    date: "Mar 2026 – Present",
    description: "AI-based applications and automation projects.",
  },
  {
    role: "Growth & Outreach Associate",
    org: "DDesignhub, Surat",
    date: "Jul 2025 – Present",
    description: "Market research and outreach for 3D design services.",
  },
  {
    role: "AR Intern",
    org: "DECGaming Studio",
    date: "May 2024 – Jun 2024",
    description: "AR experiences using Unity and Vuforia.",
  },
];

const EDUCATION: Entry[] = [
  {
    role: "M.Sc. AI/ML",
    org: "VNSGU, Surat",
    date: "Expected 2026 · CGPA 8.81/10",
  },
  {
    role: "B.Sc. IT",
    org: "Shree Swaminarayan College, MKBU Bhavnagar",
    date: "2023",
  },
];

function TimelineList({ entries }: { entries: Entry[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const fill = fillRef.current;
    if (!el || !fill) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh * 0.5;
      const progress = Math.min(
        1,
        Math.max(0, (vh - rect.top) / total),
      );
      fill.style.height = `${progress * 100}%`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className="nc-timeline relative space-y-10">
      <div ref={fillRef} className="nc-timeline-fill" />
      {entries.map((e, i) => (
        <Reveal key={`${e.role}-${i}`} delay={i * 60}>
          <div className="relative">
            <span className="nc-timeline-dot" />
            <div
              className="text-[0.72rem]"
              style={{ color: "#9b5de5", letterSpacing: "0.18em" }}
            >
              {e.date}
            </div>
            <h4 className="mt-1 text-lg font-semibold text-white">{e.role}</h4>
            <div className="text-sm" style={{ color: "#8888aa" }}>
              {e.org}
            </div>
            {e.description && (
              <p
                className="mt-2 max-w-xl text-sm"
                style={{ color: "#8888aa", lineHeight: 1.7 }}
              >
                {e.description}
              </p>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <Reveal>
        <SectionTitle
          title="Experience"
          subtitle="Synaptic connections formed"
        />
      </Reveal>
      <TimelineList entries={EXPERIENCE} />
    </section>
  );
}

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <Reveal>
        <SectionTitle title="Education" subtitle="Origins of the signal" />
      </Reveal>
      <TimelineList entries={EDUCATION} />
    </section>
  );
}