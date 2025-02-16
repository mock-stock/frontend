export const getPriceColor = (price: number) => {
  if (price > 0) return "positive"; //상승
  if (price < 0) return "negative"; //하락
  return "neutral"; // 기본
};
