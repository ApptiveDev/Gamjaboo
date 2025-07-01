import { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

export function DailyBudget() {
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text1}>하루 예산</Text>
      <View style={styles.separator}></View>

      <TextInput 
        style={styles.text2}
        value={minAmount}
        onChangeText={setMinAmount}
        keyboardType="numeric"
        placeholder="00,000"
        placeholderTextColor="#65BE71"
      />

      <Text style={styles.text2}>-</Text>

      <TextInput 
        style={styles.text2}
        value={maxAmount}
        onChangeText={setMaxAmount}
        keyboardType="numeric"
        placeholder="00,000"
        placeholderTextColor="#65BE71"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: screenWidth * 0.15,
    marginHorizontal: screenWidth * 0.12,
    gap: screenWidth * 0.05,
    // shadow at ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
  },
  text1: {
    fontSize: screenWidth * 0.03,
    fontWeight: "semibold",
    color: "#80D892",
  },
  text2: {
    fontSize: screenWidth * 0.035,
    fontWeight: "semibold",
    color: "#65BE71",
  },
  separator: {
    width: screenWidth * 0.002,
    height: "50%",
    backgroundColor: "#80D892",
    marginHorizontal: screenWidth * 0.02,
  },
})