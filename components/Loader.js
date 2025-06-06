// components/Loader.js

import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import colors from "../assets/styles/colors";

const Loader = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={colors.primary} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loader;
