import React, {useState} from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function Checkout(){
  const [phone,setPhone] = useState('2547');
  async function pay(){
    const res = await fetch('http://10.0.2.2:4000/api/payments/mpesa/stkpush',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({phone,amount:100,orderId:Date.now()})});
    const j = await res.json(); alert(JSON.stringify(j));
  }

  return (
    <View style={{padding:16}}>
      <Text>Checkout (mobile)</Text>
      <TextInput value={phone} onChangeText={setPhone} style={{borderWidth:1,padding:8}}/>
      <Button title="Pay with M-Pesa" onPress={pay} />
    </View>
  );
}
