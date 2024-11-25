// screens/AnalisysScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image, Alert, StyleSheet } from 'react-native';
import { getDatabase, ref, get } from 'firebase/database';
import { realtimeDb } from '../firebaseConfig'; // Importa a instância do banco de dados

export default function AnalisysScreen({ navigation }) {
  const [analyses, setAnalyses] = useState([]);
  
  // Função para buscar as imagens das coletas e classificações no Firebase
  const fetchAnalyses = async () => {
    const coletasRef = ref(realtimeDb, 'coletas'); // Caminho para a coleção de coletas
    try {
      const snapshot = await get(coletasRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const analysesList = Object.entries(data).map(([key, value]) => ({
          key,
          ...value,
        }));
        setAnalyses(analysesList); // Atualiza o estado com os dados das coletas
      } else {
        Alert.alert('Erro', 'Não há coletas disponíveis.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as coletas.');
      console.error('Erro ao buscar imagens:', error);
    }
  };

  useEffect(() => {
    // Carregar as coletas quando a tela for carregada
    fetchAnalyses();
  }, []);

  // Função para enviar a análise para a tela de Relatórios
  const handleSendToReports = (item) => {
    // Navega para a tela de Relatórios e passa os dados da análise
    navigation.navigate('Relatórios', { item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Análises Pendentes</Text>
      
      {/* Botão para buscar novas análises */}
      <Button title="Nova Análise" onPress={fetchAnalyses} color="#4CAF50" />
      
      {/* Exibindo as imagens das coletas com a classificação */}
      <FlatList
        data={analyses}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.foto }} style={styles.image} />
            <Text style={styles.classificationText}>{`Classificação: ${item.classificacao || "Indefinido"}`}</Text>
            <Text style={styles.detailsText}>{`Detalhes: ${item.detalhes}`}</Text>
            {/* Botão para enviar a análise para a tela de Relatórios */}
            <Button 
              title="Enviar para Relatório"
              onPress={() => handleSendToReports(item)}
              color="#007bff"
            />
          </View>
        )}
      />
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
    marginBottom: 16,
    color: '#333',
  },
  card: {
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  classificationText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailsText: {
    fontSize: 14,
    color: '#555',
  },
});
