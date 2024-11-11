// screens/RegistroPacienteScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { db } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { areImagesSimilar } from '../imageHash';

export default function RegistroPacienteScreen({ route, navigation }) {
  const { image, detalhes, tipo } = route.params;
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [historico, setHistorico] = useState('');

  const saveToFirebase = async () => {
    try {
      const coletaRef = db.collection('coletas').doc();
      const coletaID = coletaRef.id;

      const imageRef = ref(storage, `coletas/${coletaID}`);
      const response = await fetch(image);
      const blob = await response.blob();
      await uploadBytes(imageRef, blob);
      const photoURL = await getDownloadURL(imageRef);

      const diagnostico = await checkImageSimilarity(photoURL);
      await coletaRef.set({
        n: coletaID,
        nome,
        idade,
        historico,
        detalhes,
        tipoAnalise: tipo,
        foto: photoURL,
        diagnostico,
        analisado: 0
      });

      navigation.navigate('Coletas');
    } catch (error) {
      console.error('Erro ao salvar coleta:', error);
    }
  };

  const checkImageSimilarity = async (photoURL) => {
    const positivosRef = db.collection('positivos');
    const positivosSnapshots = await positivosRef.get();

    for (const doc of positivosSnapshots.docs) {
      const positiveImageURL = doc.data().url;
      const isSimilar = await areImagesSimilar(photoURL, positiveImageURL);
      if (isSimilar) return 'Positivo';
    }
    return 'Negativo';
  };

  return (
    <View>
      <TextInput placeholder="Nome Completo" value={nome} onChangeText={setNome} />
      <TextInput placeholder="Idade" value={idade} onChangeText={setIdade} keyboardType="numeric" />
      <TextInput placeholder="Histórico Médico" value={historico} onChangeText={setHistorico} />
      <Button title="Concluir" onPress={saveToFirebase} />
    </View>
  );
}
