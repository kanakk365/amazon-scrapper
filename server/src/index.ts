import express from "express"
import cors from "cors"
import { scrapeProduct } from "./scrapper";
import { aiComparision } from "./ai";


const app = express()
const port = process.env.PORT || 3000;

app.use(cors({
    origin: ['http://localhost:5173', 'https://amazon-scrapper-theta.vercel.app/'], 
    methods: ['GET', 'POST'],
    credentials: true
  }))
app.use(express.json())

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok" })
  })

app.post("/api/scrape", async (req, res) => {
    const {url} = req.body

    if(!url){
        res.status(400).json({message:"URL is required"})
        return
    }
    try {
        const productData = await scrapeProduct(url)
        res.json(productData)
    } catch (error) {
        console.error('Scraping error:', error);
        res.status(500).json({message: "Failed to scrape "})
    }
})

app.post("/api/compare" , async(req,res)=>{
    const { url1 , url2 }= req.body
    
    if(!url1 || !url2){
        res.status(400).json({message:"Please Enter Two URL"})
        return; 
    }
    try {
        const comparision = await aiComparision(url1, url2)
        res.json(comparision)
    } catch (error) {
        console.error("There was some error while comparing products:", error)
        res.status(500).json({message:"Failed to compare products"})
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})