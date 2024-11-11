// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation, onLogout }) {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Painel Principal</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button title="Usuários" onPress={() => {}} />
        <Button title="Relatórios" onPress={() => navigation.navigate('Relatórios')} />
        <Button title="Coletas" onPress={() => navigation.navigate('Coletas')} />
        <Button title="Análises" onPress={() => navigation.navigate('Análises')} />
      </View>

      <Text style={{ fontSize: 24, marginBottom: 16 }}>Filtros de Coletas</Text>
      <Button title="Exame de Sangue a Fresco" onPress={() => {}} />
      <Button title="Distensão Fina" onPress={() => {}} />
      <Button title="Gota Espessa" onPress={() => {}} />
      <Button title="Técnicas de Coloração" onPress={() => {}} />

      <Button title="Desconectar" onPress={onLogout} color="#d9534f" />
    </View>
  );
}
