import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, StarHalf, BrainCircuit } from "lucide-react"
import { Product } from "@/types/product"

interface ProductDetailsProps {
  product: Product | null
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  if (!product) return null

  return (
    <div className="space-y-6">
      <div className="border border-[#1d293d]/20 rounded-lg shadow-sm overflow-hidden">
        <header className="bg-[#1d293d]/10 p-4 pb-2">
          <h2 className="text-xl text-[#1d293d] font-bold">{product.productName}</h2>
        </header>
        <div className="p-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => {
                const rating = Number.parseFloat(product.rating?.split(" ")[0] || "0")
                if (i < Math.floor(rating)) {
                  return <Star key={i} className="h-5 w-5 fill-[#cb4363] text-[#cb4363]" />
                } else if (i === Math.floor(rating) && rating % 1 >= 0.5) {
                  return <StarHalf key={i} className="h-5 w-5 fill-[#cb4363] text-[#cb4363]" />
                } else {
                  return <Star key={i} className="h-5 w-5 text-gray-300" />
                }
              })}
              <span className="ml-2 text-sm text-gray-600">{product.rating}</span>
            </div>
            <span className="text-sm text-gray-600">{product.numberOfRatings}</span>
            <Badge className="bg-[#cb4363]/90 hover:bg-[#cb4363] text-white ml-auto md:ml-0">
              {product.totalDiscount}
            </Badge>
            <span className="text-xl font-bold text-[#1d293d] ml-auto">{product.sellingPrice}</span>
          </div>

          {product.amazonAiSummary && (
            <div className="mb-4 p-4 bg-[#f0f4f8] rounded-lg border border-[#1d293d]/10">
              <div className="flex items-start gap-3">
                <BrainCircuit className="h-5 w-5 text-[#cb4363] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#1d293d] mb-1">AI Summary</h3>
                  <p className="text-sm text-gray-700">{product.amazonAiSummary}</p>
                </div>
              </div>
            </div>
          )}

          {product.bankOffers && product.bankOffers.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-[#1d293d] mb-2">Bank Offers</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {product.bankOffers.map((offer: string, index: number) => (
                  <li key={index} className="text-gray-700">
                    {offer}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Separator className="my-4" />

          {product.aboutThisItem && product.aboutThisItem.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-[#1d293d] mb-2">About This Item</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {product.aboutThisItem.map((item: string, index: number) => (
                  <li key={index} className="text-gray-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.productInformation && Object.keys(product.productInformation).length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-[#1d293d] mb-2">Product Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                {Object.entries(product.productInformation).map(([key, value]: [string, any]) => (
                  <div key={key} className="flex">
                    <span className="font-medium text-gray-700 min-w-[150px]">{key}:</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {product.reviews && product.reviews.length > 0 && (
        <div className="border border-[#1d293d]/20 rounded-lg shadow-sm overflow-hidden">
          <header className="bg-[#1d293d]/10 p-4 pb-2">
            <h2 className="text-xl text-[#1d293d]">Customer Reviews</h2>
          </header>
          <div className="p-4">
            <div className="space-y-4">
              {product.reviews.map((review: any, index: number) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{review.reviewerName}</span>
                    <span className="text-xs text-gray-500">{review.reviewDate}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => {
                      const rating = Number.parseFloat(review.reviewRating?.split(" ")[0] || "0")
                      if (i < Math.floor(rating)) {
                        return <Star key={i} className="h-4 w-4 fill-[#cb4363] text-[#cb4363]" />
                      } else if (i === Math.floor(rating) && rating % 1 >= 0.5) {
                        return <StarHalf key={i} className="h-4 w-4 fill-[#cb4363] text-[#cb4363]" />
                      } else {
                        return <Star key={i} className="h-4 w-4 text-gray-300" />
                      }
                    })}
                  </div>
                  <p className="text-sm text-gray-700">{review.reviewText}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

