import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import Button from "@/app_assets/expense_report_screen/write_screen/backButton.svg"
import Memo from "@/app_assets/expense_report_screen/Memo.svg";
import { DateDisplay } from "@/app_components/main_screen/expense_record_screen//DateDisplay";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function ExpenseRecordScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* 뒤로 가기 버튼 */}
      <View style={styles.btnContainer}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}>
          <Button />
        </TouchableOpacity>
      </View>

      {/* record로 넘어감 */}
      <TouchableOpacity 
        style={styles.recordBtn}
        onPress={() => router.push("/main/expense_record/write")}>
        <Memo />
      </TouchableOpacity>


      {/* 감도리 이미지 및 텍스트 */}
      <View style={styles.viewContainer}>
        <Image
          source={require('@/assets/images/Gamja_basic.png')}
          style={styles.imageBox}
        />
        <DateDisplay />
        <Text style={styles.recordText}>오늘의 지출을 기록해요!</Text>
      </View>

      {/* 기록 저장 공간 */}
      <View style={styles.squareBox}>
        <Text>아직 기록된 지출이 없어요!</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFFF6",
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    position: "absolute",
    top: screenHeight * 0.04,
    left: screenWidth * 0.08,
  },
  backButton: {
    marginBottom: 20,
  },
  recordBtn: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: screenHeight * 0.05,
    right: screenWidth * 0.05,
    width: screenWidth * 0.14,
    height: screenHeight * 0.07,
    borderRadius: screenWidth,
    backgroundColor: "#75E88C",
    // shadow at ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
  },
  viewContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: screenHeight * 0.1,
  },
  imageBox: {
    width: screenWidth * 0.3, 
    height: screenWidth * 0.3,
    borderRadius: (screenWidth * 0.3) / 2,
    overflow: "hidden",
    marginBottom: screenHeight * 0.05,
    // shadow at ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
  },
  recordText: {
    textAlign: "center",
    marginTop: screenHeight * 0.025,
    fontSize: screenWidth * 0.04,
    fontFamily: "pretendard",
    color: "#1c482d"
  },
  squareBox: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.4,          
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: screenHeight * 0.08,
    borderRadius: (screenWidth * 0.3) / 4,
    // shadow at ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
  },
})