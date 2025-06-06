// screens/HomeScreen.js

import React, { useEffect, useState, useContext } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";

// 👉 Import do objeto de cores
import colors from "../assets/styles/colors";

import ShelterCard from "../components/ShelterCard";
import api from "../services/api";
import Loader from "../components/Loader";
import { AuthContext } from "../contexts/AuthContext";

const HomeScreen = ({ navigation }) => {
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(false);
  const { logout } = useContext(AuthContext);

  const fetchShelters = async () => {
    setLoading(true);
    try {
      const response = await api.get("/abrigos"); // GET /api/abrigos
      setShelters(response.data);
    } catch (error) {
      Alert.alert("Erro ao carregar abrigos", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchShelters);
    return unsubscribe;
  }, [navigation]);

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      {/* Header com título e botão de logout */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Abrigos</Text>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de abrigos */}
      <FlatList
        data={shelters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ShelterCard
            shelter={item}
            onPress={(shelter) =>
              navigation.navigate("ShelterDetail", { shelter })
            }
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum abrigo encontrado.</Text>
        }
      />

      {/* Botão flutuante para adicionar Abrigo */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("ShelterForm")}
        activeOpacity={0.8}
      >
        <Text style={styles.addButtonText}>+ Adicionar Abrigo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.background,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBorder,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.secondary,
  },
  logoutButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.primary,
    borderRadius: 6,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 48,
    color: colors.placeholder,
    fontSize: 16,
  },
  addButton: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4, // sombra no Android
    shadowColor: "#000", // sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
