import React from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import Character from "@/app_assets/bottom_app_bar/character.svg";
import Home from "@/app_assets/bottom_app_bar/home.svg";
import Chart from "@/app_assets/bottom_app_bar/chart.svg";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const BottomAppbar = () => {
  const router = useRouter();

  return (
    <View style={styles.bottomAppBar}>
      <TouchableOpacity onPress={() => router.push("/main/character")}>
        <Character height={screenWidth * 0.065} width={screenWidth * 0.065}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/main")}>
        <Home height={screenWidth * 0.065} width={screenWidth * 0.065}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/main/chart")}>
        <Chart height={screenWidth * 0.065} width={screenWidth * 0.065}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomAppBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: screenHeight * 0.07,
    width: screenWidth * 0.8,
    backgroundColor: "white",
    borderTopLeftRadius: screenHeight * 0.05,
    borderTopRightRadius: screenHeight * 0.05,
    borderBottomRightRadius: screenHeight * 0.05,
    borderBottomLeftRadius: screenHeight * 0.05,
    // shadow at ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
  },
});
