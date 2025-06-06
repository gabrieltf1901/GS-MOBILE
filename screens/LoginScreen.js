// screens/LoginScreen.js

import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

// 👉 Import do objeto de cores
import colors from "../assets/styles/colors";

import { auth } from "../services/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { AuthContext } from "../contexts/AuthContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Informe e-mail e senha.");
      return;
    }
    setLoading(true);
    try {
      let userCredential;
      if (isRegistering) {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );
      } else {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );
      }
      setUser(userCredential.user);
    } catch (error) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.box}>
        <Text style={styles.title}>{isRegistering ? "Registrar" : "Login"}</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor={colors.placeholder}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor={colors.placeholder}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleAuth}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading
              ? isRegistering
                ? "Cadastrando..."
                : "Entrando..."
              : isRegistering
              ? "Cadastrar"
              : "Entrar"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsRegistering(!isRegistering)}
          style={styles.toggleContainer}
        >
          <Text style={styles.toggleText}>
            {isRegistering
              ? "Já possui conta? Faça login"
              : "Ainda não tem conta? Registre-se"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  box: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.secondary,
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    height: 48,
    borderColor: colors.inputBorder,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.background,
  },
  button: {
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: "#E57373",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  toggleContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  toggleText: {
    fontSize: 14,
    color: colors.primary,
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
