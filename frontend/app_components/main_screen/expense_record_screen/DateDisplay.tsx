import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export function DateDisplay() {
  const { day, month, weekday } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.dateText1}>{month}월 {day}일</Text>
      <Text style={styles.dateText2}>{weekday}요일</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: screenWidth * 0.03,
  },
  dateText1: {
    textAlign: "center",
    fontSize: screenWidth * 0.07,
    fontWeight: "bold",
    color: "#329257"
  },
  dateText2: {
    textAlign: "center",
    fontSize: screenWidth * 0.07,
    color: "#329257"
  },
})