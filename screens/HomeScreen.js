import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

export default function HomeScreen({ navigation, onLogout }) {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 16 }}>Painel Principal</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button title="Relatórios" onPress={() => navigation.navigate('Relatórios')} />
          <Button title="Coletas" onPress={() => navigation.navigate('Coletas')} />
          <Button title="Análises" onPress={() => navigation.navigate('Análises')} />
        </View>

        <Text style={{ fontSize: 24, marginBottom: 16 }}>Filtros de Coletas</Text>
        <Button title="Exame de Sangue a Fresco" onPress={() => {}} color="#808080" />
        <Button title="Distensão Fina" onPress={() => {}} color="#808080" />
        <Button title="Gota Espessa" onPress={() => {}} color="#808080" />
        <Button title="Técnicas de Coloração" onPress={() => {}} color="#808080" />

        <Button title="Desconectar" onPress={onLogout} color="#d9534f" />
      </ScrollView>

      <Text style={styles.footerText}>* Filtros de coleta ainda não funcionais nesta versão.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB', // Fundo claro
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151', // Cinza escuro
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginTop: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  menuButton: {
    backgroundColor: '#000000', // Verde
    padding: 16,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  menuButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  filterButton: {
    backgroundColor: '#E5E7EB', // Cinza claro
    padding: 16,
    borderRadius: 8,
    width: '100%',
    marginVertical: 8,
    alignItems: 'center',
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280', // Cinza médio
  },
  logoutButton: {
    backgroundColor: '#EF4444', // Vermelho
    padding: 16,
    borderRadius: 8,
    width: '100%',
    marginTop: 24,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    fontSize: 14,
    color: '#9CA3AF', // Cinza claro
    textAlign: 'center',
    marginVertical: 10,
  },
});

