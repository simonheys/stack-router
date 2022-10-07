import { FC } from "react"
import { Route, RouteProps } from "react-router-dom"

import { StackPresentation } from "./utils/variants"

type StackRouteProps = RouteProps & {
  presentation?: StackPresentation
}

export const StackRoute: FC<StackRouteProps> = Route
