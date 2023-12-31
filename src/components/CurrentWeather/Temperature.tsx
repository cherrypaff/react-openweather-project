import React from "react"
import { TempWrapper, MeasureTypeWrapper, Divider } from "components/CurrentWeather/wrappers"
import { Icons } from "components/CurrentWeather/Icons"
import { mainTheme } from "theme"

interface TemperatureProps {
  value: {
      celsius: number
      fahrenheit: number
  }
  isFahrenheit?: boolean
  changeTempMeasure: (arg: "fahrenheit" | "celcius") => void
}

export const Temperature: React.FC<TemperatureProps> = (props) => {
  const value = props.isFahrenheit ? props.value.fahrenheit : props.value.celsius
  const tempIcon = value > 0 ? "+" : ""
  const viewedValue = value === 0 ? value : `${tempIcon}${value}`

  return (
    <TempWrapper>
      {viewedValue}
      <MeasureTypeWrapper>
        <Icons onClick={() => props.changeTempMeasure("celcius")} fill={props.isFahrenheit ? mainTheme.grayColor : "black"} name={"celsius"} />
        <Divider />
        <Icons onClick={() => props.changeTempMeasure("fahrenheit")} fill={props.isFahrenheit ? "black" : mainTheme.grayColor} name={"fahrenheit"} />
      </MeasureTypeWrapper>
    </TempWrapper>
  )
}