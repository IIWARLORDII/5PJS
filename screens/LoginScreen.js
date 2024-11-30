import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword, sendEmailVerification, fetchSignInMethodsForEmail, onAuthStateChanged } from 'firebase/auth';

export default function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [emailForReset, setEmailForReset] = useState('');
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        onLogin();
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          onLogin();
        } else {
          setErrorMessage('Por favor, verifique seu e-mail antes de fazer login.');
          setSuccessMessage('');
        }
      })
      .catch(error => {
        setErrorMessage('Erro: ' + error.message);
        setSuccessMessage('');
      });
  };

  const handlePasswordReset = () => {
    fetchSignInMethodsForEmail(auth, emailForReset)
      .then((methods) => {
        if (methods.length > 0) {
          sendPasswordResetEmail(auth, emailForReset)
            .then(() => {
              setSuccessMessage('Email de reset de senha enviado com sucesso!');
              setErrorMessage('');
              setModalVisible(false);
            })
            .catch(error => {
              setErrorMessage('Erro: ' + error.message);
              setSuccessMessage('');
            });
        } else {
          setErrorMessage('Erro: Email não cadastrado.');
          setSuccessMessage('');
        }
      })
      .catch(error => {
        setErrorMessage('Erro: ' + error.message);
        setSuccessMessage('');
      });
  };

  const handleRegister = () => {
    if (!registerEmail.endsWith('@faeterj-rio.edu.br')) {
      setErrorMessage('Erro: Email deve ser do domínio @faeterj-rio.edu.br');
      setSuccessMessage('');
      return;
    }

    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        sendEmailVerification(user)
          .then(() => {
            setSuccessMessage('Usuário registrado com sucesso! Verifique seu e-mail.');
            setErrorMessage('');
            setRegisterModalVisible(false);
          })
          .catch(error => {
            setErrorMessage('Erro ao enviar e-mail de verificação: ' + error.message);
            setSuccessMessage('');
          });
      })
      .catch(error => {
        setErrorMessage('Erro: ' + error.message);
        setSuccessMessage('');
      });
  };

  const openResetModal = () => {
    setErrorMessage('');
    setSuccessMessage('');
    setModalVisible(true);
  };

  const openRegisterModal = () => {
    setErrorMessage('');
    setSuccessMessage('');
    setRegisterModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>ChagasApp</Text>
      <Text style={styles.title}>Faça Login</Text>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}
      <TextInput 
        placeholder="Email" 
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
      <TouchableOpacity onPress={openRegisterModal}>
        <Text style={styles.link}>Não tem uma conta? Registre-se</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openResetModal}>
        <Text style={styles.link}>Esqueci a senha</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Resetar Senha</Text>
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
            {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}
            <TextInput 
              placeholder="Email" 
              value={emailForReset} 
              onChangeText={setEmailForReset} 
              style={styles.input}
            />
            <Button title="Enviar Email" onPress={handlePasswordReset} />
            <Button title="Fechar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
      <Modal
        visible={registerModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setRegisterModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Registrar</Text>
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
            {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}
            <TextInput 
              placeholder="Email" 
              value={registerEmail} 
              onChangeText={setRegisterEmail} 
              style={styles.input}
            />
            <TextInput 
              placeholder="Senha" 
              secureTextEntry 
              value={registerPassword} 
              onChangeText={setRegisterPassword} 
              style={styles.input}
            />
            <Button title="Registrar" onPress={handleRegister} />
            <Button title="Fechar" onPress={() => setRegisterModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 16,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  loginButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  link: {
    color: '#1D4ED8',
    textAlign: 'center',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  successText: {
    color: 'green',
    textAlign: 'center',
    marginBottom: 10,
  },
});
