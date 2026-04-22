import { useEffect, useRef, useState } from "react";

const ROLES = ["AI Engineer", "Software Developer", "Automation Builder"];

export function NeuralHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mountedRef = useRef(false);
  const [typed, setTyped] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Three.js scene
  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let raf = 0;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
      camera.position.z = 6;

      const violet = new THREE.Color("#9b5de5");

      const makePoints = (radius: number, count: number, size: number, opacity: number) => {
        const geo = new THREE.SphereGeometry(radius, count, count);
        const mat = new THREE.PointsMaterial({
          color: violet,
          size,
          transparent: true,
          opacity,
          sizeAttenuation: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        return new THREE.Points(geo, mat);
      };

      const inner = makePoints(2, 64, 0.025, 0.85);
      const outer = makePoints(2.6, 48, 0.018, 0.45);
      scene.add(inner);
      scene.add(outer);

      const light = new THREE.PointLight("#9b5de5", 2, 20);
      light.position.set(0, 0, 0);
      scene.add(light);
      scene.add(new THREE.AmbientLight(0x111122));

      const target = { x: 0, y: 0 };
      const onMouse = (e: MouseEvent) => {
        target.x = (e.clientX / window.innerWidth - 0.5) * 0.6;
        target.y = (e.clientY / window.innerHeight - 0.5) * 0.6;
      };
      window.addEventListener("mousemove", onMouse);

      const resize = () => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      window.addEventListener("resize", resize);

      const start = performance.now();
      const tick = () => {
        const t = (performance.now() - start) / 1000;
        inner.rotation.y += 0.001;
        inner.rotation.x += (target.y - inner.rotation.x) * 0.02;
        inner.rotation.z = Math.sin(t * 0.2) * 0.05;
        outer.rotation.y -= 0.0005;
        outer.rotation.x += (target.y * 0.8 - outer.rotation.x) * 0.02;
        scene.rotation.y += (target.x - scene.rotation.y) * 0.02;
        light.intensity = 1.5 + Math.sin(t * 1.5) * 0.8;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("mousemove", onMouse);
        window.removeEventListener("resize", resize);
        inner.geometry.dispose();
        outer.geometry.dispose();
        (inner.material as any).dispose();
        (outer.material as any).dispose();
        renderer.dispose();
      };
    })();

    return () => cleanup();
  }, []);

  // Typewriter
  useEffect(() => {
    const current = ROLES[roleIdx];
    const speed = deleting ? 50 : 90;
    const timer = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, typed.length + 1);
        setTyped(next);
        if (next === current) {
          setTimeout(() => setDeleting(true), 1600);
        }
      } else {
        const next = current.slice(0, typed.length - 1);
        setTyped(next);
        if (next === "") {
          setDeleting(false);
          setRoleIdx((i) => (i + 1) % ROLES.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [typed, deleting, roleIdx]);

  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ zIndex: 0, width: "100%", height: "100%" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 60%, rgba(155,93,229,0.08), transparent 60%)",
          zIndex: 0,
        }}
      />

      <div
        className="relative z-10 flex flex-col items-center px-6 text-center"
        style={{ zIndex: 1 }}
      >
        <h1 className="nc-hero-title">
          VISHWA B.
          <br />
          DHOLA
        </h1>

        <div
          className="mt-8 text-lg md:text-2xl"
          style={{ color: "#fff", letterSpacing: "0.04em", fontWeight: 300, minHeight: "2em" }}
        >
          {typed}
          <span className="nc-blink">|</span>
        </div>

        <p
          className="mt-6 max-w-xl text-sm md:text-base"
          style={{ color: "#8888aa", lineHeight: 1.7 }}
        >
          Navigating the intersection of intelligence, automation, and code.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a href="#work" className="nc-btn">
            Explore Work
          </a>
          <a href="#contact" className="nc-btn">
            Make Contact
          </a>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        style={{ zIndex: 1 }}
      >
        <span
          className="text-xs"
          style={{ color: "#8888aa", letterSpacing: "0.3em" }}
        >
          SCROLL
        </span>
        <div className="nc-scroll-line" />
      </div>
    </section>
  );
}