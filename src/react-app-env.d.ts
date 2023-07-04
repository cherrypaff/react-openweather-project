/// <reference types="react-scripts" />
declare module "chart.js" {
    type DataType = string | number | null
    const Chart: (a: HTMLCanvasElement, b: {
        type: "line" | "bar"
        data: {
            labels: string[]
            datasets: {
                data: DataType[]
                label: string
                borderColor: string
                fill: boolean
            }[]
        }
        options?: any
    }) => void
    export default Chart
}