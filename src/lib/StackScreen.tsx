import { Transition, motion, usePresence } from "framer-motion"
import { Action as NavigationType } from "history"
import { FC, ReactNode, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

import { useStackTransition } from "./StackContext"
import { isDirectChildOfParentPath } from "./utils/path"
import { getPresentationVariants, variants } from "./utils/variants"

/**
 * Exact values from UINavigationController's animation configuration.
 */
// export const TransitionIOSSpec: TransitionSpec = {
//   animation: "spring",
//   config: {
//     stiffness: 1000,
//     damping: 500,
//     mass: 3,
//     overshootClamping: true,
//     restDisplacementThreshold: 10,
//     restSpeedThreshold: 10,
//   },
// };

export const transition: Transition = {
  duration: 0.3,
  // duration: 3,
  transition: {
    type: "spring",
    stiffness: 1000,
    damping: 500,
    mass: 3,
    restDelta: 10,
    restSpeed: 10,
  },
}

export const replaceTransition: Transition = {
  duration: 0,
}

export interface IStackScreen {
  path?: string
  children: ReactNode
}

const Container = styled(motion.div)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #161616;
  color: white;
  overflow: hidden;
`

export const StackScreen: FC<IStackScreen> = ({ path, children }) => {
  const locationTransition = useStackTransition()
  const ref = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()

  const [isPresent, safeToRemove] = usePresence()

  let isEntering = locationTransition.to.path === path
  let isExiting = locationTransition.from?.path === path
  let isFrom = locationTransition.from?.path === path
  let isTo = locationTransition.to.path === path
  const isPush = locationTransition.navigationType === NavigationType.Push
  const isPop = locationTransition.navigationType === NavigationType.Pop
  const isReplace = locationTransition.navigationType === NavigationType.Replace

  if (!isEntering && !isExiting) {
    /** can happen with <Outlet /> when rendering both a parent and child - see if either is a child match */
    if (
      isDirectChildOfParentPath(path, locationTransition.to.path) ||
      isDirectChildOfParentPath(locationTransition.to.path, path)
    ) {
      isEntering = true
      isTo = true
    } else if (
      isDirectChildOfParentPath(path, locationTransition.from?.path) ||
      isDirectChildOfParentPath(locationTransition.from?.path, path)
    ) {
      isExiting = true
      isFrom = true
    }
  }

  const presentationFrom = locationTransition.from?.presentation
  const presentationTo = locationTransition.to.presentation

  const [enter, active, exit] = getPresentationVariants({
    isEntering,
    isExiting,
    isPush,
    isPop,
    presentationFrom,
    presentationTo,
  })

  /** appear above when popping */
  let zIndex = isExiting && isPop ? 1 : 0
  if (!isEntering && !isExiting) {
    zIndex = -1
  }

  const pointerEvents = isPresent && isEntering ? "auto" : "none"

  const isStacked = isFrom && presentationTo === "modal-sheet"
  const isModalSheet = isTo && presentationTo === "modal-sheet"

  /** stack behind modal-sheet, remove when no longer in stack */
  useEffect(() => {
    if (!isPresent && !isStacked) {
      safeToRemove()
    }
  }, [isPresent, isStacked, safeToRemove])

  /** clicking outside navigates back */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isPresent && !ref.current?.contains(e.target as Node)) {
        e.stopPropagation()
        navigate(-1)
      }
    }

    isModalSheet && document.addEventListener("mousedown", handleClickOutside)

    return () => {
      isModalSheet &&
        document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isModalSheet, isPresent, isStacked, navigate, safeToRemove])

  console.log(
    `[${path || "?"}] ${locationTransition.navigationType} ${
      locationTransition.from?.path || "null"
    } -> ${locationTransition.to.path || "null"} (${
      locationTransition.from?.presentation || "null"
    } -> ${locationTransition.to.presentation || "null"}) ${
      isEntering ? "isEntering" : ""
    } ${isExiting ? "isExiting" : ""}`,
  )

  return (
    <Container
      ref={ref}
      initial={enter}
      animate={active}
      exit={exit}
      variants={variants}
      transition={isReplace ? replaceTransition : transition}
      style={{
        zIndex,
        pointerEvents,
      }}
    >
      {/* <div>{path}</div>
      <div>pointerEvents:{pointerEvents}</div> */}
      {children}
    </Container>
  )
}
