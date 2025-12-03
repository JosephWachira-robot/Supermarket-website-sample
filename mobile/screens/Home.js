import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function Home({navigation}){
  const [products,setProducts] = useState([]);
  useEffect(()=>{ axios.get('http://10.0.2.2:4000/api/products').then(r=>setProducts(r.data.products)).catch(e=>console.log(e)); },[]);
  return (
    <View style={{flex:1,padding:16}}>
      <Text style={{fontSize:20}}>Sumkam Supermarket (Njoro)</Text>
      <FlatList data={products} keyExtractor={i=>String(i.id)} renderItem={({item})=> (
        <TouchableOpacity onPress={()=> alert('Add to cart logic here')} style={{padding:12,borderBottomWidth:1}}>
          <Text>{item.name}</Text>
          <Text>KES {item.price}</Text>
        </TouchableOpacity>
      )} />
    </View>
  );
}
