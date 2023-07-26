import React from "react"
import { Loader, OverLay } from "components/Spinner/wrappers"


export const Spinner = () => {
  return (
    <OverLay>
      <Loader />
    </OverLay>
  )
}
