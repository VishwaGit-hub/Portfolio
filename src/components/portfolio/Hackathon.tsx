import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import { TiltCard } from "./TiltCard";

export function Hackathon() {
  return (
    <section id="hackathon" className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <Reveal>
        <SectionTitle
          title="Hackathon"
          subtitle="Built under pressure, shipped under fire"
        />
      </Reveal>

      <Reveal>
        <div className="relative">
          <div className="nc-pulse-ring" />
          <TiltCard
            className="relative overflow-hidden"
            style={{
              background: "rgba(155,93,229,0.06)",
              border: "1px solid rgba(155,93,229,0.3)",
              borderRadius: 24,
              padding: "clamp(28px, 5vw, 56px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <div
                  className="text-[0.7rem] font-semibold"
                  style={{ color: "#9b5de5", letterSpacing: "0.2em" }}
                >
                  HACKATHON ENTRY
                </div>
                <h3 className="mt-3 text-2xl font-bold text-white md:text-3xl">
                  Delivery System with Chatbot Integration
                </h3>
                <p
                  className="mt-4 max-w-xl text-sm md:text-base"
                  style={{ color: "#8888aa", lineHeight: 1.7 }}
                >
                  End-to-end delivery system built and shipped at a hackathon —
                  chatbot integration for placing and tracking delivery orders
                  in real time.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["React", "Firebase", "Voiceflow"].map((t) => (
                    <span key={t} className="nc-chip">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-7">
                  <a
                    href="https://github.com/VishwaGit-hub"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[0.9rem]"
                    style={{ color: "#9b5de5", letterSpacing: "0.05em" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textShadow = "0 0 14px rgba(155,93,229,0.6)";
                      e.currentTarget.style.color = "#c77dff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textShadow = "none";
                      e.currentTarget.style.color = "#9b5de5";
                    }}
                  >
                    GitHub →
                  </a>
                </div>
              </div>

              <div
                className="hidden select-none md:block"
                aria-hidden="true"
                style={{
                  fontWeight: 800,
                  fontSize: "clamp(6rem, 15vw, 11rem)",
                  lineHeight: 0.85,
                  color: "rgba(155,93,229,0.06)",
                  letterSpacing: "-0.05em",
                }}
              >
                01
              </div>
            </div>
          </TiltCard>
        </div>
      </Reveal>
    </section>
  );
}