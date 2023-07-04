import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { ISOdate } from "../../network/types"
import { fetchWeather, fetchMyLocationWeather } from '../fetchWeather'
import { celciusToFahrenheit } from "../../utils/unitConversion"
import dayjs from "dayjs"
import {AutocompleteType} from "./appReducer";

export type CityWeatherType = {
    metaData: {
        isPositive: boolean
        isFahrenheit: boolean
        cityID: number
        temperatureCelsius: number
        temperatureFahrenheit: number
        temperatureFeelsLikeCelsius: number
        temperatureFeelsLikeFahrenheit: number
        windSpeed: number
        icon: string
        location: string
        timezone: number
        humidity: number
        pressure: number
        todayDate: ISOdate
        weatherDescription: string
        isMine?: boolean
    }
    graphData: {
        date: ISOdate
        celsius: number
        fahrenheit: number
    }[]
}

const initialState: { cities: CityWeatherType[] } = {
    cities: []
}

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
      changeTempMeasure: (state: {cities: CityWeatherType[] }, action: PayloadAction<{id: number; index: number; isMine?: boolean}>) => {
          if (!action.payload.isMine) {
              const autoCompleteItems = JSON.parse(localStorage.getItem('autocomplete') as string)
              const itemToChange = autoCompleteItems.findIndex((el: AutocompleteType) => el.value === action.payload.id)
              autoCompleteItems[itemToChange] = {...autoCompleteItems[itemToChange], isFahrenheit: !autoCompleteItems[itemToChange].isFahrenheit}
              localStorage.setItem('autocomplete', JSON.stringify(autoCompleteItems))
          }
          state.cities[action.payload.index].metaData.isFahrenheit = !state.cities[action.payload.index].metaData.isFahrenheit
      },
      deleteCityCard: (state: {cities: CityWeatherType[] }, action: PayloadAction<{index: number}>) => {
          state.cities.splice(action.payload.index, 1)
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.fulfilled, (state, action) => {
        if(action.payload) {
            const oldState = state.cities
            let transFormedData: CityWeatherType = {
                graphData: [],
                metaData: {
                    isPositive: true,
                    isFahrenheit: true,
                    cityID: 0,
                    timezone: 0,
                    temperatureCelsius: 0,
                    temperatureFahrenheit: 0,
                    temperatureFeelsLikeCelsius: 0,
                    temperatureFeelsLikeFahrenheit: 0,
                    windSpeed: 0,
                    icon: '',
                    location: '',
                    humidity: 0,
                    pressure: 0,
                    todayDate: '',
                    weatherDescription: ''
                }
            }
            action.payload.list.forEach((el, i) => {
                if (i === 0) {
                    const isMine = !!action.payload.isMine
                    const myLocationMeasureIsFahrenheit = JSON.parse(localStorage.getItem('myLocationMeasureUnit') as string)
                    const timezone = action.payload.city.timezone
                    const currentTimeData = action.payload.list[0]
                    const isFahrenheit = isMine ? myLocationMeasureIsFahrenheit : action.payload.isFahrenheit
                    const cityID = action.payload.city.id
                    const temperatureCelsius = Math.round(currentTimeData.main.temp - 273)
                    const isPositive = temperatureCelsius >= 0
                    const temperatureFahrenheit = celciusToFahrenheit(temperatureCelsius)
                    const temperatureFeelsLikeCelsius = Math.round(currentTimeData.main.temp - 273)
                    const temperatureFeelsLikeFahrenheit = celciusToFahrenheit(temperatureFeelsLikeCelsius)
                    const windSpeed = Math.round(currentTimeData.wind.speed)
                    const icon = currentTimeData.weather[0].icon
                    const location = `${action.payload.city.name}, ${action.payload.city.country}`
                    const humidity = el.main.humidity
                    const pressure = el.main.pressure
                    const todayDate = new window.Date((new window.Date().getTime())+timezone*1000).toISOString()
                    const weatherDescription = currentTimeData.weather[0].description
                    transFormedData.metaData = {
                        isMine,
                        timezone,
                        weatherDescription,
                        isFahrenheit,
                        isPositive,
                        cityID,
                        temperatureCelsius,
                        temperatureFahrenheit,
                        temperatureFeelsLikeCelsius,
                        temperatureFeelsLikeFahrenheit,
                        windSpeed,
                        icon,
                        location,
                        humidity,
                        pressure,
                        todayDate,
                    }
                }
                if (i % 8 === 0) {
                    const date = dayjs(el.dt_txt).format('DD.MM')
                    // const date = el.dt_txt
                    const celsius = Math.round(el.main.temp - 273)
                    const fahrenheit = celciusToFahrenheit(celsius)
                    transFormedData.graphData.push({ date, celsius, fahrenheit })
                }
            })
            state.cities = [...oldState, transFormedData]
        }
      })
      .addCase(fetchWeather.rejected, (state, action: any) => {
        alert(`${action.payload.message} (${action.payload.city} )`)
      })
      .addCase(fetchMyLocationWeather.rejected, (state, action: any) => {
        alert(`${action.payload.message} (${action.payload.city} )`)
      });
  },
});

export const { changeTempMeasure, deleteCityCard } = weatherSlice.actions;
export default weatherSlice.reducer;
