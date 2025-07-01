import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Skin from "@/app_assets/customizing_screen/skin.svg"
import Cloth from "@/app_assets/customizing_screen/cloth.svg"
import Accessory from "@/app_assets/customizing_screen/accessory.svg"

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export function CustomizingBar() {
  return (
    <View style={styles.customizingBar}>
      <TouchableOpacity>
        <Skin height={screenWidth * 0.083} width={screenWidth * 0.083}/>
      </TouchableOpacity>
      <TouchableOpacity>
        <Cloth height={screenWidth * 0.08} width={screenWidth * 0.08}/>
      </TouchableOpacity>
      <TouchableOpacity>
        <Accessory height={screenWidth * 0.08} width={screenWidth * 0.08}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  customizingBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: screenHeight * 0.08,
    width: screenWidth * 0.65,
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
  }
})