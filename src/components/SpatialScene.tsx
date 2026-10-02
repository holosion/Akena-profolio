import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

type SpatialSceneProps = { mode?: "hero" | "journey"; fallback?: string };

/** A real WebGL scene. Scroll controls the camera, sculpture, and system layers. */
export default function SpatialScene({
  mode = "hero",
  fallback = "/images/intelligence-core.webp",
}: SpatialSceneProps) {
  const container = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const host = container.current;
    if (!host || reduced) return;
    let stopped = false;
    let dispose: (() => void) | undefined;
    async function init() {
      const [T, { RoomEnvironment }] = await Promise.all([
        import("three"),
        import("three/addons/environments/RoomEnvironment.js"),
      ]);
      if (stopped || !host) return;
      const renderer = new T.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
      renderer.setPixelRatio(
        Math.min(devicePixelRatio, innerWidth < 700 ? 1.4 : 1.75),
      );
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = T.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.45;
      renderer.domElement.setAttribute("aria-hidden", "true");
      host.appendChild(renderer.domElement);
      const scene = new T.Scene();
      const camera = new T.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(0, 0, 8.5);
      const environment = new RoomEnvironment();
      const pmrem = new T.PMREMGenerator(renderer);
      const envTexture = pmrem.fromScene(environment, 0.04, 0.1, 100, {
        size: 128,
      });
      scene.environment = envTexture.texture;
      environment.dispose();
      scene.add(new T.AmbientLight(0x8988cc, 1.2));
      const violet = new T.PointLight(0x9761ff, 35, 20);
      violet.position.set(-3, 2, 3);
      scene.add(violet);
      const cyan = new T.PointLight(0x35dfff, 35, 20);
      cyan.position.set(3, -1, 3);
      scene.add(cyan);
      const pink = new T.PointLight(0xff5bbd, 24, 20);
      pink.position.set(0, -3, 0);
      scene.add(pink);
      const root = new T.Group();
      scene.add(root);
      const metal = new T.MeshPhysicalMaterial({
        color: 0xa5a2fa,
        metalness: 0.95,
        roughness: 0.16,
        clearcoat: 1,
      });
      const blueMetal = new T.MeshPhysicalMaterial({
        color: 0x61d7e9,
        metalness: 0.78,
        roughness: 0.2,
        clearcoat: 1,
      });
      const darkMetal = new T.MeshStandardMaterial({
        color: 0x15162c,
        metalness: 0.8,
        roughness: 0.35,
      });
      const purpleGlow = new T.MeshStandardMaterial({
        color: 0xa57aff,
        emissive: 0x7c39ee,
        emissiveIntensity: 1.3,
        metalness: 0.3,
        roughness: 0.2,
      });
      const core = new T.Group();
      root.add(core);
      const knot = new T.Mesh(
        new T.TorusKnotGeometry(1.22, 0.2, 160, 18, 2, 3),
        metal,
      );
      core.add(knot);
      const nucleus = new T.Mesh(new T.IcosahedronGeometry(0.54, 1), blueMetal);
      core.add(nucleus);
      const rings: InstanceType<typeof T.Mesh>[] = [];
      for (let i = 0; i < 3; i++) {
        const ring = new T.Mesh(
          new T.TorusGeometry(1.93 + i * 0.17, 0.012, 6, 140),
          i === 1 ? blueMetal : purpleGlow,
        );
        ring.rotation.set(0.45 + i * 0.7, i * 0.8, i * 0.4);
        core.add(ring);
        rings.push(ring);
      }
      const satelliteGeometry = new T.IcosahedronGeometry(0.11, 0);
      for (let i = 0; i < 9; i++) {
        const s = new T.Mesh(satelliteGeometry, i % 2 ? blueMetal : metal);
        const a = i * 2.399;
        s.position.set(
          Math.cos(a) * 2.3,
          Math.sin(a) * 1.7,
          Math.sin(a * 2) * 0.9,
        );
        core.add(s);
      }
      const hardware = new T.Group();
      scene.add(hardware);
      hardware.scale.setScalar(0.001);
      const pcbMaterial = new T.MeshStandardMaterial({
        color: 0x143544,
        metalness: 0.5,
        roughness: 0.4,
      });
      const board = new T.Mesh(new T.BoxGeometry(2.8, 0.1, 2.4), pcbMaterial);
      hardware.add(board);
      const chip = new T.Mesh(new T.BoxGeometry(1.05, 0.25, 1.05), metal);
      chip.position.y = 0.2;
      hardware.add(chip);
      const chipFace = new T.Mesh(
        new T.BoxGeometry(0.73, 0.015, 0.73),
        purpleGlow,
      );
      chipFace.position.y = 0.335;
      hardware.add(chipFace);
      const pinGeometry = new T.BoxGeometry(0.07, 0.05, 0.27);
      const pinMaterial = new T.MeshStandardMaterial({
        color: 0xf6c786,
        metalness: 0.85,
        roughness: 0.25,
      });
      for (let i = 0; i < 8; i++)
        for (let side = 0; side < 4; side++) {
          const pin = new T.Mesh(pinGeometry, pinMaterial);
          const offset = -0.44 + i * 0.125;
          pin.position.set(
            side < 2 ? offset : side === 2 ? -0.66 : 0.66,
            0.15,
            side < 2 ? (side === 0 ? -0.66 : 0.66) : offset,
          );
          if (side > 1) pin.rotation.y = Math.PI / 2;
          hardware.add(pin);
        }
      for (let i = 0; i < 12; i++) {
        const trace = new T.Mesh(
          new T.BoxGeometry(0.025, 0.012, 0.65),
          i % 2 ? blueMetal : purpleGlow,
        );
        trace.position.set(-1.1 + i * 0.2, 0.06, i % 2 ? 0.8 : -0.8);
        hardware.add(trace);
        const node = new T.Mesh(new T.SphereGeometry(0.035, 8, 8), purpleGlow);
        node.position.copy(trace.position);
        node.position.z += 0.3;
        hardware.add(node);
      }
      for (let i = 0; i < 4; i++) {
        const mount = new T.Mesh(
          new T.CylinderGeometry(0.065, 0.065, 0.035, 12),
          metal,
        );
        mount.position.set(i % 2 ? 1.22 : -1.22, 0.07, i < 2 ? 1.03 : -1.03);
        hardware.add(mount);
        const module = new T.Mesh(
          new T.BoxGeometry(0.3, 0.12, 0.48),
          darkMetal,
        );
        module.position.set(i % 2 ? 1.04 : -1.04, 0.12, i < 2 ? 0.5 : -0.5);
        hardware.add(module);
      }
      for (let i = 0; i < 10; i++) {
        const sign = i % 2 ? 1 : -1;
        const z = -0.8 + Math.floor(i / 2) * 0.4;
        const path = [
          new T.Vector3(sign * 0.6, 0.07, z * 0.5),
          new T.Vector3(sign * 0.8, 0.07, z * 0.5),
          new T.Vector3(sign * 0.9, 0.07, z),
          new T.Vector3(sign * 1.32, 0.07, z),
        ];
        const wire = new T.BufferGeometry().setFromPoints(path);
        hardware.add(
          new T.Line(
            wire,
            new T.LineBasicMaterial({ color: i % 3 ? 0x5af0ec : 0xdca15d }),
          ),
        );
      }
      hardware.rotation.set(1.18, 0.2, -0.2);
      const network = new T.Group();
      root.add(network);
      network.scale.setScalar(0.001);
      const nodes: InstanceType<typeof T.Vector3>[] = [];
      for (let i = 0; i < 22; i++) {
        const a = i * 2.399,
          y = 1 - (i / 21) * 2,
          r = Math.sqrt(1 - y * y);
        const position = new T.Vector3(
          Math.cos(a) * r * 1.9,
          y * 1.9,
          Math.sin(a) * r * 1.9,
        );
        nodes.push(position);
        const node = new T.Mesh(
          new T.IcosahedronGeometry(i % 5 === 0 ? 0.17 : 0.09, 1),
          i % 2 ? blueMetal : purpleGlow,
        );
        node.position.copy(position);
        network.add(node);
      }
      const connections: number[] = [];
      nodes.forEach((a, i) =>
        nodes.forEach((b, j) => {
          if (j > i && a.distanceTo(b) < 1.65)
            connections.push(a.x, a.y, a.z, b.x, b.y, b.z);
        }),
      );
      const lines = new T.BufferGeometry();
      lines.setAttribute(
        "position",
        new T.Float32BufferAttribute(connections, 3),
      );
      network.add(
        new T.LineSegments(
          lines,
          new T.LineBasicMaterial({
            color: 0xa77eff,
            transparent: true,
            opacity: 0.55,
          }),
        ),
      );
      const dustPositions: number[] = [];
      for (let i = 0; i < 100; i++)
        dustPositions.push(
          Math.sin(i * 17.3) * 5,
          Math.cos(i * 9.7) * 3.5,
          Math.sin(i * 11.8) * 2 - 1,
        );
      const dustGeometry = new T.BufferGeometry();
      dustGeometry.setAttribute(
        "position",
        new T.Float32BufferAttribute(dustPositions, 3),
      );
      const dust = new T.Points(
        dustGeometry,
        new T.PointsMaterial({
          color: 0xc5b4ff,
          size: 0.016,
          transparent: true,
          opacity: 0.7,
        }),
      );
      scene.add(dust);
      let frame = 0,
        visible = true,
        contextAvailable = true,
        target = 0,
        progress = 0,
        lastTime = 0,
        px = 0,
        py = 0;
      const clock = new T.Clock();
      const updateScroll = () => {
        const parent =
          mode === "journey"
            ? host.closest<HTMLElement>(".journey-section")
            : host.closest<HTMLElement>(".hero");
        if (!parent) return;
        const rect = parent.getBoundingClientRect();
        target = Math.max(
          0,
          Math.min(
            1,
            -rect.top /
              Math.max(
                1,
                parent.offsetHeight - (mode === "journey" ? innerHeight : 0),
              ),
          ),
        );
      };
      const draw = () => {
        if (stopped || !visible || !contextAvailable || document.hidden) return;
        const time = clock.getElapsedTime();
        const delta = Math.min(.15, time - lastTime);
        lastTime = time;
        const damping = 1 - Math.exp(-delta * 8);
        progress += (target - progress) * damping;
        root.rotation.y +=
          (time * 0.13 +
            progress * Math.PI * 1.5 +
            px * 0.35 -
            root.rotation.y) *
          damping;
        root.rotation.x +=
          (Math.sin(time * 0.3) * 0.13 + py * 0.2 - root.rotation.x) * damping;
        root.position.y = Math.sin(time * 0.6) * 0.09;
        knot.rotation.z = time * 0.08;
        rings.forEach((ring, i) => {
          ring.rotation.z += delta * .06 * (i % 2 ? 1 : -1);
        });
        dust.rotation.y = time * 0.015;
        if (mode === "journey") {
          const hardwareWeight = Math.max(0, 1 - Math.abs(progress - 0.5) * 4);
          const networkWeight = Math.max(0, (progress - 0.55) / 0.35);
          const coreWeight = Math.max(0, 1 - progress * 3.1);
          core.scale.setScalar(Math.max(0.001, coreWeight));
          hardware.scale.setScalar(Math.max(0.001, hardwareWeight * 1.35));
          network.scale.setScalar(
            Math.min(1.15, Math.max(0.001, networkWeight)),
          );
          core.visible = coreWeight > 0.01;
          hardware.visible = hardwareWeight > 0.01;
          network.visible = networkWeight > 0.01;
          hardware.rotation.y = Math.sin(progress * Math.PI * 2) * .22;
          hardware.position.y = root.position.y;
          camera.position.z = 8.3 - Math.sin(progress * Math.PI) * 0.8;
        } else {
          hardware.visible = false;
          network.visible = false;
          core.rotation.z = progress * 0.4;
          camera.position.z = 8.5 - progress * 1.2;
        }
        renderer.render(scene, camera);
        frame = requestAnimationFrame(draw);
      };
      const resize = () => {
        const width = host.clientWidth,
          height = host.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / Math.max(height, 1);
        camera.updateProjectionMatrix();
        updateScroll();
      };
      const onPointer = (e: PointerEvent) => {
        px = e.clientX / innerWidth - 0.5;
        py = e.clientY / innerHeight - 0.5;
      };
      const resume = () => {
        cancelAnimationFrame(frame);
        if (visible && !document.hidden) draw();
      };
      const intersection = new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting;
        resume();
      });
      intersection.observe(host);
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);
      const contextLost = (event: Event) => {
        event.preventDefault();
        contextAvailable = false;
        cancelAnimationFrame(frame);
        setReady(false);
      };
      renderer.domElement.addEventListener("webglcontextlost", contextLost);
      window.addEventListener("scroll", updateScroll, { passive: true });
      window.addEventListener("pointermove", onPointer, { passive: true });
      document.addEventListener("visibilitychange", resume);
      resize();
      draw();
      setReady(true);
      dispose = () => {
        cancelAnimationFrame(frame);
        intersection.disconnect();
        resizeObserver.disconnect();
        window.removeEventListener("scroll", updateScroll);
        window.removeEventListener("pointermove", onPointer);
        document.removeEventListener("visibilitychange", resume);
        renderer.domElement.removeEventListener(
          "webglcontextlost",
          contextLost,
        );
        const geometries = new Set<InstanceType<typeof T.BufferGeometry>>();
        const materials = new Set<InstanceType<typeof T.Material>>();
        scene.traverse((object) => {
          if ("geometry" in object)
            geometries.add((object as InstanceType<typeof T.Mesh>).geometry);
          if ("material" in object) {
            const m = (object as InstanceType<typeof T.Mesh>).material;
            (Array.isArray(m) ? m : [m]).forEach((item) => materials.add(item));
          }
        });
        geometries.forEach((g) => g.dispose());
        materials.forEach((m) => m.dispose());
        envTexture.dispose();
        pmrem.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }
    let started = false;
    const loadWhenVisible = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          loadWhenVisible.disconnect();
          init().catch(() => {
            if (!stopped) setReady(false);
          });
        }
      },
      { rootMargin: "100px" },
    );
    loadWhenVisible.observe(host);
    return () => {
      stopped = true;
      loadWhenVisible.disconnect();
      dispose?.();
    };
  }, [mode, reduced]);
  return (
    <div
      ref={container}
      className={`spatial-scene ${ready && !reduced ? "scene-ready" : ""}`}
      aria-hidden="true"
    >
      <img
        className="scene-fallback"
        src={fallback}
        alt=""
        loading={mode === "hero" ? "eager" : "lazy"}
      />
    </div>
  );
}
