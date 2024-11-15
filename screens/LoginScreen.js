// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onLogin(); // Ao clicar em Login, chama a função onLogin para mudar o estado para logado
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Faça Login</Text>
      <TextInput 
        placeholder="Nome de usuário" 
        value={username} 
        onChangeText={setUsername} 
        style={{ marginBottom: 16, padding: 8, borderWidth: 1 }}
      />
      <TextInput 
        placeholder="Senha" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
        style={{ marginBottom: 16, padding: 8, borderWidth: 1 }}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
