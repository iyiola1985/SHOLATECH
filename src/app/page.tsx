import Button from "@/components/Button";
import LiveFeedbackSection from "@/components/LiveFeedbackSection";
import ScrollScrubHero from "@/components/ScrollScrubHero";

export default function Home() {
  return (
    <div className="relative bg-transparent">
      {/* Hero + Our Work share the sticky scroll animation */}
      <ScrollScrubHero />

      {/* Client reviews */}
      <div className="relative z-10">
        <LiveFeedbackSection />
      </div>

      {/* Contact CTA */}
      <section className="relative z-10 bg-slate-950/55 px-4 py-16 backdrop-blur-md sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="type-section-title text-white">
            Ready to Start Your Project?
          </h2>
          <p className="type-subtitle mt-4 text-white/90">
            Tell us your idea and we&apos;ll get back with a plan and quote.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              href="/booking"
              className="min-w-[180px] px-8 py-4 text-base transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              Book a Project
            </Button>
            <Button
              href="/contact"
              variant="outline"
              className="min-w-[180px] border-white px-8 py-4 text-base text-white hover:bg-white hover:text-slate-900 transition-transform duration-300 hover:scale-105"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
