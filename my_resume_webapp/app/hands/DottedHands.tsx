"use client";

import { useEffect, useRef } from "react";

import { buildDots, type Dot } from "./sampler";

/**
 * Renders the reference halftone extracted in reference-map.ts.
 *
 * The dots, their positions and their base brightness all come from the
 * reference image itself. Motion is a one-time reveal sweeping in from the
 * arms toward the almost-touching fingertips, followed by a brightness wave
 * that travels across the hands so the dots light up and fade in sequence
 * rather than all at once. The wave only scales each dot's traced brightness,
 * so the shading of the reference is preserved throughout.
 */
export default function DottedHands() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let start = 0;
    let lastDraw = 0;
    let running = false;

    // Travelling wave. Speed is in radians per second: at 2.2 cycles across
    // the composition this walks a band over the hands in roughly six seconds.
    const WAVE_SPEED = 1.1;
    // A dot dims to this fraction of its traced brightness at the wave's
    // trough, and returns to exactly the traced value at its crest.
    const WAVE_FLOOR = 0.5;

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

      dots = buildDots(width, height);
      lastDraw = 0;
      requestDraw();
    };

    // One fill per brightness level, instead of one per dot. The reference
    // uses fifteen levels, so each gets its own bucket and nothing is banded.
    const LEVELS = 16;
    const buckets: Dot[][] = Array.from({ length: LEVELS }, () => []);

    const render = (time: number) => {
      running = false;
      if (!start) start = time;

      // The wave is slow, so 30fps is indistinguishable and far cheaper than
      // redrawing a few thousand marks every frame.
      if (lastDraw && time - lastDraw < 30) {
        requestDraw();
        return;
      }
      lastDraw = time;

      const elapsed = time - start;
      const reveal = reduceMotion ? 1 : Math.min(1, elapsed / 1500);
      const clock = elapsed / 1000;

      context.clearRect(0, 0, width, height);
      for (const bucket of buckets) bucket.length = 0;

      for (const dot of dots) {
        const local = (reveal - dot.delay * 0.55) / 0.45;
        if (local <= 0) continue;
        const appear = Math.min(1, local);

        // Crest returns the dot to its traced brightness; trough dims it.
        // Phase runs with the dot's column, so the band sweeps left to right.
        const wave = reduceMotion
          ? 1
          : 0.5 + 0.5 * Math.sin(clock * WAVE_SPEED - dot.phase);
        const lit = WAVE_FLOOR + (1 - WAVE_FLOOR) * wave;

        const alpha = dot.shade * lit * appear;
        const index = Math.min(LEVELS - 1, Math.max(0, Math.round(alpha * (LEVELS - 1))));
        if (index === 0) continue;
        buckets[index].push(dot);
      }

      context.fillStyle = "#ffffff";
      for (let i = 1; i < LEVELS; i += 1) {
        const bucket = buckets[i];
        if (bucket.length === 0) continue;

        context.globalAlpha = i / (LEVELS - 1);
        context.beginPath();
        for (const dot of bucket) {
          // The reference's mark is a diamond, not a circle.
          context.moveTo(dot.x, dot.y - dot.ry);
          context.lineTo(dot.x + dot.r, dot.y);
          context.lineTo(dot.x, dot.y + dot.ry);
          context.lineTo(dot.x - dot.r, dot.y);
          context.closePath();
        }
        context.fill();
      }
      context.globalAlpha = 1;

      // With reduced motion the reveal ends on the traced image and stops;
      // otherwise the wave keeps running.
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
