import { useEffect, useState } from "react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#hackathon", label: "Hackathon" },
  { href: "#games", label: "Games" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{
        background: "rgba(5,5,8,0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(155,93,229,0.3)",
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#top"
          className="text-base font-extrabold tracking-[0.18em] text-white transition-all duration-700"
          style={{ fontFamily: "Inter" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.textShadow = "0 0 20px rgba(155,93,229,0.7)";
            e.currentTarget.style.color = "#9b5de5";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.textShadow = "none";
            e.currentTarget.style.color = "#ffffff";
          }}
        >
          VISHWA
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm tracking-[0.12em] text-white no-underline"
                style={{ transition: "color 0.6s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#9b5de5")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          aria-label="Toggle navigation"
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          style={{
            background: "transparent",
            border: "1px solid rgba(155,93,229,0.4)",
            color: "#fff",
            padding: "8px 12px",
            borderRadius: 100,
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
          }}
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </nav>
    </header>

    {open && (
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 md:hidden"
          style={{
            background: "#050508",
            WebkitBackdropFilter: "blur(20px)",
            backdropFilter: "blur(20px)",
          }}
        >
          <button
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="absolute right-6 top-4"
            style={{
              background: "transparent",
              border: "1px solid rgba(155,93,229,0.4)",
              color: "#fff",
              padding: "8px 12px",
              borderRadius: 100,
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
            }}
          >
            CLOSE
          </button>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-2xl font-light tracking-[0.2em] text-white"
              style={{ transition: "color 0.6s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#9b5de5")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
            >
              {l.label.toUpperCase()}
            </a>
          ))}
        </div>
      )}
    </>
  );
}