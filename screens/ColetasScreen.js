// screens/ColetasScreen.js
import React, { useState } from 'react'; // Importa useState
import { View, Text, Button, Modal } from 'react-native';

export default function ColetasScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Text>Coletas</Text>
      <Button title="Fazer nova coleta" onPress={() => navigation.navigate('NovaColeta')} />
      <Button title="Ver Coleta 001" onPress={() => setModalVisible(true)} />
      <Modal visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)}>
        <View>
          <Text>Detalhes da Coleta</Text>
          <Button title="Fechar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}
