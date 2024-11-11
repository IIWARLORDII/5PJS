// imageHash.js
import ImageEditor from "@react-native-community/image-editor"; // Ajuda a redimensionar a imagem
import * as ImageBase64 from 'react-native-image-base64';

// Função para redimensionar a imagem para 8x8 pixels (para simplificar o pHash)
async function resizeImage(uri) {
  const cropData = {
    offset: { x: 0, y: 0 },
    size: { width: 8, height: 8 },
    displaySize: { width: 8, height: 8 },
    resizeMode: 'cover',
  };
  return await ImageEditor.cropImage(uri, cropData);
}

// Converte a imagem em escala de cinza e gera o hash
async function generateImageHash(uri) {
  const resizedImageUri = await resizeImage(uri);
  const base64Image = await ImageBase64.getBase64String(resizedImageUri);

  // Converte a string base64 para um array de valores de pixels
  const pixels = await convertBase64ToGrayscaleArray(base64Image);
  
  // Calcula a média dos valores dos pixels
  const avg = pixels.reduce((sum, pixel) => sum + pixel, 0) / pixels.length;

  // Gera o hash comparando cada pixel com a média (0 ou 1)
  const hash = pixels.map(pixel => (pixel >= avg ? '1' : '0')).join('');
  return hash;
}

// Converte a string base64 da imagem para uma matriz de pixels em escala de cinza
async function convertBase64ToGrayscaleArray(base64) {
  // Decodifica a imagem base64 e converte para array de pixels
  // Em um ambiente Node.js completo, podemos usar bibliotecas como "sharp" para essa conversão,
  // mas em React Native, estamos limitados ao uso de bibliotecas compatíveis.

  // Implementação de conversão base64 -> pixels (depende do ambiente e métodos disponíveis)
  // Aqui vamos supor que os dados já estejam prontos em escala de cinza
  // Essa implementação específica é um placeholder e exigirá mais ajustes em produção.
  return new Array(64).fill(128); // Placeholder, deve ser substituído por conversão real.
}

// Compara dois hashes e retorna uma medida de similaridade (distância de Hamming)
function compareHashes(hash1, hash2) {
  let differences = 0;
  for (let i = 0; i < hash1.length; i++) {
    if (hash1[i] !== hash2[i]) differences++;
  }
  return differences;
}

export async function areImagesSimilar(uri1, uri2, threshold = 10) {
  const hash1 = await generateImageHash(uri1);
  const hash2 = await generateImageHash(uri2);
  const distance = compareHashes(hash1, hash2);
  return distance <= threshold; // Quanto menor o threshold, mais similar devem ser as imagens
}
