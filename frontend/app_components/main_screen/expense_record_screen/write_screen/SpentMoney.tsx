import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions, TextInput } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

export function SpentMoney() {
  const [amount, setAmount] = useState("");

  const handleChangeAmount = (text: string) => {
    setAmount(text);
  };
  
  return (
    <TouchableOpacity style={styles.container}>
      <TextInput
        style={styles.text}
        value={amount}
        onChangeText={handleChangeAmount}
        keyboardType="numeric"
        placeholder="000,000"
        placeholderTextColor="#329257"
      />
      <Text style={styles.unit}>원</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "40%",
    height: "75%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: screenWidth * 0.05,
    // shadow at ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
  },
  text: {
    fontSize: screenWidth * 0.04,
    color: "#329257",
  },
  unit: {
    fontSize: screenWidth * 0.04,
    color: "#329257",
  }
});




