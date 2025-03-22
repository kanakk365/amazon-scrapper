import Faq from "@/components/landing-comps/faq";
import Features from "@/components/landing-comps/features";
import Footer from "@/components/landing-comps/footer";
import Hero from "@/components/landing-comps/hero";
import HowItWorks from "@/components/landing-comps/how-it-works";
import Navbar from "@/components/landing-comps/navbar";


export default function Landing() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black">
      <Navbar />
      <main id="main-content" className="flex-1 relative">
        <Hero />
        <Features />
        <HowItWorks/>
        <Faq />
        <Footer />
      </main>
    </div>
  )
}

