import express from 'express';

const router = express.Router();
let cart=[];
router.get('/',(req,res)=>{
    const total = cart.reduce((acc,item)=>acc+item.price*item.qty,0);
    res.json({items:cart,total});
})
//add item
router.post('/',(req,res)=>{
    const {id,name,price,qty} = req.body;
    const existing = cart.find((item)=>item.id===id);
    if(existing) existing.qty+=qty;
    else cart.push({id,name,price,qty});
    res.json(cart);
});
//delete item
router.delete('/:id',(req,res)=>{
    const itemId = parseInt(req.params.id);
    cart = cart.filter((item)=>item.id!=itemId);
    res.json(cart);
})
export default router;