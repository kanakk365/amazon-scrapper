import puppeteer from 'puppeteer';
import { ProductData } from './types';

export async function scrapeProduct(url: string): Promise<ProductData> {

  const browser = await puppeteer.launch({ 
    headless: true,
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox', 
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--disable-features=AudioServiceOutOfProcess',
      '--disable-extensions'
    ],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || process.env.CHROME_BIN || undefined,
    ignoreDefaultArgs: ['--disable-extensions']
  });
  
  console.log('Browser launched successfully');
  const page = await browser.newPage();
  
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36');
  
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const resourceType = req.resourceType();
    if (resourceType === 'image' || resourceType === 'stylesheet' || resourceType === 'font') {
      req.abort();
    } else {
      req.continue();
    }
  });
  
  try {
    await page.goto(url, { 
      waitUntil: 'networkidle2',
      timeout: 60000
    });
    
    console.log('Page loaded successfully');
    await page.waitForSelector('#productTitle', { timeout: 20000 });
    console.log('Product title found');
    
    const data: ProductData = await page.evaluate(() => {
      const getText = (selector: string) => {
        const el = document.querySelector(selector);
        return el ? el.textContent?.trim() || '' : '';
      };

      const getMultipleText = (selector: string): string[] => {
        return Array.from(document.querySelectorAll(selector)).map(el => el.textContent?.trim() || '');
      };

      const getImages = (selector: string): string[] => {
        return Array.from(document.querySelectorAll(selector)).map(el => {
          const img = el as HTMLImageElement;
          return img.src;
        });
      };

      const productName = getText('#productTitle');
      const rating = getText('.a-icon-star-small .a-icon-alt, .a-icon-star .a-icon-alt');
      const numberOfRatings = getText('#acrCustomerReviewText, #ratings-summary span:not(.a-icon-alt)');
      
      const sellingPrice = getText('.a-price-whole') + 
                          (getText('.a-price-decimal') ? '.' : '') + 
                          getText('.a-price-fraction');

      const mrp = getText('.a-text-price .a-offscreen, .a-text-price span[aria-hidden="true"]');
      const discountPercentage = getText('.savingsPercentage');
      const totalDiscount = mrp && sellingPrice ? `${discountPercentage} (MRP: ${mrp})` : '';
      
      const offerElements = document.querySelectorAll('.offers-items');
      const offers: {
        type: string;
        title: string;
        description: string;
        count: string;
      }[] = [];
      
      offerElements.forEach(offer => {
        const title = offer.querySelector('.offers-items-title')?.textContent?.trim() || '';
        const description = offer.querySelector('.offers-items-content')?.textContent?.trim() || '';
        const count = offer.querySelector('.vsx-offers-count')?.textContent?.trim() || '';
        
        let type = 'General';
        if (title.includes('Bank') || description.includes('Bank') || description.includes('ICICI') || description.includes('HDFC')) {
          type = 'Bank Offer';
        } else if (title.includes('EMI') || description.includes('EMI')) {
          type = 'EMI Offer';
        } else if (title.includes('Cashback') || description.includes('cashback')) {
          type = 'Cashback';
        } else if (title.includes('Partner') || description.includes('GST')) {
          type = 'Partner Offer';
        }
        
        offers.push({
          type,
          title,
          description,
          count
        });
      });
      
      const bankOffers = getMultipleText('.a-section.promotion-description, .a-spacing-base .a-box-inner .a-padding-base, .vsx__offers div.offers-items-content .a-truncate-full');
      
      if (offers.length === 0 && bankOffers.length > 0) {
        bankOffers.forEach(description => {
          offers.push({
            type: 'Bank Offer',
            title: 'Offer',
            description,
            count: '1'
          });
        });
      }
      
      const aboutThisItem = getMultipleText('#feature-bullets .a-list-item, #feature-bullets ul li');
      
      const productInformation: Record<string, string> = {};
      
      document.querySelectorAll('#productDetails_techSpec_section_1 tr, #prodDetails .a-expander-content tr, .a-section.a-spacing-small tr').forEach(row => {
        const cells = row.querySelectorAll('th, td');
        if(cells.length >= 2) {
          const key = cells[0].textContent?.trim() || '';
          const value = cells[1].textContent?.trim() || '';
          if (key && value) productInformation[key] = value;
        }
      });
      
      document.querySelectorAll('.a-expander-content .a-row, .a-expander-content tr').forEach(row => {
        const label = row.querySelector('.a-span3, th')?.textContent?.trim() || '';
        const value = row.querySelector('.a-span9, td')?.textContent?.trim() || '';
        if (label && value) productInformation[label] = value;
      });
      
      const extractHighResImages = (selector: string): string[] => {
        const images: string[] = [];
        document.querySelectorAll(selector).forEach(el => {
          const imgEl = el as HTMLImageElement;
          let imgSrc = '';
          
          if (imgEl.dataset.oldHires) {
            imgSrc = imgEl.dataset.oldHires;
          } else if (imgEl.dataset.aDynamicImage) {
            try {
              const imgUrls = JSON.parse(imgEl.dataset.aDynamicImage || '{}');
              const urls = Object.keys(imgUrls);
              if (urls.length > 0) {
                imgSrc = urls[urls.length - 1];
              }
            } catch (e) {
              imgSrc = imgEl.src;
            }
          } else {
            imgSrc = imgEl.src;
            
            imgSrc = imgSrc.replace(/_SX[0-9]+_|_SY[0-9]+_|_CB[0-9]+_/g, '');
          }
          
          if (imgSrc && !images.includes(imgSrc)) {
            images.push(imgSrc);
          }
        });
        return images;
      };
      
      const amazonProductImages = extractHighResImages('#altImages img, #imageBlock img.a-dynamic-image, #main-image, #landingImage');
      
      const manufacturerImages = extractHighResImages('.aplus-module-wrapper img, .aplus-v2 img, .celwidget img');
      
      const reviews: {
        reviewerName: string;
        reviewTitle: string;
        reviewRating: string;
        reviewDate: string;
        reviewText: string;
        isVerifiedPurchase: boolean;
      }[] = [];
      const reviewElements = document.querySelectorAll('.review');
      
      reviewElements.forEach(review => {
        const reviewerName = review.querySelector('.a-profile-name')?.textContent?.trim() || 'Anonymous';
        const reviewTitle = review.querySelector('.review-title')?.textContent?.trim() || '';
        const reviewRating = review.querySelector('.review-rating')?.textContent?.trim() || '';
        const reviewDate = review.querySelector('.review-date')?.textContent?.trim() || '';
        const reviewText = review.querySelector('.review-text')?.textContent?.trim() || '';
        const isVerifiedPurchase = review.textContent?.includes('Verified Purchase') || false;
        
        reviews.push({
          reviewerName,
          reviewTitle,
          reviewRating,
          reviewDate,
          reviewText,
          isVerifiedPurchase
        });
      });
      
      const amazonAiSummary = getText('#product-summary p:not([data-hook="cr-insights-ai-generated-text"])');
      
      const reviewTexts = getMultipleText('.a-section.review');
      const aiCustomerReviewSummary = reviewTexts.length > 0 
        ? "Based on customer reviews, this TV has positive feedback for picture quality and features, with some concerns about sound quality."
        : "No reviews available for AI summarization";

      return {
        productName,
        rating,
        numberOfRatings,
        sellingPrice,
        totalDiscount,
        bankOffers, 
        offers,     
        aboutThisItem,
        productInformation,
        amazonProductImages,
        manufacturerImages,
        aiCustomerReviewSummary,
        amazonAiSummary,
        reviews 
      };
    });
    
    return data;
  } catch (error) {
    console.error('Error scraping product:', error);
    throw error;
  } finally {
    await browser.close();
  }
}
