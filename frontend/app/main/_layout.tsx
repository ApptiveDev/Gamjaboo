import { useEffect, useState } from "react";
import { View, StyleSheet, BackHandler, Alert, Dimensions, Keyboard } from "react-native";
import { Stack, useRouter, useSegments } from "expo-router";
import { BottomAppbar } from "@/app_components/main_screen/BottomAppbar"

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function Layout() {
  const router = useRouter();
  const segments = useSegments();
  const currentRoute = `/${segments.join("/")}`;
  const LayoutRoute = [
    "/main",
    "/main/character",
    "/main/chart",
  ]
  const isLayoutRoute = LayoutRoute.includes(currentRoute);

  console.log("현재 경로", segments);
  console.log("현재 경로", currentRoute);

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);


  // (안드로이드 전용)
  useEffect(() => {
    const backAction = () => {
      if (currentRoute === "/main") {
        // 홈 화면일 때, 앱 종료
        Alert.alert("앱 종료", "앱을 종료하시겠습니까?", [
          { text: "취소", style: "cancel" },
          { text: "확인", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      } else {
        // 다른 화면일 때, 홈으로 이동
        router.push("/main");
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
    // 컴포넌트 언마운트 시 (앱 종료 시) 함수가 정의된 메모리 해제
    // useEffect의 return은 useEffect가 정의된 컴포넌트가 언마운트될 시 실행된다.
  }, [segments]);

  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }} />
      {isLayoutRoute && !keyboardVisible && (
        <View style={styles.bottomAppbarContainer}>
          <BottomAppbar />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomAppbarContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    bottom: screenHeight * 0.04,
    backgroundColor: "transparent",
  },
});
