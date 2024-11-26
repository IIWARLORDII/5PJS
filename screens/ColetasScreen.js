// screens/ColetasScreen.js
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button, FlatList, Image, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { realtimeDb } from '../firebaseConfig';
import { ref, onValue, off } from 'firebase/database';
import NovaColetaScreen from './NovaColetaScreen'; // Importa a tela Nova Coleta

const Stack = createNativeStackNavigator();

function ColetasHome({ navigation }) {
  const [coletas, setColetas] = useState([]);
  const [selectedColeta, setSelectedColeta] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleColetaPress = (coleta) => {
    setSelectedColeta(coleta);
    setModalVisible(true);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Coletas</Text>
      <Button title="Fazer nova coleta" onPress={() => navigation.navigate('Nova Coleta')} />
      
      <FlatList
        data={coletas}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleColetaPress(item)}>
            <View style={{ marginVertical: 10 }}>
              <Text>Coleta: {item.coleta}</Text>
              <Text>Detalhes: {item.detalhes}</Text>
              <Image source={{ uri: item.foto }} style={{ width: 100, height: 100 }} />
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedColeta && (
              <>
                <Text style={styles.modalTitle}>Detalhes da Coleta</Text>
                <Text>Número da coleta: {selectedColeta.coleta}</Text>
                <Text>Nome: {selectedColeta.nome}</Text>
                <Text>Idade: {selectedColeta.idade}</Text>
                <Text>Histórico Médico: {selectedColeta.historico}</Text>
                <Text>Detalhes: {selectedColeta.detalhes}</Text>
                <Text>Tipo de Análise: {selectedColeta.tipoAnalise}</Text>
                <Text>Diagnóstico: {selectedColeta.diagnostico}</Text>
                <Text>Analisado: {selectedColeta.analisado ? 'Sim' : 'Não'}</Text>
                <Image source={{ uri: selectedColeta.foto }} style={{ width: 200, height: 200 }} />
                <Button title="Fechar" onPress={() => setModalVisible(false)} />
              </>
            )}
          </View>
        </View>
      </Modal>
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