import { useState } from "react";
import { View, StatusBar, TouchableOpacity, StyleSheet, Dimensions, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import MyPageBtn from "@/app_assets/main_screen/myPageBtn.svg";
import CalendarBtn from "@/app_assets/main_screen/calendarBtn.svg";
import { ShowMonth } from "@/app_components/main_screen/ShowMonth";
import { CalendarWheel } from "@/app_components/main_screen/CalendarWheel";
import { CustomCalendarGrid } from "@/app_components/main_screen/CustomCalendarGrid";
import { generateCalendarGrid } from "@/app_utils/calendar/generateCalendarGrid";
import { DailyBudget } from "@/app_components/main_screen/DailyBudget";
import { ExpenseBar } from "@/app_components/main_screen/ExpenseBar";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function MainScreen() {
  const router = useRouter();

  const today = new Date();
  console.log(today.getMonth());
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth ] = useState(today.getMonth() + 1);
  const rows = generateCalendarGrid(selectedYear, selectedMonth);

  return (
    <View style={styles.container}>
      {/* 고정 뷰 */}
      <View style={styles.fixedContainer}>
        {/* 마이페이지 버튼 */}
        <TouchableOpacity 
          style={styles.mypageBtn}
          onPress={() => router.push("/main/my_page")}>
          <MyPageBtn width={ screenWidth * 0.14 } height={ screenHeight * 0.14 }/>
        </TouchableOpacity>

        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        { /* 전체적인 달력 관련 요소들 */}
        <View style={styles.calendar}>

          <TouchableOpacity 
            style={styles.calendarBtn}
            onPress={() => setModalVisible(true)}
          >
            <CalendarBtn width={ screenWidth * 0.14 } height={ screenHeight * 0.14 }/>
          </TouchableOpacity>

          <View style={styles.showContainer}>
            <ShowMonth selectedMonth={selectedMonth}/>
          </View>

          <CalendarWheel
            visible={modalVisible}
            selectedMonth={selectedMonth}
            onSelect={(month) => {
              setSelectedMonth(month);
              setModalVisible(false);
            }}
            onClose={() => setModalVisible(false)}
          />
          <View style={styles.gridContainer}>
            <CustomCalendarGrid rows={rows} selectedMonth={selectedMonth} />
          </View>
        </View>
      </View>

      {/* 뷰를 올려줌 */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
        style={styles.avoidContainer}
        keyboardVerticalOffset={0}
      >
        { /* 하루 예산을 책정하는 바 */}
        <View style={styles.dailyBudgetContainer}>
          <DailyBudget />
        </View>

        {/* 지출을 표시하는 바 */}
        <View style={styles.expenseBarContainer}>
          <ExpenseBar today={50000} compare={3000} balance={100000}/>
        </View>
      </KeyboardAvoidingView>

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
  fixedContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  avoidContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
  },
  mypageBtn: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: screenHeight * 0.02,
    right: screenWidth * 0.19,
    width: screenWidth * 0.12,
    height: screenHeight * 0.06,
    borderRadius: screenWidth,
    zIndex: 3,
    // shadow at ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
  },
  calendarBtn: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: screenHeight * 0.02,
    right: screenWidth * 0.04,
    width: screenWidth * 0.12,
    height: screenHeight * 0.06,
    borderRadius: screenWidth,
    zIndex: 3,
    // shadow at ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
  },
  text: {
    fontSize: screenWidth * 0.075,
    fontWeight: "bold",
  },
  calendar: {
    width: screenWidth,
    height: screenHeight,
    alignItems: "center",
  },
  showContainer: {
    alignItems: "center",
    height: screenHeight * 0.06,
    top: screenHeight * 0.09,
  },
  gridContainer: {
    alignItems: "center",
    justifyContent: "center",
    top: screenHeight * 0.1,
    height: screenHeight * 0.5,
    paddingHorizontal: screenWidth * 0.1,
  },
  dailyBudgetContainer: {
    position: "absolute",
    bottom: screenHeight * 0.28,  
    height: screenHeight * 0.06,
  },
  expenseBarContainer: {
    position: "absolute",
    bottom: screenHeight * 0.19,  
  },
});