// screens/ColetasScreen.js
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button, FlatList, Image, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Coletas</Text>
      <Button title="Fazer nova coleta" onPress={() => navigation.navigate('Nova Coleta')} />
      
      <FlatList
        data={coletas}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleColetaPress(item)}>
            <View style={styles.item}>
              <Text style={styles.itemText}>Coleta: {item.coleta}</Text>
              <Text style={styles.itemText}>Detalhes: {item.detalhes}</Text>
              <Image source={{ uri: item.foto }} style={styles.itemImage} />
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
                <Text style={styles.modalText}>Número da coleta: {selectedColeta.coleta}</Text>
                <Text style={styles.modalText}>Nome: {selectedColeta.nome}</Text>
                <Text style={styles.modalText}>Idade: {selectedColeta.idade}</Text>
                <Text style={styles.modalText}>Histórico Médico: {selectedColeta.historico}</Text>
                <Text style={styles.modalText}>Detalhes: {selectedColeta.detalhes}</Text>
                <Text style={styles.modalText}>Tipo de Análise: {selectedColeta.tipoAnalise}</Text>
                <Text style={styles.modalText}>Diagnóstico: {selectedColeta.diagnostico}</Text>
                <Text style={styles.modalText}>Analisado: {selectedColeta.analisado ? 'Sim' : 'Não'}</Text>
                <Image source={{ uri: selectedColeta.foto }} style={styles.modalImage} />
                <Button title="Fechar" onPress={() => setModalVisible(false)} />
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
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
    backgroundColor: '#F9FAFB', // Fundo claro
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151', // Cinza escuro
    marginBottom: 16,
  },
  item: {
    backgroundColor: '#FFFFFF', // Fundo branco
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2, // Sombra no Android
    marginVertical: 10,
    width: '90%',
    padding: 16,
    alignItems: 'center',
  },
  itemText: {
    fontSize: 14,
    color: '#374151', // Cinza escuro
    marginBottom: 8,
  },
  itemImage: {
    width: 100,
    height: 100,
    marginTop: 8,
    borderRadius: 8,
    borderColor: '#E5E7EB', // Borda cinza claro
    borderWidth: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo translúcido
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827', // Preto suave
    marginBottom: 12,
  },
  modalText: {
    fontSize: 14,
    color: '#4B5563', // Cinza médio
    marginBottom: 8,
    textAlign: 'center',
  },
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginVertical: 12,
  },
  button: {
    backgroundColor: '#10B981', // Verde primário
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
