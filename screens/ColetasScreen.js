// screens/ColetasScreen.js
import React, { useState } from 'react';
import { View, Text, Button, Modal } from 'react-native';

export default function ColetasScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Coletas</Text>
      <Button title="Fazer nova coleta" onPress={() => navigation.navigate('Nova Coleta')} />
      
      {/* Exemplo de lista de coletas */}
      <Button title="Ver Coleta 001" onPress={() => setModalVisible(true)} />
      <Modal visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)}>
        <View>
          <Text>Detalhes da Coleta</Text>
          {/* Exibir imagem e dados da coleta aqui */}
          <Button title="Fechar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}
