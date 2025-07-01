// 해당 날짜가 해당 월의 몇 번째 주인지 반환
export function getWeekOfMonth(dateString: string): number {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth(); // (1월: 0)
  const firstDayOfMonth = new Date(year, month, 1);

  const transferIndex = (d: Date) => (d.getDay() === 0 ? 7 : d.getDay());
  const transferedIndex = transferIndex(firstDayOfMonth);
  const offset = transferedIndex - 1;
  // (일:0 .. 토:6) -> (월: 0 .. 일:6)로 변경

  const day = date.getDate();
  return Math.ceil((day + offset) / 7);
}