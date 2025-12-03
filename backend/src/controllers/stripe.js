const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency='kes', orderId } = req.body;
    const unit = Math.round(Number(amount || 0) * 100);
    const pi = await stripe.paymentIntents.create({ amount: unit, currency: currency.toLowerCase(), metadata: { orderId } });
    res.json({ clientSecret: pi.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.webhookHandler = async (req, res) => {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
  let event;
  try {
    const sig = req.headers['stripe-signature'];
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    console.log('PaymentIntent was successful!', paymentIntent.id);
    // TODO: update order in DB
  }

  res.json({ received: true });
};
