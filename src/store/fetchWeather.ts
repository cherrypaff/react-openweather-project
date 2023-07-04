import { createAsyncThunk } from '@reduxjs/toolkit'
import { CityWeatherType } from "./reducers/weatherReducer"
import { AutocompleteType } from "./reducers/appReducer"
import { addAutoComplete, setIsLoading } from './reducers/appReducer'
import { getCityWeatherStats, getMyLocationName } from "../network/get-city-weather-stats"
import { i18n } from "../i18n/i18n"
import { namespaces } from "../i18n/constants"

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (location: {city: string; isMine?: boolean}, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    dispatch(setIsLoading(true))
    try {
      const state: any = getState()
      const res = await getCityWeatherStats(location.city, state.app.language)
      dispatch(setIsLoading(false))

      if (res.error) {
        throw {...res, city: location.city}
      } else if(state.weather.cities.some((el: CityWeatherType) => el.metaData.cityID === res.city.id)) {
        throw { message: i18n.t('message', { ns: namespaces.fetchError }), city: res.city.name}
      } else {
        const autoCompleteItem = state.app.autocomplete.find((el: AutocompleteType) => el.value === res.city.id)
        if(!location.isMine) {
            dispatch(addAutoComplete({value: res.city.id, label: `${res.city.name}, ${res.city.country}`, isFahrenheit: false }))
        }
        return {...res, isMine: location.isMine, isFahrenheit: autoCompleteItem?.isFahrenheit}
      }
    } catch(e: any) {
      dispatch(setIsLoading(false))
      return rejectWithValue({...e, city: location.city})
    }
  }
);

export const fetchMyLocationWeather = createAsyncThunk(
    'weather/fetchMyLocationWeather',
    async (position: GeolocationPosition, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
        dispatch(setIsLoading(true))
        try {
            const state: any = getState()
            const res = await getMyLocationName(position, state.app.language)
            dispatch(setIsLoading(false))

            if (res.error) {
                throw {...res, city: i18n.t('location', { ns: namespaces.fetchError })}
            } else {
                dispatch(fetchWeather({ city: res.name, isMine: true }))
            }
        } catch(e: any) {
            dispatch(setIsLoading(false))
            return rejectWithValue({...e, city: i18n.t('location', { ns: namespaces.fetchError })})
        }
    }
);
