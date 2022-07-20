import { AnimatePresence } from "framer-motion"
import { FC, ReactNode, useMemo } from "react"
import { Routes, useLocation } from "react-router-dom"
import styled from "styled-components"

import { StackContextProvider } from "./StackContext"
import { getWrappedChildrenAndPresentation } from "./utils/getWrappedChildrenAndPresentation"

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

export const StackRoutes: FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation()
  const { wrappedChildren, presentationByPath, paths } = useMemo(
    () => getWrappedChildrenAndPresentation(children),
    [children],
  )
  return (
    <StackContextProvider presentationByPath={presentationByPath} paths={paths}>
      <Container>
        <AnimatePresence initial={false}>
          <Routes location={location} key={location.pathname}>
            {wrappedChildren}
          </Routes>
        </AnimatePresence>
      </Container>
    </StackContextProvider>
  )
}
