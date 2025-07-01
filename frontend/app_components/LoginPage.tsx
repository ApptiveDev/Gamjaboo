import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Gam from "@/app_assets/gam.svg";
import Ja from "@/app_assets/ja.svg";
import Boo from "@/app_assets/boo.svg";
import Grass from "@/app_assets/grass.svg";
import Sprout from "@/app_assets/sprout.svg";
import KakaoTalk from "@/app_assets/kakaoTalk.svg";
import RottenGamja from "@/app_assets/rottenGamja.svg";
import BasicGamja from "@/app_assets/basicGamja.svg";
import ExcitedGamja from "@/app_assets/excitedGamja.svg";
import Book from "@/app_assets/book.svg";


const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export function LoginPage() {
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <View style={{ left: screenWidth * 0.17 }}>
          <Sprout />
        </View>
        <View style={styles.name}>
          <Gam />
          <Ja />
          <Boo />
        </View>
        <Grass />
      </View>

      <TouchableOpacity style={styles.kakao}>
        <KakaoTalk />
        <Text style={styles.kakaoText}>카카오톡으로 로그인</Text>
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.text1}>차곡차곡, 감자처럼 모아요</Text>
        <Text style={styles.text2}>감쟈부</Text>
      </View>

      <View style={[styles.contiContainer, { top: 0, left: 0 }]}>
        <RottenGamja width={screenWidth * 0.2} height={screenHeight * 0.09} />
      </View>
      <View style={[styles.contiContainer, { top: -screenHeight * 0.015, right: 0 }]}>
        <BasicGamja width={screenWidth * 0.2} height={screenHeight * 0.11} />
      </View>
      <View style={[styles.contiContainer, { top: screenHeight * 0.38, left: 0 }]}>
        <ExcitedGamja width={screenWidth * 0.2} height={screenHeight * 0.12} />
      </View>
      <View style={[styles.contiContainer, { top: screenHeight * 0.4, right: -screenWidth * 0.02 }]}>
        <RottenGamja width={screenWidth * 0.2} height={screenHeight * 0.09} />
      </View>
      <View style={[styles.contiContainer, { bottom: -screenHeight * 0.035, left: -screenWidth * 0.05 }]}>
        <Book width={screenWidth * 0.23} height={screenHeight * 0.11} />
      </View>
      <View style={[styles.contiContainer, { bottom: -screenHeight * 0.02, right: -screenWidth * 0.06 }]}>
        <ExcitedGamja width={screenWidth * 0.2} height={screenHeight * 0.12} />
      </View>
      <View style={[styles.contiContainer, { top: screenHeight * 0.6 }]}>
        <BasicGamja width={screenWidth * 0.2} height={screenHeight * 0.11} />
      </View>
      <View style={[styles.contiContainer, { bottom: screenHeight * 0.7 }]}>
        <Book width={screenWidth * 0.23} height={screenHeight * 0.11} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  nameContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    flexDirection: "row",
  },
  kakao: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: screenHeight * 0.02,
    width: screenWidth * 0.6,
    top: screenHeight * 0.24,
    borderRadius: screenWidth / 2,
    backgroundColor: "#FFF942",
    gap: screenWidth * 0.05,
    // shadow at ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
  },
  kakaoText: {
    fontSize: screenWidth * 0.035,
    fontWeight: "bold",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    top: screenHeight * 0.27,
    gap: screenWidth * 0.02,
  },
  text1: {
    color: "#fff",
    fontSize: screenWidth * 0.04,
  },
  text2: {
    color: "#fff",
    fontSize: screenWidth * 0.04,
    fontWeight: "bold",
  },
  contiContainer: {
    position: "absolute",
  },
})