import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import { TiltCard } from "./TiltCard";

type Project = {
  node: string;
  title: string;
  description: string;
  tools: string[];
  link?: string;
  linkLabel: string;
};

const PROJECTS: Project[] = [
  {
    node: "NODE 01",
    title: "Recruitment Automation System",
    description:
      "Automates candidate screening, resume parsing, and the evaluation pipeline end-to-end.",
    tools: ["Python", "FastAPI", "OpenAI API", "PostgreSQL"],
    linkLabel: "In Development",
  },
  {
    node: "NODE 02",
    title: "Sales Copilot AI Agent",
    description:
      "Automates prospect research from LinkedIn and company websites for sales outreach.",
    tools: ["Relevance AI", "Firecrawl", "LLMs"],
    link: "https://app.relevanceai.com/agents/d7b62b/bf55a823b9e0-41fc-a88e-c5f855e66db5/95ea29ac-cb19-4425-8147-d2291e5a2015/embed-chat?conversationId=new",
    linkLabel: "Explore Node →",
  },
  {
    node: "NODE 03",
    title: "Connor's Cleaning Chatbot",
    description:
      "Booking automation via conversational chatbot for a cleaning business.",
    tools: ["Voiceflow", "Make.com", "Twilio"],
    link: "https://peaceful-lollipop-21348a.netlify.app/",
    linkLabel: "Explore Node →",
  },
  {
    node: "NODE 04",
    title: "Digital Image Processing Tool",
    description:
      "Desktop app for cropping, grayscale conversion, intensity transformations, edge detection, filters, histogram visualization, and image export.",
    tools: ["Python", "OpenCV", "NumPy", "Tkinter"],
    link: "https://github.com/VishwaGit-hub/DIP_TOOL_DASHBOARD",
    linkLabel: "Explore Node →",
  },
];

function CardStars() {
  return (
    <div className="nc-card-stars" aria-hidden="true">
      <span style={{ top: 4, left: 8 }} />
      <span style={{ top: 14, left: 28 }} />
      <span style={{ top: 0, left: 48 }} />
      <span style={{ top: 24, left: 18 }} />
      <span style={{ top: 30, left: 44 }} />
    </div>
  );
}

export function Projects() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <Reveal>
        <SectionTitle
          title="Projects"
          subtitle="Regions of built intelligence"
        />
      </Reveal>

      <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.node} delay={i * 80}>
            <TiltCard className="nc-card h-full">
              <CardStars />
              <div
                className="text-[0.7rem] font-semibold"
                style={{ color: "#9b5de5", letterSpacing: "0.18em" }}
              >
                {p.node}
              </div>
              <h3
                className="mt-3 text-xl font-bold text-white"
                style={{ lineHeight: 1.2 }}
              >
                {p.title}
              </h3>
              <p
                className="mt-3 text-sm"
                style={{ color: "#8888aa", lineHeight: 1.7 }}
              >
                {p.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tools.map((t) => (
                  <span key={t} className="nc-chip">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-7">
                {p.link ? (
                  <a
                    href={p.link}
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
                      e.currentTarget.style.textShadow = "0 0 14px rgba(155,93,229,0.6)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#9b5de5";
                      e.currentTarget.style.textShadow = "none";
                    }}
                  >
                    {p.linkLabel}
                  </a>
                ) : (
                  <span
                    className="text-[0.85rem]"
                    style={{ color: "#555577", letterSpacing: "0.05em" }}
                  >
                    {p.linkLabel}
                  </span>
                )}
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}