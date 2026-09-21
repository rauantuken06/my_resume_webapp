"use client";

import { useEffect, useRef } from "react";

import { buildDots, mapping, spacingFor, type Dot } from "./sampler";
import { buildContours } from "./silhouette";

const TAU = Math.PI * 2;

/**
 * STEP 1 of the tracing workflow: render the traced contours as solid white on
 * black, with no dots and no animation, so the silhouette can be compared
 * against the reference. Flip to false to restore the dotted rendering; the
 * contours in silhouette.ts are identical either way.
 */
const SOLID_SILHOUETTE = true;

export default function DottedHands() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Follow the page's own ink colour rather than hard-coding a white.
    const chalk =
      getComputedStyle(canvas).getPropertyValue("--color-chalk").trim() || "#f3f3f3";

    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let start = 0;
    let lastDraw = 0;
    let running = false;

    const requestDraw = () => {
      if (running) return;
      running = true;
      frame = window.requestAnimationFrame(render);
    };

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;

      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      dots = SOLID_SILHOUETTE ? [] : buildDots(width, height, spacingFor(width));
      lastDraw = 0;
      requestDraw();
    };

    /** Fills the traced contours directly, for silhouette review. */
    const drawSolid = () => {
      const map = mapping(width, height);
      const contours = buildContours();
      context.clearRect(0, 0, width, height);
      context.fillStyle = chalk;

      for (const contour of contours) {
        context.beginPath();
        contour.points.forEach((point, index) => {
          const x = (point.x - map.originX) * map.scale;
          const y = point.y * map.scale;
          if (index === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        });
        context.closePath();
        context.fill();
      }
    };

    // Eight alpha buckets: one fill call each, instead of one per dot.
    const BUCKETS = 8;
    const buckets: Dot[][] = Array.from({ length: BUCKETS }, () => []);

    const render = (time: number) => {
      running = false;
      if (!start) start = time;

      if (SOLID_SILHOUETTE) {
        drawSolid();
        return;
      }

      // The shimmer is slow; 30fps is indistinguishable and much cheaper.
      if (lastDraw && time - lastDraw < 30) {
        requestDraw();
        return;
      }
      lastDraw = time;

      const elapsed = time - start;
      const reveal = reduceMotion ? 1 : Math.min(1, elapsed / 1500);
      const t = reduceMotion ? 0 : elapsed / 1000;

      context.clearRect(0, 0, width, height);
      for (const bucket of buckets) bucket.length = 0;

      for (const dot of dots) {
        // Reveal sweeps from the arms toward the almost-touching fingertips.
        const local = (reveal - dot.delay * 0.55) / 0.45;
        if (local <= 0) continue;
        const appear = Math.min(1, local);

        const wave = reduceMotion ? 0 : Math.sin(t * 1.1 + dot.phase);
        const alpha = (0.8 + 0.2 * dot.depth) * (0.88 + 0.12 * wave) * appear;

        const index = Math.min(BUCKETS - 1, Math.max(0, Math.round(alpha * BUCKETS) - 1));
        buckets[index].push(dot);
      }

      context.fillStyle = chalk;
      for (let i = 0; i < BUCKETS; i += 1) {
        const bucket = buckets[i];
        if (bucket.length === 0) continue;

        context.globalAlpha = (i + 1) / BUCKETS;
        context.beginPath();
        for (const dot of bucket) {
          const drift = reduceMotion ? 0 : Math.sin(t * 0.9 + dot.phase * 1.7) * 0.5;
          context.moveTo(dot.x + dot.r, dot.y + drift);
          context.arc(dot.x, dot.y + drift, dot.r, 0, TAU);
        }
        context.fill();
      }
      context.globalAlpha = 1;

      if (reduceMotion && reveal >= 1) return;
      requestDraw();
    };

    layout();

    const observer = new ResizeObserver(() => {
      layout();
    });
    observer.observe(canvas);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="hand-cloud" aria-hidden="true" />;
}
