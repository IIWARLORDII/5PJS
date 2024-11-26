import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';
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
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Relatório de Coletas Analisadas</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noDataText: {
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
    marginTop: 20,
  },
});
