// screens/ResourceFormScreen.js

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

import { Picker } from "@react-native-picker/picker";
import api from "../services/api";
import Loader from "../components/Loader";

const ResourceFormScreen = ({ route, navigation }) => {
  const { shelterId, resourceId } = route.params || {};
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("ALIMENTO");
  const [nivelCritico, setNivelCritico] = useState("");
  const [unidadeMedida, setUnidadeMedida] = useState("");
  const [quantidadeAtual, setQuantidadeAtual] = useState("");
  const [loading, setLoading] = useState(false);

  // Caso seja edição, carrega os dados do recurso existente
  const fetchResource = async () => {
    if (!resourceId) return;
    setLoading(true);
    try {
      const response = await api.get(`/estoqueabrigo/${resourceId}`);
      const res = response.data;
      setNome(res.nome);
      setCategoria(res.categoria);
      setNivelCritico(String(res.nivel_critico));
      setUnidadeMedida(res.unidade_medida);
      setQuantidadeAtual(String(res.quantidade_atual));
    } catch (error) {
      Alert.alert("Erro ao carregar recurso", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (resourceId) {
      navigation.setOptions({ title: "Editar Recurso" });
      fetchResource();
    } else {
      navigation.setOptions({ title: "Novo Recurso" });
    }
  }, []);

  const handleSubmit = async () => {
    if (!nome.trim() || !nivelCritico.trim() || !unidadeMedida.trim() || !quantidadeAtual.trim()) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        abrigoId: shelterId,
        nome: nome.trim(),
        categoria,
        nivel_critico: parseInt(nivelCritico),
        unidade_medida: unidadeMedida.trim(),
        quantidade_atual: parseInt(quantidadeAtual),
      };

      if (resourceId) {
        await api.put(`/estoqueabrigo/${resourceId}`, payload);
        Alert.alert("Sucesso", "Recurso atualizado!");
      } else {
        await api.post("/estoqueabrigo", payload);
        Alert.alert("Sucesso", "Recurso criado!");
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro ao salvar recurso", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nome do Recurso</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Água Potável"
          placeholderTextColor={colors.placeholder}
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Categoria</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={categoria}
            onValueChange={(itemValue) => setCategoria(itemValue)}
            style={styles.picker}
            itemStyle={{ fontSize: 16, color: colors.text }}
          >
            <Picker.Item label="Alimento" value="ALIMENTO" />
            <Picker.Item label="Água" value="AGUA" />
            <Picker.Item label="Cobertor" value="COBERTOR" />
            <Picker.Item
              label="Kit de Primeiros Socorros"
              value="KIT_PRIMEIROS_SOCORROS"
            />
            <Picker.Item label="Medicamento" value="MEDICAMENTO" />
            <Picker.Item label="Outro" value="OUTRO" />
          </Picker>
        </View>

        <Text style={styles.label}>Nível Crítico (número)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 10"
          placeholderTextColor={colors.placeholder}
          keyboardType="numeric"
          value={nivelCritico}
          onChangeText={setNivelCritico}
        />

        <Text style={styles.label}>Unidade de Medida</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: L, KG, UN"
          placeholderTextColor={colors.placeholder}
          value={unidadeMedida}
          onChangeText={setUnidadeMedida}
        />

        <Text style={styles.label}>Quantidade Atual</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 50"
          placeholderTextColor={colors.placeholder}
          keyboardType="numeric"
          value={quantidadeAtual}
          onChangeText={setQuantidadeAtual}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {resourceId ? "Atualizar Recurso" : "Salvar Recurso"}
          </Text>
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
    height: Platform.OS === "ios" ? 150 : 52,
    borderColor: colors.inputBorder,
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 8,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  picker: {
    width: "100%",
    height: Platform.OS === "ios" ? 150 : 52,
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

export default ResourceFormScreen;
