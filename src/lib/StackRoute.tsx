import { FC } from "react"
import { Route, RouteProps } from "react-router-dom"

import { StackPresentation } from "./utils/variants"

interface IStackRoute extends RouteProps {
  presentation?: StackPresentation
}

export const StackRoute: FC<IStackRoute> = Route
