import Header from "@/components/landing/header";
import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import Preview from "@/components/landing/preview";
import Testimonials from "@/components/landing/testimonials";
import FAQ from "@/components/landing/faq";
import Footer from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <Preview />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
