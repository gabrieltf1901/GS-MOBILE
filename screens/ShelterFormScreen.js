// screens/ShelterFormScreen.js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";

// 👉 Import do objeto de cores
import colors from "../assets/styles/colors";

import api from "../services/api";
import Loader from "../components/Loader";

const ShelterFormScreen = ({ navigation, route }) => {
  // Se houver route.params.shelterId, então é edição (não usado aqui, mas deixado para evolução)
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [capacidadeTotal, setCapacidadeTotal] = useState("");
  const [status, setStatus] = useState("ABERTO");
  const [loading, setLoading] = useState(false);

  // Se estivesse editando um abrigo, buscaríamos os dados aqui.
  // Mas, por enquanto, vamos focar em criar um novo abrigo.

  const handleSubmit = async () => {
    if (
      !nome.trim() ||
      !endereco.trim() ||
      !latitude.trim() ||
      !longitude.trim() ||
      !capacidadeTotal.trim() ||
      !status
    ) {
      Alert.alert("Erro", "Preencha todos os campos corretamente.");
      return;
    }

    // Validar valores numéricos
    const latNum = parseFloat(latitude.replace(",", "."));
    const lngNum = parseFloat(longitude.replace(",", "."));
    const capNum = parseInt(capacidadeTotal);

    if (isNaN(latNum) || isNaN(lngNum) || isNaN(capNum)) {
      Alert.alert("Erro", "Latitude, Longitude e Capacidade devem ser numéricos.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        nome: nome.trim(),
        endereco: endereco.trim(),
        latitude: latNum,
        longitude: lngNum,
        capacidade_total: capNum,
        status, // "ABERTO" ou "FECHADO"
      };

      await api.post("/abrigos", payload);
      Alert.alert("Sucesso", "Abrigo criado com sucesso!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro ao salvar abrigo", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nome do Abrigo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Ginásio Municipal"
          placeholderTextColor={colors.placeholder}
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Endereço</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Rua das Flores, 123, Centro"
          placeholderTextColor={colors.placeholder}
          value={endereco}
          onChangeText={setEndereco}
        />

        <Text style={styles.label}>Latitude</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: -23.550520"
          placeholderTextColor={colors.placeholder}
          keyboardType="decimal-pad"
          value={latitude}
          onChangeText={setLatitude}
        />

        <Text style={styles.label}>Longitude</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: -46.633308"
          placeholderTextColor={colors.placeholder}
          keyboardType="decimal-pad"
          value={longitude}
          onChangeText={setLongitude}
        />

        <Text style={styles.label}>Capacidade Total</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 200"
          placeholderTextColor={colors.placeholder}
          keyboardType="number-pad"
          value={capacidadeTotal}
          onChangeText={setCapacidadeTotal}
        />

        <Text style={styles.label}>Status</Text>
        <View style={styles.pickerWrapper}>
          <TouchableOpacity
            style={[
              styles.statusOption,
              status === "ABERTO" && { backgroundColor: colors.primary },
            ]}
            onPress={() => setStatus("ABERTO")}
          >
            <Text
              style={[
                styles.statusText,
                status === "ABERTO" && { color: "#FFFFFF" },
              ]}
            >
              Aberto
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.statusOption,
              status === "FECHADO" && { backgroundColor: colors.primary },
            ]}
            onPress={() => setStatus("FECHADO")}
          >
            <Text
              style={[
                styles.statusText,
                status === "FECHADO" && { color: "#FFFFFF" },
              ]}
            >
              Fechado
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Salvar Abrigo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: colors.background,
    paddingVertical: 16,
  },
  formContainer: {
    marginHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: colors.secondary,
    fontWeight: "600",
    marginTop: 12,
  },
  input: {
    height: 48,
    borderColor: colors.inputBorder,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    marginTop: 8,
    fontSize: 16,
    color: colors.text,
    backgroundColor: "#FFFFFF",
  },
  pickerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  statusOption: {
    flex: 1,
    height: 48,
    borderColor: colors.inputBorder,
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
    backgroundColor: "#FFFFFF",
  },
  statusText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: "600",
  },
  button: {
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default ShelterFormScreen;
