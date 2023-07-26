import React, { useEffect } from "react"
import { ThemeProvider } from "styled-components"
import { GlobalStyles } from "app.styled"
import { Home } from "pages/Home"
import { mainTheme } from "theme"
import { useDispatch, useSelector } from "react-redux"
import { addToast } from "store/reducers/appReducer"
import { AppStore } from "store/store"
import { i18n } from "i18n/i18n"
import { fetchMyLocationWeather } from "store/fetchWeather"
import dayjs from "dayjs"
import "dayjs/locale/ru"
import "dayjs/locale/en"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(utc)
dayjs.extend(timezone)
// dayjs.locale(JSON.parse(localStorage.getItem('language') as string)?.toLowerCase() || 'en',)

const App: React.FC = () => {
  const { language } = useSelector((store: AppStore) => ({
    language: store.app.language,
  }))
  const dispatch = useDispatch()

  const showPosition = (position: GeolocationPosition) => {
    dispatch(fetchMyLocationWeather(position))
  }

  useEffect(() => {
    // i18n.changeLanguage(language).then(() => dayjs.locale(language))
    i18n.changeLanguage(language)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
    } else {
      dispatch(addToast("Geolocation is not supported by this browser."))
    }
  }, [])

  return (
    <ThemeProvider theme={mainTheme}>
      <GlobalStyles />
      <Home />
    </ThemeProvider>
  )
}

export default App
