export const formatNumberWithSign = (num: number) => {
  if (num > 0) {
    return `+${num}`;
  } else {
    return `${num}`;
  }
};

export const formatNumberToKoreanLocale = (num: number) => {
  return num.toLocaleString("ko-KR");
};
