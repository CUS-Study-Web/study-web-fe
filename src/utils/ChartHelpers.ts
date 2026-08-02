import { type ChartOptions, type ChartData, type ChartType } from 'chart.js'

function resolveCSSVar(colorStr: string): string {
  if (typeof window !== 'undefined' && colorStr.startsWith('var(')) {
    const varName = colorStr.slice(4, -1).trim()
    const val = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
    return val || colorStr
  }
  return colorStr
}

function GenerateOptions<T extends ChartType = ChartType>(titleText: string): ChartOptions<T> {
  return {
    responsive: true,
    maintainAspectRatio: false,
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
  const resolvedColor = backgroundColor ? resolveCSSVar(backgroundColor) : undefined
  return {
    labels,
    datasets: [{ label, data, backgroundColor: resolvedColor } as never],
  } as ChartData<T>
}

export { GenerateOptions, GenerateData }