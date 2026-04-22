import { useEffect, useRef } from "react";
import { Reveal } from "./Reveal";

function DriftingNodes() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const resize = () => {
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
    };
    resize();

    type N = { x: number; y: number; vx: number; vy: number; r: number };
    const nodes: N[] = Array.from({ length: 36 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.15 * dpr,
      vy: (Math.random() - 0.5) * 0.15 * dpr,
      r: (Math.random() * 1.6 + 0.4) * dpr,
    }));

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          const max = 140 * dpr;
          if (d < max) {
            ctx.strokeStyle = `rgba(155,93,229,${(1 - d / max) * 0.18})`;
            ctx.lineWidth = 0.6 * dpr;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      // Nodes
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        ctx.fillStyle = "rgba(155,93,229,0.7)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      style={{ opacity: 0.3, pointerEvents: "none" }}
    />
  );
}

const LINKS = [
  { label: "vishwadhola217@gmail.com", href: "mailto:vishwadhola217@gmail.com" },
  { label: "github.com/VishwaGit-hub", href: "https://github.com/VishwaGit-hub" },
  {
    label: "linkedin.com/in/vishwa-dhola-unity-gamedev",
    href: "https://linkedin.com/in/vishwa-dhola-unity-gamedev",
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-32 md:px-10"
    >
      <DriftingNodes />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="nc-section-title">Let's Connect</h2>
        </Reveal>
        <Reveal>
          <p
            className="mt-4 text-sm md:text-base"
            style={{ color: "#8888aa", letterSpacing: "0.04em" }}
          >
            Open to AI, software, and automation opportunities.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col items-center gap-5">
          {LINKS.map((l, i) => (
            <Reveal key={l.href} delay={i * 80}>
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="text-base md:text-lg"
                style={{
                  color: "#fff",
                  letterSpacing: "0.04em",
                  transition: "color 0.6s ease, text-shadow 0.6s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#9b5de5";
                  e.currentTarget.style.textShadow = "0 0 18px rgba(155,93,229,0.7)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.textShadow = "none";
                }}
              >
                {l.label}
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative">
      <div className="mx-auto h-px max-w-6xl" style={{ background: "rgba(155,93,229,0.3)" }} />
      <div
        className="mx-auto max-w-6xl px-6 py-8 text-center text-xs md:px-10"
        style={{ color: "#8888aa", letterSpacing: "0.1em" }}
      >
        © 2025 Vishwa B. Dhola
      </div>
    </footer>
  );
}