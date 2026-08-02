import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'
import { GenerateOptions, GenerateData } from '../utils/ChartHelpers'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

type ChartProps = {
  title: string
  label: string
  labels: string[]
  data: number[]
  color?: string
}

const BarChart = ({ title, label, labels, data, color = 'var(--text-primary)' }: ChartProps) => (
  <Bar options={GenerateOptions(title)} data={GenerateData(labels, label, data, color)} />
)

const LineChart = ({ title, label, labels, data, color = 'var(--text-primary)' }: ChartProps) => (
  <Line options={GenerateOptions(title)} data={GenerateData(labels, label, data, color)} />
)

export { BarChart, LineChart }
