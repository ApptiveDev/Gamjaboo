import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface Props {
  today: number;
  compare: number;
  balance: number;
}

export function ExpenseBar({ today, compare, balance}: Readonly<Props>) {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.text}>오늘 지출</Text>
        <Text style={styles.amount}>{today.toLocaleString()}</Text>
      </View>

      <View style={styles.separator} />
      
      <View style={styles.item}>
        <Text style={styles.text}>예산 대비 지출</Text>
        <Text style={styles.amount}>{compare.toLocaleString()}</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.item}>
        <Text style={styles.text}>잔액</Text>
        <Text style={styles.amount}>{balance.toLocaleString()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: screenWidth * 0.8,
    backgroundColor: "#75E88C",
    borderRadius: screenWidth * 0.15,
    paddingVertical: screenHeight * 0.017,
    paddingHorizontal: screenWidth * 0.05,
    marginHorizontal: screenWidth * 0.125,
    // shadow at ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
  },
  item: {
    alignItems: "center",
    flex: 1
  },
  text: {
    fontSize: screenWidth * 0.03,
    color: "#329257",
    marginBottom: screenHeight * 0.004,
  },
  amount: {
    fontSize: screenWidth * 0.037,
    color: "#fff",
    fontWeight: "bold"
  },
  separator: {
    width: screenWidth * 0.002,
    height: "100%",
    backgroundColor: "#fff",
    marginHorizontal: screenWidth * 0.033,
  },
});