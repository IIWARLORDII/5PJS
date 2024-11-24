// screens/ColetasScreen.js
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button, FlatList, Image } from 'react-native';
import { realtimeDb } from '../firebaseConfig';
import { ref, onValue, off } from 'firebase/database';
import NovaColetaScreen from './NovaColetaScreen'; // Importa a tela Nova Coleta

const Stack = createNativeStackNavigator();

function ColetasHome({ navigation }) {
  const [coletas, setColetas] = useState([]);

  useEffect(() => {
    const coletasRef = ref(realtimeDb, 'coletas');
    const unsubscribe = onValue(coletasRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const coletasList = Object.entries(data).map(([key, value]) => ({
          key,
          ...value
        }));
        setColetas(coletasList);
      }
    });

    return () => off(coletasRef, 'value', unsubscribe);
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Coletas</Text>
      <Button title="Fazer nova coleta" onPress={() => navigation.navigate('Nova Coleta')} />
      
      <FlatList
        data={coletas}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text>Coleta: {item.coleta}</Text>
            <Text>Detalhes: {item.detalhes}</Text>
            <Image source={{ uri: item.foto }} style={{ width: 100, height: 100 }} />
          </View>
        )}
      />
    </View>
  );
}

export default function ColetasScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Coletas Home" 
        component={ColetasHome} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Nova Coleta" 
        component={NovaColetaScreen} 
        options={{ title: 'Nova Coleta' }} 
      />
    </Stack.Navigator>
  );
}
