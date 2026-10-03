"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";

const FRAME_COUNT = 301;
const FRAME_PATH = (index: number) =>
  `/hero-frames/frame_${String(index + 1).padStart(4, "0")}.jpg`;

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: CanvasImageSource,
  canvasW: number,
  canvasH: number,
  imgW: number,
  imgH: number
) {
  const scale = Math.max(canvasW / imgW, canvasH / imgH);
  const w = imgW * scale;
  const h = imgH * scale;
  const x = (canvasW - w) / 2;
  const y = (canvasH - h) / 2;
  ctx.clearRect(0, 0, canvasW, canvasH);
  ctx.drawImage(img, x, y, w, h);
}

export default function ScrollScrubHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const targetProgress = useRef(0);
  const smoothProgress = useRef(0);
  const drawnFrame = useRef(-1);
  const rafRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const html = document.documentElement;
    const prevScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    framesRef.current = Array.from({ length: FRAME_COUNT }, () => null);

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(window.innerWidth * dpr));
      const h = Math.max(1, Math.floor(window.innerHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        drawnFrame.current = -1;
      }
    };

    const nearestLoaded = (index: number) => {
      const frames = framesRef.current;
      if (frames[index]) return index;
      for (let d = 1; d < FRAME_COUNT; d++) {
        if (index - d >= 0 && frames[index - d]) return index - d;
        if (index + d < FRAME_COUNT && frames[index + d]) return index + d;
      }
      return -1;
    };

    const paint = (index: number) => {
      const frameIndex = nearestLoaded(index);
      if (frameIndex < 0) return;
      const img = framesRef.current[frameIndex];
      if (!img) return;
      if (frameIndex === drawnFrame.current && drawnFrame.current >= 0) return;

      resizeCanvas();
      drawCover(
        ctx,
        img,
        canvas.width,
        canvas.height,
        img.naturalWidth || img.width,
        img.naturalHeight || img.height
      );
      drawnFrame.current = frameIndex;
    };

    // Full-page scroll: 0 at top → 1 at bottom of the document
    const updateTarget = () => {
      const max = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      targetProgress.current = Math.min(1, Math.max(0, window.scrollY / max));
    };

    const tick = () => {
      const ease = window.matchMedia("(pointer: coarse)").matches ? 0.3 : 0.2;
      smoothProgress.current +=
        (targetProgress.current - smoothProgress.current) * ease;

      if (Math.abs(targetProgress.current - smoothProgress.current) < 0.001) {
        smoothProgress.current = targetProgress.current;
      }

      const index = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(smoothProgress.current * (FRAME_COUNT - 1)))
      );
      paint(index);
      rafRef.current = requestAnimationFrame(tick);
    };

    const loadFrame = (index: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          framesRef.current[index] = img;
          if (index === 0) {
            paint(0);
            setReady(true);
          }
          resolve();
        };
        img.onerror = () => resolve();
        img.src = FRAME_PATH(index);
      });

    const preload = async () => {
      await loadFrame(0);
      const batch = 12;
      for (let start = 1; start < FRAME_COUNT; start += batch) {
        const jobs = [];
        for (let i = start; i < Math.min(FRAME_COUNT, start + batch); i++) {
          jobs.push(loadFrame(i));
        }
        await Promise.all(jobs);
        await new Promise((r) => setTimeout(r, 0));
      }
    };

    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget, { passive: true });
    window.addEventListener("touchmove", updateTarget, { passive: true });
    window.addEventListener("resize", resizeCanvas, { passive: true });

    resizeCanvas();
    updateTarget();
    void preload();
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      html.style.scrollBehavior = prevScrollBehavior;
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);
      window.removeEventListener("touchmove", updateTarget);
      window.removeEventListener("resize", resizeCanvas);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      framesRef.current = [];
    };
  }, []);

  return (
    <>
      {/* Fixed full-viewport animation — scrubbed by whole-page scroll */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-slate-900">
        <canvas
          ref={canvasRef}
          className={`h-full w-full transition-opacity duration-500 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden
        />
        {!ready && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={FRAME_PATH(0)}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden
          />
        )}
        <div className="absolute inset-0 bg-slate-950/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,158,11,0.16),transparent)]" />
      </div>

      <section
        className="relative z-10 flex min-h-[100svh] items-center justify-center"
        aria-label="Hero"
      >
        <div className="mx-auto w-full max-w-4xl px-4 pb-8 pt-[max(5.5rem,calc(env(safe-area-inset-top)+4.5rem))] text-center sm:px-6 sm:pt-24 lg:px-8">
          <h1 className="type-hero text-white">
            We Build Digital Experiences That{" "}
            <span className="text-amber-400">Convert</span>
          </h1>
          <p className="type-hero-subtitle mt-4 mx-auto max-w-2xl text-slate-200/95 sm:mt-6">
            Website development, UI/UX design, 3D websites, social media, e-commerce, event booking sites,
            and graphic design. One team for your entire digital presence.
          </p>
          <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Button
              href="/booking"
              className="w-full px-8 py-3.5 text-sm sm:min-w-[180px] sm:w-auto sm:py-4 sm:text-base"
            >
              Book a Project
            </Button>
            <Button
              href="/services"
              variant="outline"
              className="w-full border-white px-8 py-3.5 text-sm text-white hover:bg-white hover:text-slate-900 sm:min-w-[180px] sm:w-auto sm:py-4 sm:text-base"
            >
              View Services
            </Button>
          </div>
          <p className="type-perk mt-8 text-white/50 sm:mt-10">Scroll to explore</p>
        </div>
      </section>
    </>
  );
}
