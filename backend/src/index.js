require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const productsRouter = require('./routes/products');
const paymentsRouter = require('./routes/payments');
const stripeCtrl = require('./controllers/stripe');

const app = express();
app.use(cors());

// Stripe webhook route needs raw body to verify signature
app.post('/api/payments/stripe/webhook', express.raw({ type: 'application/json' }), stripeCtrl.webhookHandler);

// JSON parser for other routes
app.use(bodyParser.json());

app.get('/health', (req, res) => res.json({ status: 'ok', time: new Date() }));
app.use('/api/products', productsRouter);
app.use('/api/payments', paymentsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
