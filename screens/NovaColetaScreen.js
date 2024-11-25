import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import { realtimeDb } from '../firebaseConfig';
import { ref, set, get } from 'firebase/database';
// import * as ImagePicker from 'expo-image-picker';
// import axios from 'axios';
// import { CLOUDINARY_URL, CLOUDINARY_UPLOAD_PRESET } from '@env';

export default function NovaColetaScreen({ navigation }) {
  // const [image, setImage] = useState(null);
  const [imageLink, setImageLink] = useState('');
  const [detalhes, setDetalhes] = useState('');
  const [tipo, setTipo] = useState('');
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [historico, setHistorico] = useState('');
  // const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  // Função para escolher imagem
  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri);
  //   }
  // };

  // Função para fazer upload da imagem para o Cloudinary
  // const uploadImageToCloudinary = async (imageUri) => {
  //   setUploading(true);
  //   try {
  //     const formData = new FormData();
  //     formData.append('file', {
  //       uri: imageUri,
  //       type: 'image/jpeg',
  //       name: 'upload.jpg',
  //     });
  //     formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  //     console.log("Dados enviados para o Cloudinary:", formData);

  //     const response = await axios.post(CLOUDINARY_URL, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     console.log("Resposta do Cloudinary:", response.data);

  //     if (response.status === 200) {
  //       return response.data.secure_url;
  //     } else {
  //       console.error("Erro ao fazer upload da imagem para o Cloudinary:", response.data);
  //       throw new Error("Erro ao fazer upload da imagem para o Cloudinary");
  //     }
  //   } catch (error) {
  //     console.error("Erro ao fazer upload da imagem para o Cloudinary:", error);
  //     throw error;
  //   } finally {
  //     setUploading(false);
  //   }
  // };

  // Função para salvar dados e imagem no Firebase
  const handleSubmit = async () => {
    if (!imageLink || !detalhes || !tipo || !nome || !idade) {
      Alert.alert("Erro", "Por favor, preencha todos os campos e forneça um link de imagem.");
      return;
    }

    try {
      // Gerar ID incremental para a nova coleta
      const coletasRef = ref(realtimeDb, 'coletas');
      const coletasSnapshot = await get(coletasRef);
      const newColetaID = coletasSnapshot.exists() ? Object.keys(coletasSnapshot.val()).length + 1 : 1;
      const coletaID = String(newColetaID).padStart(3, '0');

      // Salvar coleta no Realtime Database
      await set(ref(realtimeDb, `coletas/${coletaID}`), {
        n: coletaID,
        coleta: coletaID,
        nome,
        idade,
        historico,
        detalhes,
        tipoAnalise: tipo,
        foto: imageLink,
        diagnostico: "Negativo",
        analisado: 0,
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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nova Coleta</Text>

      <TextInput
        placeholder="Link da Imagem"
        value={imageLink}
        onChangeText={setImageLink}
        style={styles.input}
      />
      <TextInput
        placeholder="Detalhes da Amostra"
        value={detalhes}
        onChangeText={setDetalhes}
        style={styles.input}
      />
      <TextInput
        placeholder="Tipo de Análise (Ex: Gota Espessa)"
        value={tipo}
        onChangeText={setTipo}
        style={styles.input}
      />
      <TextInput
        placeholder="Nome Completo do Paciente"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Idade do Paciente"
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Histórico Médico"
        value={historico}
        onChangeText={setHistorico}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Registrar Coleta</Text>
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
});
