// screens/ColetasScreen.js
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.title}>Coletas</Text>
      <TouchableOpacity
        style={styles.newCollectButton}
        onPress={() => navigation.navigate('Nova Coleta')}
      >
        <Text style={styles.newCollectButtonText}>Fazer nova coleta</Text>
      </TouchableOpacity>

      <FlatList
        data={coletas}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.collectItem}>
            <Text style={styles.collectTitle}>Coleta: {item.coleta}</Text>
            <Text style={styles.collectDetails}>Detalhes: {item.detalhes}</Text>
            {item.foto && (
              <Image source={{ uri: item.foto }} style={styles.image} />
            )}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  newCollectButton: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  newCollectButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  collectItem: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  collectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  collectDetails: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginTop: 8,
  },
});
