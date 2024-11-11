// screens/AnalisysScreen.js
import React from 'react';
import { View, Text, Button, Modal, Picker } from 'react-native';

export default function AnalisysScreen() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Análises Pendentes</Text>
      <Button title="Ver Coleta 001" onPress={() => setModalVisible(true)} />
      {/* Modal com opções de validação */}
    </View>
  );
}
