import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onLogin(); // Ao clicar em Login, chama a função onLogin para mudar o estado para logado
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faça Login</Text>
      <TextInput 
        placeholder="Nome de usuário" 
        value={username} 
        onChangeText={setUsername} 
        style={styles.input}
      />
      <TextInput 
        placeholder="Senha" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
        style={styles.input}
      />
      <View style={styles.loginButton}>
        <Button title="Login" onPress={handleLogin} color="#000" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F9FAFB', // Cor de fundo clara
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000', // Cinza escuro
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#D1D5DB', // Cor da borda (cinza claro)
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 16,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  loginButton: {
    backgroundColor: '#000000', // Verde
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
});
