// components/ShelterCard.js

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../assets/styles/colors";

const ShelterCard = ({ shelter, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(shelter)}>
      <Text style={styles.title}>{shelter.nome}</Text>
      <Text style={styles.subtitle}>
        Capacidade: {shelter.capacidade_total}
      </Text>
      <Text
        style={[
          styles.status,
          shelter.status === "ABERTO"
            ? { color: colors.primary }
            : { color: colors.error },
        ]}
      >
        {shelter.status === "ABERTO" ? "🟢 Aberto" : "🔴 Fechado"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.secondary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.placeholder,
    marginTop: 4,
  },
  status: {
    fontSize: 14,
    marginTop: 6,
    fontWeight: "600",
  },
});

export default ShelterCard;
