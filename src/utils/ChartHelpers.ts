import { type ChartOptions, type ChartData, type ChartType } from 'chart.js'

function GenerateOptions<T extends ChartType = ChartType>(titleText: string): ChartOptions<T> {
  return {
    responsive: true,
    plugins: {
      legend: {  position: 'top' },
      title: {
        display: true,
        text: titleText,
        position: 'bottom',
        font: { size: 14, weight: 'bold', family: "'Be Vietnam Pro', sans-serif" },
        color: 'black',
      },
    },
  } as ChartOptions<T>
}

function GenerateData<T extends ChartType = ChartType>(
  labels: string[],
  label: string,
  data: number[],
  backgroundColor?: string,
): ChartData<T> {
  return {
    labels,
    datasets: [{ label, data, backgroundColor } as never],
  } as ChartData<T>
}

export { GenerateOptions, GenerateData }