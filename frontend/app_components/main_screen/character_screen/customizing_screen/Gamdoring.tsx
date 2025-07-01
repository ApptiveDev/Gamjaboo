import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Skin from "@/app_assets/customizing_screen/skin.svg"

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export function Gamdoring() {
  return (
    <View style={styles.container}>
      <Skin />
      <Text style={styles.text}>0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: screenWidth * 0.035,
  },
  text: {
    color: "#ADD69F",
    fontWeight: "bold",
    fontSize: screenWidth * 0.047,
  },
});