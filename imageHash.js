// imageHash.js
import ImageEditor from "@react-native-community/image-editor"; // Ajuda a redimensionar a imagem
import axios from 'axios'; // Import axios for fetching images

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

// Função para converter array buffer para base64
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Converte a imagem em escala de cinza e gera o hash
async function generateImageHash(uri) {
  const response = await axios.get(uri, { responseType: 'arraybuffer' });
  const base64Image = arrayBufferToBase64(response.data); // Convert the binary response to base64

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
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const grayscaleArray = [];
  for (let i = 0; i < bytes.length; i += 4) {
    const r = bytes[i];
    const g = bytes[i + 1];
    const b = bytes[i + 2];
    const gray = 0.299 * r + 0.587 * g + 0.114 * b;
    grayscaleArray.push(gray);
  }
  return grayscaleArray;
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
