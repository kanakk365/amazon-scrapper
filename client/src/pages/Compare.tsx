"use client";

import { useState } from "react";
import { Send, Home, Search } from 'lucide-react';
import {Link} from "react-router-dom";

// Define the comparison result type
interface KeyDifference {
  category: string;
  comparison: string;
}

interface ComparisonResult {
  summary: string;
  keyDifferences: KeyDifference[];
  recommendation: string;
  priceAnalysis: string;
}

export default function Compare() {
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ComparisonResult | null>(null);

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
        //const res= await fetch("https://amazon-scrapper-cjmh.onrender.com/api/compare",  {method: "POST",headers: {
        const res= await fetch("http://localhost:3000/api/compare",  {method: "POST",headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url1, url2 }),} )
          if (!res.ok) {
            throw new Error(`Error: ${res.status}`)
          }
          const data = await res.json()
          setResult(data)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#1d293d]">
          Amazon Product <span className="text-[#cb4363]">Analyzer</span>
        </h1>
        
        <div className="flex justify-center gap-4 mb-8">
          <Link to="/" className="inline-flex items-center px-4 py-2 bg-[#1d293d] text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1d293d] focus:ring-offset-2 hover:bg-[#141e2d] transition-colors">
            <Home className="mr-2 h-4 w-4" /> Home
          </Link>
          <Link to="/scrape" className="inline-flex items-center px-4 py-2 bg-[#cb4363] text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#cb4363] focus:ring-offset-2 hover:bg-[#b13857] transition-colors">
            <Search className="mr-2 h-4 w-4" /> Scrape
          </Link>
        </div>
        
        <section className="mb-8 border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden">
          <header className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Compare Products</h2>
            <p className="text-gray-500 mt-1">
              Enter the URLs of two products you want to compare
            </p>
          </header>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="url1" className="block text-sm font-medium text-gray-700">
                    Product 1 URL
                  </label>
                  <input
                    id="url1"
                    type="url"
                    placeholder="https://example.com/product1"
                    value={url1}
                    onChange={(e) => setUrl1(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#cb4363] focus:ring-opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="url2" className="block text-sm font-medium text-gray-700">
                    Product 2 URL
                  </label>
                  <input
                    id="url2"
                    type="url"
                    placeholder="https://example.com/product2"
                    value={url2}
                    onChange={(e) => setUrl2(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#cb4363] focus:ring-opacity-50"
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="w-full px-4 py-2 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#cb4363] focus:ring-opacity-50 bg-[#cb4363] hover:bg-[#b13857] border-[#cb4363] flex items-center justify-center transition-colors"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Comparing Products...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="mr-2 h-4 w-4" /> Compare Products
                  </span>
                )}
              </button>
            </form>
          </div>
        </section>

        {result && (
          <div className="space-y-6">
            <section className="border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden">
              <header className="p-4 bg-[#1d293d] text-white">
                <h2 className="text-xl font-semibold">Summary</h2>
              </header>
              <div className="p-6">
                <p>{result.summary}</p>
              </div>
            </section>

            <section className="border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden">
              <header className="p-4 bg-[#1d293d] text-white">
                <h2 className="text-xl font-semibold">Key Differences</h2>
              </header>
              <div className="p-6">
                <div className="space-y-4">
                  {result.keyDifferences.map((diff, index) => (
                    <div key={index} className="pb-4">
                      <div className="flex items-center mb-2">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full text-white bg-[#cb4363]">
                          {diff.category}
                        </span>
                      </div>
                      <p>{diff.comparison}</p>
                      {index < result.keyDifferences.length - 1 && (
                        <hr className="h-px my-4 bg-gray-200 border-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden">
                <header className="p-4 bg-[#1d293d] text-white">
                  <h2 className="text-xl font-semibold">Recommendation</h2>
                </header>
                <div className="p-6">
                  <p>{result.recommendation}</p>
                </div>
              </section>

              <section className="border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden">
                <header className="p-4 bg-[#1d293d] text-white">
                  <h2 className="text-xl font-semibold">Price Analysis</h2>
                </header>
                <div className="p-6">
                  <p>{result.priceAnalysis}</p>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}