import OpenAI from "openai";
import { ProductData } from './types';
import { scrapeProduct } from "./scrapper";
import dotenv from 'dotenv';

dotenv.config();


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY ,
});

interface ComparisonResult {
    summary: string;
    keyDifferences: {
        category: string;
        comparison: string;
    }[];
    recommendation: string;
    priceAnalysis: string;
}

export async function aiComparision(firstUrl: string, secondUrl: string): Promise<ComparisonResult> {
    try {
       
        const firstProductData = await scrapeProduct(firstUrl);
        const secondProductData = await scrapeProduct(secondUrl);
        console.log(firstProductData, secondProductData)
        
        const productComparison = prepareProductComparison(firstProductData, secondProductData);
        
        
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a product comparison expert who helps customers make informed purchasing decisions."
                },
                {
                    role: "user",
                    content: `Compare these two products in detail:\n\n${productComparison}\n\nProvide a comprehensive comparison including: 
                    1. A summary of both products 
                    2. Key differences in features, specifications, and performance
                    3. Price-to-value analysis
                    4. A recommendation on which product offers better value and why
                    Format your response as JSON with the following structure: 
                    {
                        "summary": "overall comparison summary",
                        "keyDifferences": [
                            {
                                "category": "Feature/Specification category",
                                "comparison": "detailed comparison for this category"
                            }
                        ],
                        "recommendation": "which product is recommended and why",
                        "priceAnalysis": "analysis of pricing and value"
                    }`
                }
            ],
            temperature: 0.7,
            max_tokens: 2000,
        });
        
       
        const comparisonText = response.choices[0]?.message?.content || '{}';
        const comparison = JSON.parse(comparisonText) as ComparisonResult;
        return comparison;
    } catch (error) {
        console.error("Error in AI comparison:", error);
        throw new Error("Failed to generate product comparison");
    }
}

function prepareProductComparison(product1: ProductData, product2: ProductData): string {
  
    const formatProduct = (product: ProductData) => {
        return `
Product Name: ${product.productName}
Price: ${product.sellingPrice}
Rating: ${product.rating}
Number of Ratings: ${product.numberOfRatings}
Discount: ${product.totalDiscount || 'None'}

Key Features:
${product.aboutThisItem.map(item => `- ${item}`).join('\n')}

Technical Specifications:
${Object.entries(product.productInformation)
    .map(([key, value]) => `- ${key}: ${value}`)
    .join('\n')}
`;
    };

    return `
PRODUCT 1:
${formatProduct(product1)}

PRODUCT 2:
${formatProduct(product2)}
`;
}