import type React from "react"
export default function Features() {
  return (
    <section id="features" className="py-20 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate__animated animate__fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Comprehensive Product Data Extraction
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Our scraper captures all essential product information from Amazon India listings with powerful comparison
            tools
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<DataVisualizationIcon />}
            title="Product & Pricing Details"
            description="Capture complete product information including name, rating, number of ratings, selling price, and total discount."
            features={["Product name & ratings", "Current selling price", "Discount information", "Bank offers"]}
          />

          <FeatureCard
            icon={<DocumentDraftingIcon />}
            title="Technical Specifications"
            description="Extract all technical details and product information sections for comprehensive analysis."
            features={["About this item", "Product specifications", "Technical details", "Manufacturer info"]}
          />

          <FeatureCard
            icon={<ComparisonIcon />}
            title="Product Comparison"
            description="Compare multiple products side by side with visual charts and AI-generated review summaries."
            features={[
              "Side-by-side comparison",
              "Feature comparison charts",
              "Price history tracking",
              "Review sentiment analysis",
            ]}
          />
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  features,
}: {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow animate__animated animate__fadeInUp">
      <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">{icon}</div>
      <h3 className="text-xl font-semibold text-neutral-900 mb-3">{title}</h3>
      <p className="text-neutral-600 mb-4">{description}</p>
      <ul className="space-y-2 text-neutral-600">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

function DataVisualizationIcon() {
  return (
    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 13v-1m4 1v-3m4 3V8M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18z"
      />
    </svg>
  )
}

function DocumentDraftingIcon() {
  return (
    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  )
}

function ComparisonIcon() {
  return (
    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  )
}

