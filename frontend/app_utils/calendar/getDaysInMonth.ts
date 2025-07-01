// 해당 월의 마지막 날짜 반환 (1월: 31, 2월: 28 or 29, 3월: 31, ...)
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}