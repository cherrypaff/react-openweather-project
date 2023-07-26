import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Header } from "components/Header/Header"
import { Spinner } from "components/Spinner/Spinner"
import { CityWeatherCard } from "components/CurrentWeather/CityCard"
import { Toasts } from "components/Toasts/Toasts"
import { AppStore } from "store/store"
import { HomePageContainer, LanguageContainer, CityCardsContainer } from "pages/wrappers"
import { SelectDropdown } from "components/DropDown/DropdownItem"
import { changeLanguage } from "store/reducers/appReducer"
import { i18n } from "i18n/i18n"

export const Home = () => {
  const { language, isLoading, cities } = useSelector((store: AppStore) => ({
    language: store.app.language,
    isLoading: store.app.isLoading,
    cities: store.weather.cities
  }))
  const dispatch = useDispatch()
  const languageOptions = [
    {
      value: "EN",
      label: "EN"
    },
    {
      value: "RU",
      label: "RU"
    },
    {
      value: "UA",
      label: "UA"
    }
  ]

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang).then(() => {
      dispatch(changeLanguage(lang))
    })
  }

  return (
    <HomePageContainer>
      <Toasts />
      <LanguageContainer>
        <SelectDropdown options={languageOptions} value={language} onChange={val => changeLang(val)} />
      </LanguageContainer>
      {isLoading && <Spinner />}
      <Header />
      <CityCardsContainer>
        {cities.map((city, i) => {
          return <CityWeatherCard key={i} index={i} city={city} />
        })}
      </CityCardsContainer>
    </HomePageContainer>
  )
}