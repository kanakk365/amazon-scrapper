export interface ProductOffer {
  type: string;
  title: string;
  description: string;
  count: string;
}

export interface ProductReview {
  reviewerName: string;
  reviewTitle: string;
  reviewRating: string;
  reviewDate: string;
  reviewText: string;
  isVerifiedPurchase?: boolean;
}

export interface Product {
  productName: string;
  rating: string;
  numberOfRatings: string;
  sellingPrice: string;
  totalDiscount: string;
  bankOffers: string[];
  offers?: ProductOffer[];
  aboutThisItem: string[];
  productInformation: Record<string, string>;
  amazonProductImages: string[];
  manufacturerImages?: string[];
  aiCustomerReviewSummary?: string;
  amazonAiSummary?: string;
  reviews: ProductReview[];
}
