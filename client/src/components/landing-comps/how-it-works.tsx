import type React from "react"
import { PulsatingButton } from "../ui/pulsating-button"

export default function HowItWorks() {
  return (
    <section id="howItWorks" className="py-20 bg-[#f5f5f5] text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate__animated animate__fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1d293d]">How It Works</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Extract complete product data from Amazon India and compare products in three simple steps
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-[#cb4363] transform -translate-y-1/2"></div>

          <div className="grid lg:grid-cols-3 gap-12 relative z-10">
            <StepCard
              number={1}
              title="Paste Amazon Product URLs"
              description="Copy and paste one or multiple Amazon India product URLs into our scraper for individual analysis or comparison."
              color="blue"
              delay="animate__delay-1s"
            >
              <div className="bg-neutral-100/50 rounded-lg p-4 mt-4">
                <div className="flex items-center justify-center border-2 border-dashed border-neutral-300 rounded-lg p-4">
                  <svg className="w-8 h-8 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 10-5.656-5.656l-1.102 1.101"
                    />
                  </svg>
                </div>
              </div>
            </StepCard>

            <StepCard
              number={2}
              title="Select Data & Comparison Options"
              description="Choose which product details to extract and how you want to compare multiple products."
              color="purple"
              delay="animate__delay-2s"
            >
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="bg-neutral-100/50 rounded-lg p-2 text-center text-sm">Product Info</div>
                <div className="bg-neutral-100/50 rounded-lg p-2 text-center text-sm">Pricing</div>
                <div className="bg-neutral-100/50 rounded-lg p-2 text-center text-sm">Images</div>
                <div className="bg-neutral-100/50 rounded-lg p-2 text-center text-sm">Compare</div>
              </div>
            </StepCard>

            <StepCard
              number={3}
              title="View Results & Compare"
              description="Get your data in your preferred format with side-by-side comparison charts and analysis."
              color="#cb4363"
              delay="animate__delay-3s"
            >
              <div className="mt-4">
                <PulsatingButton className="w-full font-semibold text-lg">Start Scraping Now</PulsatingButton>
              </div>
            </StepCard>
          </div>
        </div>
      </div>
    </section>
  )
}

interface StepCardProps {
  number: number
  title: string
  description: string
  color: "blue" | "purple" | "#cb4363"
  delay: string
  children: React.ReactNode
}

function StepCard({ number, title, description, color, delay, children }: StepCardProps) {
  const bgColor = `bg-${color}-600/10`
  const textColor = `text-[${color}]`

  return (
    <div
      className={`bg-white shadow-lg rounded-xl p-8 transition-transform hover:-translate-y-2 animate__animated animate__fadeInLeft ${delay}`}
    >
      <div className={`${bgColor} w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto`}>
        <span className={`text-2xl font-bold ${textColor}`}>{number}</span>
      </div>
      <h3 className="text-xl font-semibold text-center mb-4">{title}</h3>
      <p className="text-neutral-600 text-center mb-4">{description}</p>
      {children}
    </div>
  )
}

