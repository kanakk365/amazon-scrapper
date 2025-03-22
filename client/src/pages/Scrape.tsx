"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Home, BarChart2 } from "lucide-react"
import ProductDetails from "@/components/scrape-comps/product-details"
import JsonViewer from "@/components/scrape-comps/json-viewer"
import { Product } from "@/types/product"
import {Link} from "react-router-dom"

export default function Scrape() {
  const [url, setUrl] = useState("")
  const [data, setData] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    if (!url) {
      setError("Please enter a URL")
      return
    }

    try {
      setLoading(true)
      setError(null)

      const response = await fetch("http://localhost:3000/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(`Failed to fetch data: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container max-w-7xl bg-#f5f5f5  mx-auto py-10 px-4">
    <div className="mb-8 border border-[#1d293d]/20 rounded-lg shadow-sm overflow-hidden">
      <header className="bg-[#1d293d] text-white p-6 rounded-t-lg">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Product Data Scraper</h1>
          <div className="flex space-x-3">
            <Button 
              asChild
              variant="outline" 
              size="sm"
              className="text-white border-white hover:bg-white/20 hover:text-white"
            >
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="sm"
              className="text-white border-white hover:bg-white/20 hover:text-white"
            >
              <Link to="/compare">
                <BarChart2 className="h-4 w-4 mr-2" />
                Compare
              </Link>
            </Button>
          </div>
        </div>
        <p className="text-gray-200 mt-1">
          Enter a product URL to fetch and display its data
        </p>
      </header>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Enter product URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 border-[#1d293d]/20 focus-visible:ring-[#cb4363]"
          />
          <Button 
            onClick={fetchData} 
            className="bg-[#cb4363] hover:bg-[#cb4363]/90 text-white"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Fetching...
              </>
            ) : (
              "Fetch Data"
            )}
          </Button>
        </div>
        {error && (
          <p className="mt-4 text-red-500">{error}</p>
        )}
      </div>
    </div>

    {data && (
      <Tabs defaultValue="formatted" className="w-full">
        <TabsList className="mb-4 bg-[#1d293d]/10">
          <TabsTrigger 
            value="formatted" 
            className="data-[state=active]:bg-[#cb4363] data-[state=active]:text-white"
          >
            Formatted View
          </TabsTrigger>
          <TabsTrigger 
            value="raw" 
            className="data-[state=active]:bg-[#cb4363] data-[state=active]:text-white"
          >
            Raw JSON
          </TabsTrigger>
        </TabsList>
        <TabsContent value="formatted">
          <ProductDetails product={data} />
        </TabsContent>
        <TabsContent value="raw">
          <JsonViewer data={data} />
        </TabsContent>
      </Tabs>
    )}
  </main>
  )
}

