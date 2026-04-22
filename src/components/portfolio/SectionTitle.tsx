import type { ReactNode } from "react";

export function SectionTitle({
  title,
  subtitle,
  align = "left",
}: {
  title: string;
  subtitle?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div
      className={
        align === "center"
          ? "mb-12 flex flex-col items-center text-center"
          : "mb-12 flex flex-col items-start"
      }
    >
      <div className={`flex items-center gap-4 ${align === "center" ? "justify-center" : ""}`}>
        <span className="nc-constellation" aria-hidden="true">
          <span />
        </span>
        <h2 className="nc-section-title">{title}</h2>
      </div>
      {subtitle && (
        <p
          className="mt-3 text-sm md:text-base"
          style={{ color: "#8888aa", letterSpacing: "0.04em" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function SectionDivider() {
  return (
    <div className="mx-auto my-24 max-w-6xl px-6">
      <div className="nc-divider" />
    </div>
  );
}