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
  footerText: {
    color: '#808080',
    textAlign: 'center',
    marginBottom: 10,
  },
});
