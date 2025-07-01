import React, { RefObject, useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Vibration,
  ScrollView,
} from "react-native";
import ArrowDropDown from "@/app_assets/chart_screen/arrow_drop_down.svg";
import { WeeklyExpenses } from "@/types/WeeklyExpenses";
import { getWeeklyExpenses } from "@/app_utils/finance/getWeeklyExpenses";
import { getMonthlyExpenseTotal } from "@/app_utils/finance/getMonthlyExpenseTotal";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface typeOfProps {
  isExpenditure: boolean;
  scrollRef: RefObject<ScrollView>;
  graphVisible: boolean;
  monthOfCurrentInfo: string;
  setMonthOfCurrentInfo: React.Dispatch<React.SetStateAction<string>>;
  yearOfCurrentInfo: string;
  setYearOfCurrentInfo: React.Dispatch<React.SetStateAction<string>>;
}

type dataType = {
  month: string;
  week: number;
  expenseTotal: number;
};

const maxBarheight = screenHeight * 0.2;
const months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

export const BarGraph = ({
  isExpenditure,
  scrollRef,
  graphVisible,
  monthOfCurrentInfo,
  setMonthOfCurrentInfo,
  yearOfCurrentInfo,
  setYearOfCurrentInfo,
}: typeOfProps): JSX.Element => {
  const hasScrolledRef = useRef(false);
  const prevIndexRef = useRef(-1);
  const interval = screenWidth * 0.1325;
  const date = new Date();
  const todayYear = date.getFullYear();
  const todayMonth = date.getMonth();
  const [queue, setQueue] = useState<string[]>([]);
  useEffect(() => {
    let offset = todayMonth + 12;
    const arr: string[] = [];
    for (let i = 0; i < 12; i++) {
      const index = offset % 12;
      arr.push(months[index]);
      offset = offset - 1;
    }
    setQueue(arr);
  }, []);

  const [data, setData] = useState<dataType[]>([]);
  const [monthlyExpenseTotal, setMonthlyExpenseTotal] = useState<number[]>([]); // 월별 소비 총액
  const [monthlyDataNum, setMonthlyDataNum] = useState<number[]>([]); // 월별 주 단위 데이터 개수
  useEffect(() => {
    const getInitData = async () => {
      const dataArr: dataType[] = [];
      const dataNumArr: number[] = [0];
      const expenseTotalArr: number[] = [];
      let year = todayYear.toString();
      let sum = 0;
      for (const month of queue.slice(0, 6)) {
        const data = await getWeeklyExpenses(year, month);
        const ExpenseTotal = await getMonthlyExpenseTotal(year, month);
        expenseTotalArr.push(ExpenseTotal);
        let count = 0;
        for (let i = 6; i > 0; i--) {
          let weeklySum = 0;
          const weekNum = `week${i}` as keyof WeeklyExpenses;
          if (data[weekNum].length !== 0) {
            data[weekNum].forEach((item) => {
              weeklySum = weeklySum + item.amount;
            });
            count++;
            dataArr.push({
              month: month,
              week: i,
              expenseTotal: weeklySum,
            });
          }
        }
        sum = sum + count;
        if (dataNumArr.includes(sum - 1)) {
          dataNumArr.push(0);
        } else {
          dataNumArr.unshift(sum - 1);
        }

        if (month === "01") {
          year = (todayYear - 1).toString();
        }
      }
      setData(dataArr);
      setMonthlyDataNum(dataNumArr);
      setMonthlyExpenseTotal(expenseTotalArr);
    };
    getInitData();
  }, [queue]);

  return (
    <View
      style={[
        styles.barGraph,
        !isExpenditure && { backgroundColor: "#FCFFF6" },
      ]}
    >
      <View style={{ flexDirection: "row", marginTop: screenHeight * 0.03 }}>
        <Text style={[styles.text1, !isExpenditure && { color: "#329257" }]}>
          셋째 주에{" "}
        </Text>
        <Text style={[styles.text2, !isExpenditure && { color: "#329257" }]}>
          가장 {isExpenditure ? "지출" : "소득"}이 많았어요
        </Text>
      </View>
      <ArrowDropDown
        height={screenWidth * 0.07}
        width={screenWidth * 0.07}
        fill="#FFFFFF"
        style={styles.arrowDropDown}
      />
      {graphVisible && (
        <ScrollView
          horizontal={true}
          decelerationRate={0.9}
          snapToInterval={interval}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row-reverse",
          }}
          ref={scrollRef}
          onScroll={(e) => {
            const x = e.nativeEvent.contentOffset.x;
            const index = Math.round(x / interval);

            if (monthlyDataNum[0] >= index && index > monthlyDataNum[1]) {
              setMonthOfCurrentInfo(queue[0]);
            } else if (
              monthlyDataNum[1] >= index &&
              index > monthlyDataNum[2]
            ) {
              setMonthOfCurrentInfo(queue[1]);
            } else if (
              monthlyDataNum[2] >= index &&
              index > monthlyDataNum[3]
            ) {
              setMonthOfCurrentInfo(queue[2]);
            } else if (
              monthlyDataNum[3] >= index &&
              index > monthlyDataNum[4]
            ) {
              setMonthOfCurrentInfo(queue[3]);
            } else if (
              monthlyDataNum[4] >= index &&
              index > monthlyDataNum[5]
            ) {
              setMonthOfCurrentInfo(queue[4]);
            } else if (
              monthlyDataNum[5] >= index &&
              index > monthlyDataNum[6]
            ) {
              setMonthOfCurrentInfo(queue[5]);
            }

            if (index !== prevIndexRef.current) {
              prevIndexRef.current = index;
              Vibration.vibrate(10); // 10ms 짧은 진동
            }
          }}
          onContentSizeChange={() => {
            if (!hasScrolledRef.current) {
              scrollRef.current?.scrollToEnd({ animated: false });
              hasScrolledRef.current = true;
            }
          }}
          style={{ width: screenWidth * 0.6, opacity: graphVisible ? 1 : 0 }}
        >
          {data.map((item, index) => {
            const ratio =
              item.expenseTotal /
              monthlyExpenseTotal[queue.indexOf(item.month)];
            let text = "";

            if (item.week !== 1) {
              text = `W.${item.week}`;
            } else {
              const m = parseInt(item.month);
              text = `${m}월`;
            }

            return (
              <View
                key={index}
                style={{
                  height: screenHeight * 0.15,
                  marginBottom: 0,
                  marginLeft:
                    index === data.length - 1
                      ? interval * 2
                      : screenWidth * 0.0625,
                  marginRight: index === 0 ? interval * 2 : 0,
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    ...styles.bar,
                    backgroundColor: isExpenditure ? "#FFFFFF" : "#3EC070",
                    height: maxBarheight * ratio,
                  }}
                />
                <View
                  style={{
                    marginTop: screenHeight * 0.01,
                    width: screenWidth * 0.07,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ color: isExpenditure ? "#FFFFFF" : "#3EC070" }}
                  >
                    {text}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  barGraph: {
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth * 0.76,
    height: screenHeight * 0.28,
    marginTop: screenHeight * 0.02,
    backgroundColor: "#75E88C",
    borderRadius: screenWidth * 0.07,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84, // ios 그림자 효과
    elevation: 6, // 안드로이드 그림자 효과
  },
  arrowDropDown: {
    position: "absolute",
    top: screenHeight * 0.07,
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
  bar: {
    width: screenWidth * 0.03,
    borderTopRightRadius: screenWidth * 0.03,
    borderTopLeftRadius: screenWidth * 0.03,
  },
});
