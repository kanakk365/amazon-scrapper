export interface Review {
    reviewerName: string;
    reviewTitle: string;
    reviewRating: string;
    reviewDate: string;
    reviewText: string;
    isVerifiedPurchase: boolean;
  }
  
  export interface Offer {
    type: string;      // Bank Offer, EMI Offer, Cashback, Partner Offer, etc.
    title: string;     // The title of the offer
    description: string; // The detailed description
    count: string;     // Number of offers of this type
  }
  
  export interface ProductData {
    productName: string;
    rating: string;
    numberOfRatings: string;
    sellingPrice: string;
    totalDiscount: string;
    bankOffers: string[];
    offers: Offer[];   // Structured offers with categorization
    aboutThisItem: string[];
    productInformation: Record<string, string>;
    amazonProductImages: string[];
    manufacturerImages: string[];
    aiCustomerReviewSummary: string; // Our custom review summary (for demo)
    amazonAiSummary: string;        // Amazon's AI-generated review summary
    reviews: Review[];
  }