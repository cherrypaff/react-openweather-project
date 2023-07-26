import React, { useEffect } from "react"
import { ToastsContainer, ToastWrapper, ToastText } from "components/Toasts/wrappers"
import { mainTheme } from "theme"
import { Icons } from "components/CurrentWeather/Icons"
import { useDispatch, useSelector } from "react-redux"
import { AppStore } from "store/store"
import { deleteToast } from "store/reducers/appReducer"

type ToastType = {
  text: string
  index: number
  onClose: (i: number) => void
}

const Toast = (props: ToastType) => {

  const closeToast = () => {
    props.onClose(props.index)
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      closeToast()
    }, 3500)

    return () => {
      timeoutId && clearTimeout(timeoutId)
    }
  }, [])

  return (
    <ToastWrapper type={"error"}>
      <ToastText>{props.text}</ToastText>
      <Icons onClick={closeToast} size={{height: "24px", width: "24px"}} name={"close"} />
    </ToastWrapper>
  )
}

export const Toasts = () => {
  const { toasts } = useSelector((store: AppStore) => ({
    toasts: store.app.toasts,
  }))

  const dispatch = useDispatch()

  const onToastClose = (index: number) => {
    dispatch(deleteToast(index))
  }

  return (
    <ToastsContainer>
      {toasts.map((toast, i) => {
        return (
          <Toast key={i} index={i} text={toast} onClose={onToastClose} />
        )
      })}
    </ToastsContainer>
  )
}
