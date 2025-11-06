import express from 'express';
import cors from 'cors';
import productRoute from './routes/productRoute.js'
import cartRoute from './routes/cartRoute.js'
import checkoutRoute from './routes/checkoutRoute.js'

const app = express()
app.use(cors());
app.use(express.json())


//API routes
app.use('/api/products',productRoute)
app.use('/api/cart',cartRoute)
app.use('/api/checkout',checkoutRoute)


app.listen(5000, () => console.log("✅ Backend running on port 5000"));
