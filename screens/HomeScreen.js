// screens/HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation, onLogout }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel Principal</Text>

      {/* Botões do painel principal */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Usuários</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Relatórios')}
        >
          <Text style={styles.buttonText}>Relatórios</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Coletas')}
        >
          <Text style={styles.buttonText}>Coletas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Análises')}
        >
          <Text style={styles.buttonText}>Análises</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Filtros de Coletas</Text>
      <View style={styles.filterGroup}>
        <TouchableOpacity style={styles.filterButton} onPress={() => {}}>
          <Text style={styles.filterButtonText}>Exame de Sangue a Fresco</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => {}}>
          <Text style={styles.filterButtonText}>Distensão Fina</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => {}}>
          <Text style={styles.filterButtonText}>Gota Espessa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => {}}>
          <Text style={styles.filterButtonText}>Técnicas de Coloração</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutButtonText}>Desconectar</Text>
      </TouchableOpacity>
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
