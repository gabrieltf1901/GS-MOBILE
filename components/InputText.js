import React from "react";
import { TextInput, StyleSheet } from "react-native";
import colors from "../assets/styles/colors";

const InputText = ({ placeholder, value, onChangeText, secureTextEntry }) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    placeholderTextColor="#757575"
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
  />
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 8,
    fontSize: 16,
    color: colors.text,
  },
});

export default InputText;
