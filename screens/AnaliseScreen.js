import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Image, Modal, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { realtimeDb } from '../firebaseConfig';
import { ref, onValue, off, update } from 'firebase/database';

export default function AnaliseScreen({ navigation }) {
  const [coletas, setColetas] = useState([]);
  const [selectedColeta, setSelectedColeta] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [diagnosticoFinal, setDiagnosticoFinal] = useState('');
  const [aprovado, setAprovado] = useState(null);

  useEffect(() => {
    const coletasRef = ref(realtimeDb, 'coletas');
    const unsubscribe = onValue(coletasRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const coletasList = Object.entries(data)
          .map(([key, value]) => ({ key, ...value }))
          .filter(coleta => coleta.analisado === 0);
        setColetas(coletasList);
      }
    });

    return () => off(coletasRef, 'value', unsubscribe);
  }, []);

  const handleColetaPress = (coleta) => {
    setSelectedColeta(coleta);
    setModalVisible(true);
  };

  const handleSubmit = async () => {
    if (aprovado === null) {
      Alert.alert("Erro", "Por favor, selecione uma opção de diagnóstico.");
      return;
    }

    try {
      const updates = {
        analisado: 1,
        diagnostico: aprovado ? selectedColeta.diagnostico : diagnosticoFinal,
      };
      await update(ref(realtimeDb, `coletas/${selectedColeta.key}`), updates);

      setModalVisible(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Análises' }],
      });
    } catch (error) {
      console.error("Erro ao atualizar coleta:", error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Análises Pendentes</Text>
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
                <Image source={{ uri: selectedColeta.foto }} style={{ width: 300, height: 300 }} />
                <Text>Aprovar Diagnóstico?</Text>
                <View style={styles.radioContainer}>
                  <TouchableOpacity onPress={() => setAprovado(true)} style={styles.radio}>
                    <Text>Sim</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setAprovado(false)} style={styles.radio}>
                    <Text>Não</Text>
                  </TouchableOpacity>
                </View>
                {!aprovado && aprovado !== null && (
                  <TextInput
                    placeholder="Diagnóstico Correto"
                    value={diagnosticoFinal}
                    onChangeText={setDiagnosticoFinal}
                    style={{ borderWidth: 1, padding: 8, marginVertical: 5 }}
                  />
                )}
                <Button title="Validar Diagnóstico" onPress={handleSubmit} />
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  radio: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
});
