import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackButton from "@/app_assets/expense_report_screen/write_screen/backButton.svg";
import CheckButton from "@/app_assets/expense_report_screen/write_screen/checkButton.svg";
import { UploadImage } from "@/app_components/main_screen/expense_record_screen/write_screen/UploadImage";
import { WritingBox } from "@/app_components/main_screen/expense_record_screen/write_screen/WritingBox";
import { AboutSpent } from "@/app_components/main_screen/expense_record_screen/write_screen/AboutSpent";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function WriteScreen() {
  const navigation = useNavigation();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    // 타이핑 칠 때 보기 편하게 뷰를 올려줌
    // ios, android 두 가지 버전 둘 다 지원
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "position" : "height"}
      style={styles.container}
      keyboardVerticalOffset={0}
    >
      { /* 뷰가 올라갔을 때, 스트롤도 가능하게 해줌 */ }
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        keyboardShouldPersistTaps="handled"
      >

        {/* 뒤로 가기 버튼 */}
        <View style={styles.backContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <BackButton />
          </TouchableOpacity>
        </View>

        {/* 저장하기 버튼 */}
        <View style={styles.checkContainer}>
          <TouchableOpacity style={styles.checkButton} onPress={() => navigation.goBack()}>
            <CheckButton />
          </TouchableOpacity>
        </View>

        {/* 사진 업로드 */}
        {!keyboardVisible && (
          <View style={styles.imgContainer}>
            <UploadImage image={image} setImage={setImage} />
          </View>
        )}

        {/* 소비 항목 및 금액 */}
        <View style={styles.spentContainer}>
          <AboutSpent />
        </View>

        { /* 글을 적는 공간 */}
        <View style={styles.writeBoxContainer}>
          <WritingBox />
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFFF6",
  },
  backContainer: {
    position: "absolute",
    top: screenHeight * 0.04,
    left: screenWidth * 0.08,
    zIndex: 10,
  },
  backButton: {
    marginBottom: 20,
  },
  checkContainer: {
    position: "absolute",
    top: screenHeight * 0.04,
    right: screenWidth * 0.08,
    zIndex: 10,
  },
  checkButton: {
    marginBottom: 20,
  },
  imgContainer: {
    marginTop: screenHeight * 0.11,
    width: screenWidth,
    height: screenHeight * 0.5,
    backgroundColor: "transparent",
  },
  spentContainer: {
    marginTop: screenHeight * 0.04,
    width: screenWidth * 0.8,
    height: screenHeight * 0.1,
    backgroundColor: "transparent",
  },
  writeBoxContainer: {
    marginTop: 20,
    width: screenWidth * 0.8,
    height: screenHeight * 0.15,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
});
