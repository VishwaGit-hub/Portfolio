import { useEffect, useRef } from "react";

type Node = { id: number; x: number; y: number };

export function SparkLayer() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const nodes: Node[] = [];
    let nextId = 1;

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest("a, button, input, textarea, select, label")) return;

      const x = e.clientX + window.scrollX;
      const y = e.clientY + window.scrollY;
      const id = nextId++;
      const node: Node = { id, x, y };

      // SVG container for lines
      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("class", "nc-spark-svg");
      svg.style.position = "absolute";
      svg.style.left = "0";
      svg.style.top = "0";
      svg.style.width = `${document.documentElement.scrollWidth}px`;
      svg.style.height = `${document.documentElement.scrollHeight}px`;
      svg.style.pointerEvents = "none";
      svg.style.zIndex = "4";

      // 3 nearest existing nodes
      const nearest = [...nodes]
        .map((n) => ({ n, d: Math.hypot(n.x - x, n.y - y) }))
        .sort((a, b) => a.d - b.d)
        .slice(0, 3);

      nearest.forEach(({ n }) => {
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", String(x));
        line.setAttribute("y1", String(y));
        line.setAttribute("x2", String(n.x));
        line.setAttribute("y2", String(n.y));
        line.setAttribute("stroke", "rgba(155,93,229,0.4)");
        line.setAttribute("stroke-width", "1");
        svg.appendChild(line);
      });

      const dot = document.createElement("div");
      dot.className = "nc-spark-node";
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      dot.style.opacity = "1";

      layer.appendChild(svg);
      layer.appendChild(dot);
      nodes.push(node);

      // Fade
      requestAnimationFrame(() => {
        dot.style.opacity = "0";
        svg.style.transition = "opacity 4s linear";
        svg.style.opacity = "0";
      });

      setTimeout(() => {
        dot.remove();
        svg.remove();
        const idx = nodes.findIndex((m) => m.id === id);
        if (idx >= 0) nodes.splice(idx, 1);
      }, 4200);
    };

    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 4,
        overflow: "hidden",
        width: "100%",
        minHeight: "100%",
      }}
    />
  );
}