"use client";

import { useEffect, useRef } from "react";
import styles from "@/app/sections.module.css";
import { THEME_EVENT } from "@/lib/theme";

/**
 * Hero background: drifting nodes joined by proximity lines.
 * IntersectionObserver pauses it when the hero scrolls out of view, and
 * prefers-reduced-motion renders a single static frame instead of animating.
 */
export function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
    const LINK = 132;
    let width = 0, height = 0, nodes: Node[] = [], frame = 0, onScreen = false;
    let accent = "#22d3ee";

    const readAccent = () => {
      accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#22d3ee";
    };

    const paint = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = accent;
      ctx.fillStyle = accent;
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i], b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist > LINK) continue;
          ctx.globalAlpha = (1 - dist / LINK) * 0.32;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 0.55;
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const step = () => {
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }
      paint();
      frame = requestAnimationFrame(step);
    };

    const play = () => {
      if (!frame && onScreen && !motionQuery.matches) frame = requestAnimationFrame(step);
    };
    const pause = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(16, Math.min(60, Math.round((width * height) / 16000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.34,
        vy: (Math.random() - 0.5) * 0.34,
        r: 1 + Math.random() * 1.4,
      }));
      paint();
    };

    const visibility = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) play();
        else pause();
      },
      { threshold: 0 },
    );
    const geometry = new IntersectionObserver(() => resize(), { threshold: 0 });

    const onResize = debounce(resize, 150);
    const onMotionChange = () => {
      pause();
      paint();
      play();
    };
    const onThemeChange = () => {
      readAccent();
      paint();
    };

    visibility.observe(canvas);
    geometry.observe(canvas);
    window.addEventListener("resize", onResize);
    motionQuery.addEventListener("change", onMotionChange);
    document.addEventListener(THEME_EVENT, onThemeChange);

    readAccent();
    resize();

    return () => {
      pause();
      visibility.disconnect();
      geometry.disconnect();
      window.removeEventListener("resize", onResize);
      motionQuery.removeEventListener("change", onMotionChange);
      document.removeEventListener(THEME_EVENT, onThemeChange);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.hero__canvas} aria-hidden="true" />;
}

type Node = { x: number; y: number; vx: number; vy: number; r: number };

function debounce(fn: () => void, ms: number) {
  let timer: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, ms);
  };
}
