import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface Props {
  selectedMonth: number;
}

export function ShowMonth({ selectedMonth }: Readonly<Props>) {
  return (
    <View style={styles.button}>
      <Text style={styles.text}>{selectedMonth}월</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: screenWidth * 0.25,
    height: "100%",
    borderRadius: screenWidth * 0.3,
    elevation: 3,
  },
  text: {
    fontSize: screenWidth * 0.05,
    fontWeight: "bold",
    color: "#329257",
  },
});