import { configureStore } from "@reduxjs/toolkit"
import appReducer from "store/reducers/appReducer"
import weatherReducer from "store/reducers/weatherReducer"

const store = configureStore({
  reducer: {
    app: appReducer,
    weather: weatherReducer,
  },
})

export type AppStore = ReturnType<typeof store.getState>

export default store
