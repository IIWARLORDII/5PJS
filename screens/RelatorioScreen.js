// screens/ReportsScreen.js
import React from 'react';
import { View, Text, Button, Modal } from 'react-native';

export default function ReportsScreen() {
  return (
    <View>
      <Text>Relatórios de Coletas</Text>
      <Button title="Ver Relatório 001" onPress={() => setModalVisible(true)} />
      {/* Modal com detalhes do relatório */}
    </View>
  );
}
