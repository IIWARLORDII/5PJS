// screens/NovaColetaScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { db, storage } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function NovaColetaScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [detalhes, setDetalhes] = useState('');
  const [tipo, setTipo] = useState('');
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [historico, setHistorico] = useState('');

  // Função para escolher imagem
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  // Função para salvar dados e imagem no Firebase
  const handleSubmit = async () => {
    if (!image || !detalhes || !tipo || !nome || !idade) {
      Alert.alert("Erro", "Por favor, preencha todos os campos e escolha uma imagem.");
      return;
    }

    try {
      const coletaRef = db.collection('coletas').doc();
      const coletaID = coletaRef.id;

      // Upload da imagem
      const imageRef = ref(storage, `coletas/${coletaID}`);
      const response = await fetch(image);
      const blob = await response.blob();
      await uploadBytes(imageRef, blob);

      // URL da imagem
      const photoURL = await getDownloadURL(imageRef);

      // Salvar coleta no Firestore
      await coletaRef.set({
        n: coletaID,
        nome,
        idade,
        historico,
        detalhes,
        tipoAnalise: tipo,
        foto: photoURL,
        diagnostico: "Negativo",
        analisado: 0
      });

      Alert.alert("Sucesso", "Coleta registrada com sucesso!");
      navigation.navigate('Coletas');
    } catch (error) {
      console.error("Erro ao salvar coleta:", error);
      Alert.alert("Erro", "Ocorreu um erro ao registrar a coleta.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Nova Coleta</Text>
      
      {/* Botão para escolher imagem */}
      <Button title="Escolher Imagem" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginVertical: 10 }} />}
      
      {/* Campos de entrada */}
      <TextInput 
        placeholder="Detalhes da Amostra" 
        value={detalhes} 
        onChangeText={setDetalhes} 
        style={{ borderWidth: 1, padding: 8, marginVertical: 5 }}
      />
      <TextInput 
        placeholder="Tipo de Análise (Ex: Gota Espessa)" 
        value={tipo} 
        onChangeText={setTipo} 
        style={{ borderWidth: 1, padding: 8, marginVertical: 5 }}
      />
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
    </View>
  );
}
