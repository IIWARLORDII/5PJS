import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image, Picker } from 'react-native';
import axios from 'axios';
import { realtimeDb } from '../firebaseConfig';
import { ref, set, get } from 'firebase/database';
import { areImagesSimilar } from '../imageHash'; // Import the image comparison function

export default function NovaColetaScreen({ navigation }) {
  const [imageLink, setImageLink] = useState('');
  const [detalhes, setDetalhes] = useState('');
  const [tipo, setTipo] = useState('Exame de Sangue a Fresco');
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [historico, setHistorico] = useState('');
  const [error, setError] = useState('');
  const [imageValid, setImageValid] = useState(false);

  const handleImageLinkChange = async (link) => {
    setImageLink(link);
    try {
      const response = await axios.get(link);
      if (response.status === 200) {
        setImageValid(true);
      } else {
        setImageValid(false);
      }
    } catch {
      setImageValid(false);
    }
  };

  const handleSubmit = async () => {
    if (!imageLink || !detalhes || !tipo || !nome || !idade) {
      Alert.alert("Erro", "Por favor, preencha todos os campos e forneça um link de imagem.");
      return;
    }

    try {
      // Verificar se a imagem é similar a alguma imagem em /positivos
      const positivosRef = ref(realtimeDb, 'positivos');
      const positivosSnapshot = await get(positivosRef);
      let diagnostico = "Negativo";

      if (positivosSnapshot.exists()) {
        const positivos = positivosSnapshot.val();
        for (const key in positivos) {
          const similar = await areImagesSimilar(imageLink, positivos[key]);
          if (similar) {
            diagnostico = "Positivo";
            break;
          }
        }
      }

      // Gerar ID incremental para a nova coleta
      const coletasRef = ref(realtimeDb, 'coletas');
      const coletasSnapshot = await get(coletasRef);
      const newColetaID = coletasSnapshot.exists() ? Object.keys(coletasSnapshot.val()).length + 1 : 1;
      const coletaID = String(newColetaID).padStart(3, '0');

      // Salvar coleta no Realtime Database
      await set(ref(realtimeDb, `coletas/${coletaID}`), {
        n: coletaID,
        coleta: coletaID, // Adicionar a chave "coleta" como string
        nome,
        idade,
        historico,
        detalhes,
        tipoAnalise: tipo,
        foto: imageLink,
        diagnostico,
        analisado: 0
      });

      // Redirecionar para a tela de coletas
      navigation.reset({
        index: 0,
        routes: [{ name: 'Coletas' }],
      });
    } catch (error) {
      console.error("Erro ao salvar coleta:", error);
      setError(`Erro ao registrar a coleta: ${error.message}`);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Image
        source={imageValid ? { uri: imageLink } : require('../assets/laboratorio.png')}
        style={{ width: 200, height: 200, alignSelf: 'center', marginBottom: 20 }}
      />
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Nova Coleta</Text>
      
      {/* Campo para link da imagem */}
      <TextInput 
        placeholder="Link da Imagem" 
        value={imageLink} 
        onChangeText={handleImageLinkChange} 
        style={{ borderWidth: 1, padding: 8, marginVertical: 5 }}
      />
      
      {/* Campos de entrada */}
      <TextInput 
        placeholder="Detalhes da Amostra" 
        value={detalhes} 
        onChangeText={setDetalhes} 
        style={{ borderWidth: 1, padding: 8, marginVertical: 5 }}
      />
      <Picker
        selectedValue={tipo}
        onValueChange={(itemValue) => setTipo(itemValue)}
        style={{ borderWidth: 1, padding: 8, marginVertical: 5 }}
      >
        <Picker.Item label="Exame de Sangue a Fresco" value="Exame de Sangue a Fresco" />
        <Picker.Item label="Distensão Fina" value="Distensão Fina" />
        <Picker.Item label="Gota Espessa" value="Gota Espessa" />
      </Picker>
      <TextInput 
        placeholder="Nome Completo do Paciente" 
        value={nome} 
        onChangeText={setNome} 
        style={{ borderWidth: 1, padding: 8, marginVertical: 5 }}
      />
      <TextInput 
        placeholder="Idade do Paciente" 
        value={idade} 
        onChangeText={setIdade} 
        keyboardType="numeric" 
        style={{ borderWidth: 1, padding: 8, marginVertical: 5 }}
      />
      <TextInput 
        placeholder="Histórico Médico" 
        value={historico} 
        onChangeText={setHistorico} 
        style={{ borderWidth: 1, padding: 8, marginVertical: 5 }}
      />

      {/* Botão de Enviar */}
      <Button title="Registrar Coleta" onPress={handleSubmit} color="#4CAF50" />

      {/* Exibir mensagem de erro, se houver */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
