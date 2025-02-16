export const formatNumberWithSign = (num: number) =>
  `${num > 0 ? "+" : ""}${formatNumberToKoreanLocale(num)}`;

export const formatNumberToKoreanLocale = (num: number) => {
  return num.toLocaleString("ko-KR");
};
