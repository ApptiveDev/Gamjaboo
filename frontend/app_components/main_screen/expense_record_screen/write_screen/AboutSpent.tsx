import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { SpentBgPicker } from "@/app_components/main_screen/expense_record_screen/write_screen/SpentBgPicker";
import { SpentMoney } from "@/app_components/main_screen/expense_record_screen/write_screen/SpentMoney"

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export function AboutSpent() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>소비 항목</Text>
        <Text style={styles.text}>소비 금액</Text>
      </View>
      <View style={styles.btnContainer}>
        <SpentBgPicker />
        <SpentMoney />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: screenWidth * 0.4,
  },
  textContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: screenWidth * 0.1,
  },
  text: {
    fontSize: screenWidth * 0.035,
    color: "#329257",
  },
  btnContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
})