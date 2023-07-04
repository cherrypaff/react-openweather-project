import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from "dayjs"

export type AutocompleteType = {
  value: number
  label: string
  isFahrenheit: boolean
}

export interface AppStoreType {
  isLoading: boolean
  language: string
  autocomplete: AutocompleteType[]
}

const initialState: AppStoreType = {
  isLoading: false,
  autocomplete: JSON.parse(localStorage.getItem('autocomplete') as string) || [],
  language: JSON.parse(localStorage.getItem('language') as string) || 'EN',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeLanguage: (state: AppStoreType, action: PayloadAction<string>) => {
      localStorage.setItem('language', `"${action.payload}"`)
      dayjs.locale(action.payload.toLowerCase())
      // ToDO dayjs.locale(action.payload)
      state.language = action.payload
    },
    addAutoComplete: (state: AppStoreType, action: PayloadAction<AutocompleteType>) => {
      if(!state.autocomplete.some(e => e.value === action.payload.value)) {
        const data = JSON.stringify([...state.autocomplete, action.payload])
        localStorage.setItem('autocomplete', data)
        state.autocomplete = [...state.autocomplete, action.payload]
      }
    },
    setIsLoading: (state: AppStoreType, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading, addAutoComplete, changeLanguage } = appSlice.actions;
export default appSlice.reducer;
