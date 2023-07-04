import { config } from "../config"
import { request } from "./network"
import { CityWeatherAPIType } from "./types"

export const getMyLocationName = (position: GeolocationPosition, language: string) =>
    request<{name: string; sys:{ id: number; country: string }; error: boolean}>(`${config.REACT_APP_OPEN_WEATHER_API_URL}/weather/?lat=${position.coords.latitude}&lon=${position.coords.longitude}&lang=${language}&appid=${config.REACT_APP_WEATHER_API_KEY}`)

export const getCityWeatherStats = (city: string, language: string) =>
    request<CityWeatherAPIType & {error: boolean}>(`${config.REACT_APP_OPEN_WEATHER_API_URL}/forecast?q=${city}&lang=${language}&appid=${config.REACT_APP_WEATHER_API_KEY}`)
