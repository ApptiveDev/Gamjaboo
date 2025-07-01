import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";

interface data {
  memo: string;
  amount: number;
  color: string;
}

interface typeOfProps {
  coloredData: data[];
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const PieChartCategory = ({ coloredData }: typeOfProps): JSX.Element => {
  const COLORS = [
    "#FFFFE5",
    "#F7FCB9",
    "#D9F0A3",
    "#ADDD8E",
    "#78C679",
    "#41AB5D",
  ];

  return (
    <View style={styles.container}>
      {coloredData[0] !== undefined && (
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            alignItems: "center",
            left: screenWidth * 0.25,
          }}
        >
          <View style={{ ...styles.sticker, backgroundColor: COLORS[0] }} />
          <Text style={styles.text}>{coloredData[0].memo}</Text>
        </View>
      )}
      {coloredData[1] !== undefined && (
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            alignItems: "center",
            left: screenWidth * 0.46,
          }}
        >
          <View style={{ ...styles.sticker, backgroundColor: COLORS[1] }} />
          <Text style={styles.text}>{coloredData[1].memo}</Text>
        </View>
      )}
      {coloredData[2] !== undefined && (
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            alignItems: "center",
            left: screenWidth * 0.65,
          }}
        >
          <View style={{ ...styles.sticker, backgroundColor: COLORS[2] }} />
          <Text style={styles.text}>{coloredData[2].memo}</Text>
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          top: screenHeight * 0.03,
        }}
      >
        {coloredData[3] !== undefined && (
          <View
            style={{
              flexDirection: "row",
              position: "absolute",
              alignItems: "center",
              left: screenWidth * 0.25,
            }}
          >
            <View style={{ ...styles.sticker, backgroundColor: COLORS[3] }} />
            <Text style={styles.text}>{coloredData[3].memo}</Text>
          </View>
        )}
        {coloredData[4] !== undefined && (
          <View
            style={{
              flexDirection: "row",
              position: "absolute",
              alignItems: "center",
              left: screenWidth * 0.46,
            }}
          >
            <View style={{ ...styles.sticker, backgroundColor: COLORS[4] }} />
            <Text style={styles.text}>{coloredData[4].memo}</Text>
          </View>
        )}
        {coloredData[5] !== undefined && (
          <View
            style={{
              flexDirection: "row",
              position: "absolute",
              alignItems: "center",
              left: screenWidth * 0.65,
            }}
          >
            <View style={{ ...styles.sticker, backgroundColor: COLORS[5] }} />
            <Text style={styles.text}>{coloredData[5].memo}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: screenWidth,
    height: screenHeight * 0.06,
  },
  text: {
    marginLeft: screenWidth * 0.02,
  },
  sticker: {
    width: screenWidth * 0.02,
    height: screenWidth * 0.02,
    borderRadius: screenWidth * 0.01,
  },
});
