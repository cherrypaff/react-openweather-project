import React, {useEffect, useRef, useState} from "react"
import {
  HeaderContainer,
  SearchInput,
  AutoCompletionItem,
  AutoCompletion,
  AddButton,
  SearchElement
} from "components/Header/wrappers"
import { useDispatch, useSelector } from "react-redux"
import { AppStore } from "store/store"
// import { DebounceInput } from "react-debounce-input";
import { fetchWeather } from "store/fetchWeather"
import { useClickOutside } from "hooks/use-click-outside"
import { useTranslation } from "react-i18next"
import { namespaces } from "i18n/constants"
import { AutocompleteType } from "store/reducers/appReducer"

export const Header: React.FC = () => {
  const { autocomplete } = useSelector((store: AppStore) => ({
    autocomplete: store.app.autocomplete,
  }))
  const { t } = useTranslation(namespaces.pages.home)
  const dispatch = useDispatch()
  const suggestionRef = useRef(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [city, setCity] = useState("")
  const activeCityRef = useRef<string>("")

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 13) {
        onAddButtonClick()
      }
    })
  }, [])


  useEffect(() => {
    activeCityRef.current = city
    if (city) {
      setShowSuggestions(true)
    }
  }, [city])

  const onSearchInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value)
  }

  const onAddButtonClick = () => {
    if (activeCityRef.current) {
      dispatch(fetchWeather({ city: activeCityRef.current }))
    }
  }

  const onAutoCompleteClick = (item: AutocompleteType) => {
    const cityName = item.label.substring(0, item.label.indexOf(","))
    dispatch(fetchWeather({ city: cityName }))
    setShowSuggestions(false)
    setCity("")
  }

  useClickOutside(suggestionRef, () => setShowSuggestions(false))

  const autoCompletionItems = autocomplete.filter((item: AutocompleteType) => item.label.toLowerCase().includes(city)).map((item: AutocompleteType, index) => {
    return (
      <AutoCompletionItem onClick={() => onAutoCompleteClick(item)} key={index}>
        {item.label}
      </AutoCompletionItem>
    )
  })
  return (
    <HeaderContainer>
      <SearchElement>
        <SearchInput onClick={() => setShowSuggestions(true)} onChange={onSearchInputChanged} placeholder={t("placeholder", { ns: namespaces.pages.home })} />
        {/*<DebounceInput element={SearchInput} debounceTimeout={1000} onChange={onSearchInputChanged} placeholder="Search for location" /> */}
        {showSuggestions && (
          <AutoCompletion ref={suggestionRef}>
            {autoCompletionItems}
          </AutoCompletion>
        )}
      </SearchElement>
      <AddButton onClick={onAddButtonClick}>{t("button", { ns: namespaces.pages.home })}</AddButton>
    </HeaderContainer>
  )
}