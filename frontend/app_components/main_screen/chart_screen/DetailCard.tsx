import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";

interface typeOfProps {
  titleText1: string;
  titleText2: string;
  color: string;
  textColor: string;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const DatailCard = ({
  titleText1,
  titleText2,
  color,
  textColor,
}: typeOfProps): JSX.Element => {
  return (
    <View style={{ ...styles.card, backgroundColor: color }}>
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          top: screenHeight * 0.03,
        }}
      >
        <Text style={{ ...styles.text1, color: textColor }}>{titleText1}</Text>
        <Text style={{ ...styles.text2, color: textColor }}>{titleText2}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth * 0.76,
    height: screenHeight * 0.28,
    marginBottom: screenHeight * 0.04,
    backgroundColor: "",
    borderRadius: screenWidth * 0.07,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84, // ios 그림자 효과
    elevation: 6, // 안드로이드 그림자 효과
  },
  text1: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  text2: {
    fontSize: 16,
    fontWeight: "400",
    color: "#FFFFFF",
  },
});
