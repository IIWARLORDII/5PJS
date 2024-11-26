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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 32,
    marginBottom: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 8,
    width: '48%', // Para deixar dois botões por linha
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  filterGroup: {
    marginTop: 8,
  },
  filterButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  filterButtonText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#d9534f',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});