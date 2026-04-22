import { useEffect, useRef } from "react";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import { TiltCard } from "./TiltCard";

type Game = {
  node: string;
  title: string;
  description: string;
  tools: string[];
  link: string;
};

const GAMES: Game[] = [
  {
    node: "GAME 01",
    title: "Flappy Bird",
    description:
      "Classic Flappy Bird clone with custom physics, collision detection, and score tracking.",
    tools: ["Unity", "C#"],
    link: "https://github.com/VishwaGit-hub",
  },
  {
    node: "GAME 02",
    title: "Sumo Balls",
    description:
      "Physics-based sumo battle game — push opponents off the platform using force and momentum.",
    tools: ["Unity", "C#"],
    link: "https://github.com/VishwaGit-hub",
  },
  {
    node: "GAME 03",
    title: "Pixel Adventure",
    description:
      "2D side-scrolling platformer with pixel art levels, animation states, and level design.",
    tools: ["Unity", "C#"],
    link: "https://github.com/VishwaGit-hub",
  },
  {
    node: "GAME 04",
    title: "Car Physics Prototype",
    description:
      "Realistic car physics prototype with suspension, torque, and terrain interaction.",
    tools: ["Unity", "C#"],
    link: "https://github.com/VishwaGit-hub",
  },
  {
    node: "GAME 05",
    title: "AR Sketch Book",
    description:
      "Augmented reality sketchbook — draw and place 3D sketches in real-world space using AR markers.",
    tools: ["Unity", "Vuforia", "C#"],
    link: "https://github.com/VishwaGit-hub",
  },
  {
    node: "GAME 06",
    title: "AR Birthday Card",
    description:
      "Interactive AR birthday card that triggers 3D animations and effects when scanned.",
    tools: ["Unity", "Vuforia", "C#"],
    link: "https://github.com/VishwaGit-hub",
  },
];

const GAME_SKILL_GROUPS: { label: string; items: { name: string; value: number }[] }[] = [
  {
    label: "Game Development",
    items: [
      { name: "Unity (C#)", value: 85 },
      { name: "Game Physics & Mechanics", value: 82 },
      { name: "Level Design", value: 78 },
      { name: "2D / 3D Animation", value: 75 },
      { name: "UI & Game Menus", value: 80 },
    ],
  },
  {
    label: "Augmented Reality",
    items: [
      { name: "Unity + Vuforia", value: 80 },
      { name: "AR Marker Tracking", value: 75 },
      { name: "3D Model Integration", value: 78 },
    ],
  },
];

const GAME_TOOL_CHIPS = [
  "Unity",
  "C#",
  "Vuforia",
  "AR Foundation",
  "Physics Engine",
  "Particle Systems",
];

function PixelIcon() {
  return (
    <div
      aria-hidden="true"
      style={{
        width: 28,
        height: 28,
        backgroundImage:
          "radial-gradient(circle, rgba(155,93,229,0.7) 1.2px, transparent 1.6px)",
        backgroundSize: "7px 7px",
        backgroundPosition: "0 0",
        opacity: 0.4,
        borderRadius: 4,
      }}
    />
  );
}

function GameSkillRow({ name, value }: { name: string; value: number }) {
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
    <div className="grid grid-cols-[140px_1fr] items-center gap-4 py-3 md:grid-cols-[200px_1fr_48px]">
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

export function Games() {
  return (
    <section id="games" className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <Reveal>
        <SectionTitle
          title="Game Universe"
          subtitle="Worlds built from logic and physics"
        />
      </Reveal>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {GAMES.map((g, i) => (
          <Reveal key={g.node} delay={i * 70}>
            <TiltCard
              max={8}
              className="nc-game-card h-full"
              style={{
                background: "rgba(155,93,229,0.03)",
                border: "1px solid rgba(155,93,229,0.15)",
                borderRadius: 16,
                padding: 28,
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="mb-4 flex items-center justify-between">
                <PixelIcon />
                <span
                  className="text-[0.7rem] font-semibold"
                  style={{ color: "#9b5de5", letterSpacing: "0.18em" }}
                >
                  {g.node}
                </span>
              </div>
              <h3
                className="text-[1.2rem] font-bold text-white"
                style={{ lineHeight: 1.2 }}
              >
                {g.title}
              </h3>
              <p
                className="mt-3 text-[0.88rem]"
                style={{ color: "#8888aa", lineHeight: 1.6 }}
              >
                {g.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {g.tools.map((t) => (
                  <span key={t} className="nc-chip">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-7">
                <a
                  href={g.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[0.85rem]"
                  style={{
                    color: "#9b5de5",
                    letterSpacing: "0.05em",
                    transition: "color 0.6s ease, text-shadow 0.6s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#c77dff";
                    e.currentTarget.style.textShadow =
                      "0 0 14px rgba(155,93,229,0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#9b5de5";
                    e.currentTarget.style.textShadow = "none";
                  }}
                >
                  GitHub →
                </a>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-20">
          <div className="nc-divider" />
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-12">
          <div
            className="mb-8 text-[0.8rem] font-semibold uppercase"
            style={{ color: "#9b5de5", letterSpacing: "0.25em" }}
          >
            Game Dev Skills
          </div>

          <div className="space-y-10">
            {GAME_SKILL_GROUPS.map((g) => (
              <div key={g.label}>
                <h4
                  className="mb-3 text-xs font-semibold uppercase"
                  style={{ color: "#9b5de5", letterSpacing: "0.25em" }}
                >
                  {g.label}
                </h4>
                <div
                  className="divide-y"
                  style={{ borderColor: "rgba(155,93,229,0.08)" }}
                >
                  {g.items.map((s) => (
                    <GameSkillRow key={s.name} name={s.name} value={s.value} />
                  ))}
                </div>
              </div>
            ))}

            <div>
              <div className="flex flex-wrap gap-3">
                {GAME_TOOL_CHIPS.map((c) => (
                  <span key={c} className="nc-concept-chip">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
