import { FC, ReactNode, createContext, useContext, useRef } from "react"
import { useMemo } from "react"
import { Location, useLocation, useNavigationType } from "react-router-dom"

import { ITransition, getTransition } from "./utils/transition"
import { StackPresentation } from "./utils/variants"

interface IStackContext {
  location: {
    current: Location
    previous: Location | null
  }
  transition: ITransition
}

const StackContext = createContext<IStackContext | null>(null)

export const useStackContext = () => useContext(StackContext) as IStackContext

export const useStackTransition = () => {
  return useStackContext().transition
}

interface IStackContextProvider {
  children: ReactNode
  presentationByPath: Record<string, StackPresentation>
  paths: string[]
}

export const StackContextProvider: FC<IStackContextProvider> = ({
  presentationByPath,
  paths,
  children,
}) => {
  const currentLocation = useLocation()
  const navigationType = useNavigationType()
  const lastKnownLocationRef = useRef<Location | null>(currentLocation)
  const value: IStackContext = useMemo(() => {
    const transition = getTransition(
      lastKnownLocationRef.current?.pathname,
      currentLocation.pathname,
      presentationByPath,
      paths,
      navigationType,
    )
    const newValue = {
      transition,
      location: {
        previous: lastKnownLocationRef.current,
        current: currentLocation,
      },
    }
    lastKnownLocationRef.current = currentLocation
    return newValue
  }, [currentLocation, navigationType, paths, presentationByPath])
  return <StackContext.Provider value={value}>{children}</StackContext.Provider>
}
