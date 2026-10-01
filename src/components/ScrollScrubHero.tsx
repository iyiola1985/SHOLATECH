"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";

const VIDEO_SRC = "/videos/hero-scrub.mp4";

export default function ScrollScrubHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetProgress = useRef(0);
  const smoothProgress = useRef(0);
  const rafRef = useRef<number | null>(null);
  const seekingRef = useRef(false);
  const [runwayVh, setRunwayVh] = useState(400);

  useEffect(() => {
    const updateRunway = () => {
      setRunwayVh(window.innerWidth < 768 ? 260 : 360);
    };
    updateRunway();
    window.addEventListener("resize", updateRunway);
    return () => window.removeEventListener("resize", updateRunway);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    // Smooth CSS scroll fights scroll-linked scrubbing
    const html = document.documentElement;
    const prevScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    video.pause();
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";

    const updateTarget = () => {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      if (total <= 0) {
        targetProgress.current = 0;
        return;
      }
      const scrolled = -rect.top;
      targetProgress.current = Math.min(1, Math.max(0, scrolled / total));
    };

    const onSeeking = () => {
      seekingRef.current = true;
    };
    const onSeeked = () => {
      seekingRef.current = false;
    };

    const tick = () => {
      const ease = window.matchMedia("(pointer: coarse)").matches ? 0.28 : 0.22;
      smoothProgress.current +=
        (targetProgress.current - smoothProgress.current) * ease;

      // Snap when very close so it doesn't crawl at the end
      if (Math.abs(targetProgress.current - smoothProgress.current) < 0.001) {
        smoothProgress.current = targetProgress.current;
      }

      if (video.duration && Number.isFinite(video.duration)) {
        const t = Math.min(
          video.duration - 0.04,
          Math.max(0, smoothProgress.current * video.duration)
        );
        // Don't queue seeks — wait until the previous seek finishes
        if (!seekingRef.current && Math.abs(video.currentTime - t) > 0.03) {
          try {
            video.currentTime = t;
          } catch {
            // Ignore seek errors while metadata is loading
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const onScroll = () => updateTarget();
    const onResize = () => updateTarget();

    const onLoaded = () => {
      updateTarget();
      seekingRef.current = false;
      video.currentTime = 0;
    };

    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("seeking", onSeeking);
    video.addEventListener("seeked", onSeeked);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    updateTarget();
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      html.style.scrollBehavior = prevScrollBehavior;
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("seeking", onSeeking);
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [runwayVh]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${runwayVh}vh` }}
      aria-label="Hero"
    >
      <div className="sticky top-0 flex h-[100dvh] min-h-[100svh] items-center justify-center overflow-hidden bg-slate-900">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          aria-hidden
        />
        <div className="absolute inset-0 bg-slate-950/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,158,11,0.18),transparent)]" />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 pb-8 pt-[max(5.5rem,calc(env(safe-area-inset-top)+4.5rem))] text-center sm:px-6 sm:pt-24 lg:px-8">
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
      </div>
    </section>
  );
}
