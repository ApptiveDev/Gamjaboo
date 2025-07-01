import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { CustomizingBar } from "@/app_components/main_screen/character_screen/customizing_screen/CustomizingBar";
import { PurchaseBtn } from "@/app_components/main_screen/character_screen/customizing_screen/PurchaseBtn";
import { Gamdoring } from "@/app_components/main_screen/character_screen/customizing_screen/Gamdoring";
import { ChooseCloth } from "@/app_components/main_screen/character_screen/customizing_screen/ChooseCloth";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function CustomizingScreen() {
  return (
    <View style={styles.container}>

      { /* 감도링 개수 / 받아오는 로직 구현 해야함 */}
      <View style={styles.coinContainer}>
        <Gamdoring />
      </View>

      {/* 캐릭터를 나타낼 박스 */}
      <View style={styles.characterBox} />

      { /* 커스터마이징 바 */}
      <View style={styles.customizingBarContainer}>
        <CustomizingBar />
      </View>

      {/* 코스튭을 보여주는 컨테이너 박스 */}
      <View style={styles.clothContainer}>
        <ChooseCloth />
      </View>


      {/* 화면 가운데 십자선 가이드 라인: x축 */}
      <View
        style={{
          position: "absolute",
          top: screenHeight / 2,
          left: 0,
          width: screenWidth,
          height: 1,
          backgroundColor: "red",
          zIndex: 3,
        }}
      />
      {/* 화면 가운데 십자선 가이드 라인: y축 */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: screenWidth / 2,
          width: 1,
          height: screenHeight,
          backgroundColor: "red",
          zIndex: 3,
        }}
      />

      {/* 구매하기 버튼 */}
      <View style={styles.purchaseBtnContainer}>
        <PurchaseBtn />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFFF6",
    justifyContent: "space-between",
    alignItems: "center",
  },
  coinContainer: {
    position: "absolute",
    left: screenWidth * 0.05,
    top: screenHeight * 0.03,
    width: screenWidth * 0.15,
  },
  characterBox: {
    width: screenWidth * 0.57,
    height: screenWidth * 0.57,
    top: screenHeight * 0.13,
    backgroundColor: "#aaa",
  },
  customizingBarContainer: {
    position: "absolute",
    bottom: screenHeight * 0.46,
  },
  clothContainer: {
    position: "absolute",
    bottom: 0,
  },
  purchaseBtnContainer: {
    bottom: screenHeight * 0.08,
  },
}) 