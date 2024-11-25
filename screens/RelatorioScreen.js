import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';

export default function ReportsScreen({ route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    // Receber os dados da análise passados através do 'route.params'
    if (route.params?.item) {
      setReportData(route.params.item);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatórios de Coletas</Text>

      {/* Exibe uma lista com os relatórios */}
      {reportData ? (
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Ver Relatório {reportData.coleta}</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.noDataText}>Nenhum relatório disponível</Text>
      )}

      {/* Modal com detalhes do relatório */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalhes do Relatório {reportData?.coleta}</Text>
            <Text style={styles.modalText}>Nome do Paciente: {reportData?.nome}</Text>
            <Text style={styles.modalText}>Idade: {reportData?.idade}</Text>
            <Text style={styles.modalText}>Tipo de Análise: {reportData?.tipoAnalise}</Text>
            <Text style={styles.modalText}>Diagnóstico: {reportData?.diagnostico}</Text>
            <Text style={styles.modalText}>Status de Análise: {reportData?.analisado === 1 ? 'Analisado' : 'Não Analisado'}</Text>

            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
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
