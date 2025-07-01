// 해당 월의 1일이 무슨 요일인지 반환 (일:0 .. 토:6)
export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month - 1, 1).getDay();
}