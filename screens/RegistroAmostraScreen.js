// screens/RegistroAmostraScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

export default function RegistroAmostraScreen({ navigation }) {
  const [detalhes, setDetalhes] = useState('');
  const [tipo, setTipo] = useState('');

  return (
    <View>
      <TextInput placeholder="Detalhes da Amostra" value={detalhes} onChangeText={setDetalhes} />
      {/* Implementar dropdown de seleção do tipo */}
      <Button title="Avançar" onPress={() => navigation.navigate('RegistroPaciente', { detalhes, tipo })} />
    </View>
  );
}
