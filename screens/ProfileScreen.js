// screens/ProfileScreen.js

import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

// 👉 Import do objeto de cores
import colors from "../assets/styles/colors";

import { AuthContext } from "../contexts/AuthContext";

const ProfileScreen = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert("Confirmação", "Deseja realmente sair?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", onPress: () => logout() },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoBox}>
        <Text style={styles.title}>Perfil do Usuário</Text>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.text}>{user?.email}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogout} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  infoBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.secondary,
    marginBottom: 16,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.secondary,
    marginTop: 8,
  },
  text: {
    fontSize: 16,
    color: colors.text,
    marginTop: 4,
  },
  button: {
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
