import { useState } from 'react';
export default function Checkout(){
  const [phone,setPhone] = useState('2547');
  const cart = (typeof window!=='undefined') ? JSON.parse(localStorage.getItem('cart')||'[]') : [];
  const total = cart.reduce((s,i)=>s + Number(i.price || 0),0);

  async function payWithMpesa(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/mpesa/stkpush`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({phone,amount:total,orderId:Date.now()})});
    const j = await res.json(); alert(JSON.stringify(j));
  }

  async function payWithCard(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/stripe/create-payment-intent`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({amount:total,orderId:Date.now()})});
    const j = await res.json(); alert('Card flow not fully implemented in this stub. clientSecret='+j.clientSecret);
  }

  return (
    <div style={{padding:20}}>
      <h2>Checkout</h2>
      <div>Items: {cart.length} — Total: KES {total}</div>
      <div>
        <h3>Pay with M-Pesa</h3>
        <input value={phone} onChange={e=>setPhone(e.target.value)} />
        <button onClick={payWithMpesa}>Pay with M-Pesa (STK Push)</button>
      </div>
      <div>
        <h3>Pay with Card</h3>
        <button onClick={payWithCard}>Pay with Card (Stripe)</button>
      </div>
    </div>
  );
}
