"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { Product } from "@/types/product"

interface JsonViewerProps {
  data: Product | unknown
}

export default function JsonViewer({ data }: JsonViewerProps) {
  const [copied, setCopied] = useState(false)

  const formattedJson = JSON.stringify(data, null, 2)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedJson)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="border border-[#1d293d]/20 rounded-lg shadow-sm overflow-hidden relative">
    <Button
      variant="outline"
      size="sm"
      className="absolute right-4 top-4 bg-white hover:bg-gray-100 hover:text-[#cb4363] border-[#1d293d]/20"
      onClick={copyToClipboard}
    >
      <Copy className="h-4 w-4 mr-2" />
      {copied ? "Copied!" : "Copy"}
    </Button>
    <pre className="p-4 overflow-auto max-h-[600px] text-sm">
      <code className="text-gray-800">{formattedJson}</code>
    </pre>
  </div>
  )
}

