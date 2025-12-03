import useSWR from 'swr';
import Link from 'next/link';
const fetcher = (url) => fetch(url).then(r => r.json());
export default function Home() {
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, fetcher);
  if (!data) return <div>Loading...</div>;
  return (
    <div style={{padding:20}}>
      <h1>Sumkam Supermarket — Njoro</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
        {data.products.map(p => (
          <div key={p.id} style={{border:'1px solid #eee',padding:12}}>
            <img src={p.image_url || '/placeholder.png'} alt='' style={{width:'100%',height:150,objectFit:'cover'}}/>
            <h3>{p.name}</h3>
            <p>KES {p.price}</p>
            <Link href={`/product/${p.id}`}><a>View</a></Link>
          </div>
        ))}
      </div>
    </div>
  );
}
