"use client"

import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion"
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

const items = [
  {
    id: "1",
    title: "What Amazon product details can the scraper extract?",
    content:
      "Our scraper extracts product name, rating, number of ratings, selling price, total discount, bank offers, product information, technical specifications, all product images, manufacturer images, and AI-generated customer review summaries from any Amazon India product listing.",
  },
  {
    id: "2",
    title: "How does the product comparison feature work?",
    content:
      "You can add multiple product URLs to compare side by side. Our tool automatically aligns similar specifications and features, highlights differences, and provides visual charts comparing prices, ratings, and key features. The AI also generates a comparison summary to help you make informed decisions.",
  },
  {
    id: "3",
    title: "What file formats can I export the data in?",
    content:
      "You can export the scraped data in multiple formats including CSV, JSON, and Excel. Comparison reports can be exported as PDF documents with visual charts. Images are downloaded in their original format and can be packaged in a ZIP file along with the data.",
  },
  {
    id: "4",
    title: "Is using this web scraper legal?",
    content:
      "Our scraper is designed for personal research and comparison purposes only. We recommend checking Amazon's Terms of Service and using the tool responsibly. The data should not be used for commercial purposes without proper authorization.",
  },
]

export default function Faq() {
  return (
<div id="faq" className="space-y-4 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <h2 className="text-2xl text-center font-semibold text-[#cb4363]">FAQs</h2>
      <p className="text-center mb-5">Get answers to common questions about our AI automation platform</p>
      <Accordion type="single" collapsible className="w-full" defaultValue="3">
        {items.map((item) => (
          <AccordionItem value={item.id} key={item.id} className="py-2">
            <AccordionPrimitive.Header className="flex">
              <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-2 text-left text-[15px] font-semibold leading-6 transition-all [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180">
                {item.title}
                <Plus
                  size={16}
                  strokeWidth={2}
                  className="shrink-0 opacity-60 transition-transform duration-200"
                  aria-hidden="true"
                />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionContent className="pb-2 text-muted-foreground">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

