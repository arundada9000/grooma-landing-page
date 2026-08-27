"use client";

import { SmoothScroll } from "@/components/smooth-scroll";
import { Header } from "@/components/site/header";
import { MobileNav } from "@/components/site/mobile-nav";
import { Footer } from "@/components/site/footer";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { FeedbackToggle } from "@/components/ui/feedback-toggle";

/**
 * The shared site shell: every page renders inside the same chrome so the
 * reading experience, navigation and buy-hooks stay consistent across routes.
 * Client component because Lenis smooth-scroll, the scroll tracker and the
 * sticky header all need the browser.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FeedbackToggle />
      <MobileNav />
    </SmoothScroll>
  );
}
