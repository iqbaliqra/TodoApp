import Stripe from 'stripe';
import dotenv from 'dotenv';
import express from 'express';
const router=express.Router();
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_KEY);
router.post('/payment', async (req, res) => {
    try {

        const{taskId}=req.body;
        const product = await stripe.products.create({
            name: "Todo App",
        });

        const price = await stripe.prices.create({
            product: product.id,
            unit_amount: 100 * 100,
            currency: 'inr',
        });

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: price.id,
                    quantity:1
                }
            ],
            
            mode: 'payment',
            success_url: `http://localhost:5000/api/updatetask?taskId=${taskId}&Price=${price.unit_amount}`,
            cancel_url: 'http://localhost:5000/cancel',
            customer_email: 'demo@gmail.com',
        });

        res.json({ url: session.url });//in this session url means stripe redirect to the card ui.
    } catch (error) {
        console.error('Error creating payment session:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/cancel',async(req,res)=>{
    res.send("<h1>payment not successfull</h1>");
})

export default router;