"use client";

import { useEffect } from "react";

export function ParticleTrail() {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const trail: { x: number; y: number; time: number }[] = [];
    const TRAIL_DURATION = 600; // ms sebelum hilang

    const onMouseMove = (e: MouseEvent) => {
      trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    };

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    let rafId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();

      // hapus point yang sudah expired
      while (trail.length > 0 && now - trail[0].time > TRAIL_DURATION) {
        trail.shift();
      }

      for (let i = 0; i < trail.length - 1; i++) {
        const point = trail[i];
        const next = trail[i + 1];
        const age = now - point.time;
        const alpha = (1 - age / TRAIL_DURATION) * 0.8;
        const progress = i / trail.length;
        const size = progress * 8;

        // glow dot
        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, size);
        gradient.addColorStop(0, `rgba(245, 158, 11, ${alpha})`);
        gradient.addColorStop(1, `rgba(245, 158, 11, 0)`);
        ctx.fillStyle = gradient;
        ctx.fill();

        // line
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(next.x, next.y);
        ctx.strokeStyle = `rgba(245, 158, 11, ${alpha * 0.4})`;
        ctx.lineWidth = progress * 4;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
      canvas.remove();
    };
  }, []);

  return null;
}