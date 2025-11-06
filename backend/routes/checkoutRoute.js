import express from 'express';

const router = express.Router();

router.post('/',(req,res)=>{
    const {cartItems,name,email}=req.body;
    const total = cartItems.reduce((acc,item)=>acc+item.price*item.qty,0);
    const receipt = {
        id: Date.now(),
        name,
        total,
        email,
        timestamp:new Date().toISOString(),
    }
    res.json(receipt);
});
export default router;