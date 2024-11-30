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
        source={imageValid ? { uri: imageLink } : require('../assets/icons/laboratorio.png')}
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
  container: {
    padding: 20,
    backgroundColor: '#F9FAFB', // Fundo claro
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151', // Cinza escuro
    marginBottom: 16,
  },
  item: {
    backgroundColor: '#FFFFFF', // Fundo branco
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2, // Sombra no Android
    marginVertical: 10,
    width: '90%',
    padding: 16,
    alignItems: 'center',
  },
  itemText: {
    textAlign: 'center',
    color: '#374151',
    fontSize: 14,
    marginVertical: 4,
  },
  itemImage: {
    width: 100,
    height: 100,
    marginTop: 8,
    borderRadius: 8,
    borderColor: '#E5E7EB', // Borda cinza claro
    borderWidth: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 14,
    color: '#4B5563', // Cinza médio
    marginBottom: 8,
  },
  modalImage: {
    width: 150,
    height: 150,
    marginVertical: 12,
    borderRadius: 8,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    width: '80%',
  },
  radio: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#E5E7EB', // Fundo cinza claro
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB', // Borda cinza clara
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    color: '#374151',
    width: '100%',
    marginVertical: 8,
  },
  buttonPrimary: {
    backgroundColor: '#10B981', // Verde primário
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonPrimaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSecondary: {
    backgroundColor: '#F3F4F6', // Fundo cinza claro
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonSecondaryText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
});

