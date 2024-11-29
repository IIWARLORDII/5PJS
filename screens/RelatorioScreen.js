import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Image, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { realtimeDb } from '../firebaseConfig';
import { ref, onValue, off } from 'firebase/database';

export default function RelatorioScreen() {
  const [coletas, setColetas] = useState([]);
  const [selectedColeta, setSelectedColeta] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const coletasRef = ref(realtimeDb, 'coletas');
    const unsubscribe = onValue(coletasRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const coletasList = Object.entries(data)
          .map(([key, value]) => ({ key, ...value }))
          .filter(coleta => coleta.analisado === 1);
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
      <Text style={styles.title}>Relatório de Coletas Analisadas</Text>
      
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

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F9FAFB', // Fundo claro
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
    textAlign: 'center',
    color: '#374151',
    fontSize: 14,
    marginVertical: 4,
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    color: '#111827',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 14,
    color: '#4B5563', // Cinza médio
    marginBottom: 8,
  },
  modalImage: {
    width: 150,
    height: 150,
    marginVertical: 12,
    borderRadius: 8,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    width: '80%',
  },
  radio: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#E5E7EB', // Fundo cinza claro
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB', // Borda cinza clara
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    color: '#374151',
    width: '100%',
    marginVertical: 8,
  },
  buttonPrimary: {
    backgroundColor: '#10B981', // Verde primário
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonPrimaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSecondary: {
    backgroundColor: '#F3F4F6', // Fundo cinza claro
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonSecondaryText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
});
