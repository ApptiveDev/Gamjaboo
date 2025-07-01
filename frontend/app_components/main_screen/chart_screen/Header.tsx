import React, { Dispatch, SetStateAction } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import ArrowBack from "@/app_assets/chart_screen/arrow_back.svg";
import Calendar from "@/app_assets/chart_screen/calendar.svg";

interface typeOfProps {
  isExpenditure: boolean;
  setIsExpenditure: Dispatch<SetStateAction<boolean>>;
  setShowChart: Dispatch<SetStateAction<boolean>>;
  chartAnimation: () => () => void;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const Header = ({
  isExpenditure,
  setIsExpenditure,
  setShowChart,
  chartAnimation,
}: typeOfProps) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.push("/main")}
        style={styles.homeButton}
      >
        <ArrowBack
          fill="#007AFF"
          height={screenWidth * 0.06}
          width={screenWidth * 0.06}
        />
        <Text style={styles.homeButtonText}>Home</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            setIsExpenditure(true);
            setShowChart(false);
            setTimeout(() => {
              chartAnimation();
            }, 0);
          }}
          style={
            isExpenditure
              ? { ...styles.on, marginRight: screenWidth * 0.01 }
              : { ...styles.off, marginRight: screenWidth * 0.01 }
          }
        >
          <Text style={isExpenditure ? styles.onText : styles.offText}>
            지출
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsExpenditure(false);
            setShowChart(false);
            setTimeout(() => {
              chartAnimation();
            }, 0);
          }}
          style={
            isExpenditure
              ? { ...styles.off, marginLeft: screenWidth * 0.01 }
              : { ...styles.on, marginLeft: screenWidth * 0.01 }
          }
        >
          <Text style={isExpenditure ? styles.offText : styles.onText}>
            소득
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.calendarButton}>
        <Calendar
          fill="#FFFFFF"
          height={screenWidth * 0.08}
          width={screenWidth * 0.08}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight * 0.1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  homeButton: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
    padding: screenWidth * 0.015,
    marginLeft: screenWidth * 0.01,
  },
  homeButtonText: {
    fontSize: 18,
    fontWeight: "400",
    color: "#007AFF",
  },
  on: {
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth * 0.18,
    height: screenHeight * 0.036,
    borderRadius: screenHeight * 0.018,
    backgroundColor: "#6AD780",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84, // ios 그림자 효과
    elevation: 6, // 안드로이드 그림자 효과
  },
  off: {
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth * 0.18,
    height: screenHeight * 0.036,
    borderRadius: screenHeight * 0.018,
    backgroundColor: "#FCFFF6",
  },
  onText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  offText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#329257",
  },
  calendarButton: {
    position: "absolute",
    width: screenWidth * 0.14,
    height: screenWidth * 0.14,
    borderRadius: screenWidth * 0.07,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#75E88C",
    top: screenWidth * 0.025,
    right: screenWidth * 0.05,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84, // ios 그림자 효과
    elevation: 6, // 안드로이드 그림자 효과
  },
});
