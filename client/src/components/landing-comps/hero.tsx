import { ArrowRight } from "lucide-react"
import { ShimmerButton } from "../ui/shimmer-button"

export default function Hero() {
  return (
    <section id="hero" className="min-h-[70vh] bg-[#f5f5f5] relative overflow-hidden pt-20 mt-12">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_70%,transparent_100%)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between pt-20 pb-16">
          <div className="lg:w-full flex flex-col items-center text-center mb-12 lg:mb-0">
            <div className="flex flex-col text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 animate__animated animate__fadeInUp">
              <div className="text-[#1f1f1f]">
                <span className="text-[#1d293d]">Amazon Product</span>{" "}
              </div>
              <span className="text-[#1d293d]">Scraper & Comparison</span>
            </div>
            <p className="max-w-2xl text-lg text-neutral-700 mb-8 animate__animated animate__fadeInUp animate__delay-1s">
              Extract comprehensive product details from any Amazon India listing and compare multiple products side by
              side. Get pricing, specifications, images, and AI-generated review summaries with a single click.
            </p>
            <div className="mt-3 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate__animated animate__fadeInUp animate__delay-2s">
              <ShimmerButton className="bg-[#474747] px-8">
                <div className="gap-2 hover:gap-4 flex items-center">
                  Start Scraping <ArrowRight size={14} />
                </div>
              </ShimmerButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

