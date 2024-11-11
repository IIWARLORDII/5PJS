// screens/ReportsScreen.js
import React from 'react';
import { View, Text, Button, Modal } from 'react-native';

export default function ReportsScreen() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Relatórios de Coletas</Text>
      <Button title="Ver Relatório 001" onPress={() => setModalVisible(true)} />
      {/* Modal com detalhes do relatório */}
    </View>
  );
}
