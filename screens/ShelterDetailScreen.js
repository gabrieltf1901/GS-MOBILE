// screens/ShelterDetailScreen.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";

// 👉 Import do objeto de cores
import colors from "../assets/styles/colors";

import api from "../services/api";
import Loader from "../components/Loader";

const ShelterDetailScreen = ({ route, navigation }) => {
  const { shelter } = route.params;
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResources = async () => {
    setLoading(true);
    try {
      // Ajuste este endpoint conforme seu backend; ex: GET /api/estoqueabrigo/abrigo/{id}
      const response = await api.get(`/abrigo/${shelter.id}/recursos`);
      setResources(response.data);
    } catch (error) {
      Alert.alert("Erro ao carregar recursos", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({ title: shelter.nome });
    fetchResources();
  }, []);

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Endereço:</Text>
        <Text style={styles.infoText}>{shelter.endereco}</Text>

        <Text style={styles.infoLabel}>Capacidade Total:</Text>
        <Text style={styles.infoText}>{shelter.capacidade_total}</Text>

        <Text style={styles.infoLabel}>Status:</Text>
        <Text
          style={[
            styles.infoText,
            shelter.status === "ABERTO"
              ? { color: colors.primary }
              : { color: colors.error },
          ]}
        >
          {shelter.status === "ABERTO" ? "Aberto" : "Fechado"}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Recursos Disponíveis</Text>

      <FlatList
        data={resources}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.resourceItem}>
            <Text style={styles.resourceName}>{item.nome}</Text>
            <Text style={styles.resourceQty}>
              Qtd: {item.quantidade_atual} {item.unidade_medida}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum recurso cadastrado.</Text>
        }
        contentContainerStyle={{ paddingBottom: 16 }}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate("ResourceForm", { shelterId: shelter.id })
        }
      >
        <Text style={styles.addButtonText}>+ Adicionar Recurso</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  infoBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.secondary,
    marginTop: 8,
  },
  infoText: {
    fontSize: 16,
    color: colors.text,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.secondary,
    marginBottom: 12,
  },
  resourceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.inputBorder,
  },
  resourceName: {
    fontSize: 16,
    color: colors.text,
    fontWeight: "600",
  },
  resourceQty: {
    fontSize: 16,
    color: colors.secondary,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 24,
    color: colors.placeholder,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ShelterDetailScreen;
