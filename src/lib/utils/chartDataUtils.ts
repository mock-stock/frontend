import { StockKisHistoryDto } from "@/generate/data-contracts";

/**
 * 특정 키에 해당하는 값을 추출하여 배열로 반환합니다.
 * @param {StockKisHistoryDto[]} dataArray - ChartData 객체의 배열
 * @param {T} key - 추출할 속성의 키
 * @returns {StockKisHistoryDto[T][]} - 주어진 키에 해당하는 값의 배열
 */

export const dataToArray = <T extends keyof StockKisHistoryDto>(
  dataArray: StockKisHistoryDto[],
  key: T
): StockKisHistoryDto[T][] => {
  return dataArray.map((item) => item[key]).reverse();
};

// 차트 치수 계산
export function calculateChartDimensions(
  width: number,
  height: number,
  dataLength: number
) {
  const SVG_CHART_WIDTH = typeof width === "number" ? width : 0;
  const SVG_CHART_HEIGHT = typeof height === "number" ? height * 0.4 : 0;

  const sidePadding = 16; //차트 좌우 여백
  const xAxisLength = SVG_CHART_WIDTH - 2 * sidePadding; // 실제 x축의 길이
  const yAxisLength = SVG_CHART_HEIGHT * 0.94; //실제 y축의 길이

  const plotWidth = Math.min(xAxisLength / dataLength, 20); //차트나 그래프에서 데이터를 시각적으로 표현하는 영역 의 넓이

  return {
    SVG_CHART_WIDTH,
    SVG_CHART_HEIGHT,
    xAxisLength,
    yAxisLength,
    sidePadding,
    plotWidth,
  };
}

//차트 데이터 Y축  계산
export function calculateYAxisBounds(max: number[], min: number[]) {
  const dataYMax = Math.max(...max) * 1.1; // 차트의 Y축에서 데이터의 최대 높이를 나타내며, 가장 높은 주가를 의미
  const dataYMin = Math.min(...min) * 0.9; // 차트의 Y축에서 데이터의 최소 높이를 나타내며, 가장 낮은 주가를 의미
  return { dataYMax, dataYMin };
}
