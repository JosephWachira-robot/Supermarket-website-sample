import { useRouter } from 'next/router';
import useSWR from 'swr';
const fetcher = (url) => fetch(url).then(r => r.json());
export default function Product() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR(id ? `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}` : null, fetcher);
  if (!data) return <div>Loading...</div>;
  const p = data.product;
  return (
    <div style={{padding:20}}>
      <h2>{p.name}</h2>
      <img src={p.image_url || '/placeholder.png'} style={{width:300}}/>
      <p>{p.description}</p>
      <p>KES {p.price}</p>
      <button onClick={() => { if (typeof window !== 'undefined') { const cart = JSON.parse(localStorage.getItem('cart')||'[]'); cart.push({id:p.id, name:p.name, price:p.price}); localStorage.setItem('cart', JSON.stringify(cart)); alert('Added to cart'); }}}>Add to cart</button>
    </div>
  );
}
