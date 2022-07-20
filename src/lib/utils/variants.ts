export type StackPresentation = "default" | "modal" | "modal-sheet"

export const variants = {
  enter: {
    filter: "brightness(1)",
    translateX: "100%",
    translateY: 0,
    boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
    transformOrigin: "50% 0",
  },
  active: {
    filter: "brightness(1)",
    translateX: 0,
    translateY: 0,
    marginTop: 0,
    scale: 1,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    boxShadow: "0 0 20px 5px rgba(0, 0, 0, 0.3)",
    transformOrigin: "50% 0",
  },
  activeModalSheet: {
    filter: "brightness(1)",
    translateX: 0,
    translateY: 0,
    marginTop: "30px",
    scale: 1,
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
    boxShadow: "0 0 20px 5px rgba(0, 0, 0, 0.3)",
    transformOrigin: "50% 0",
  },
  exit: {
    filter: "brightness(0.3)",
    translateX: "-30%",
    translateY: 0,
    transformOrigin: "50% 0",
  },
  stacked: {
    filter: "brightness(0.5)",
    translateX: 0,
    translateY: 0,
    marginTop: "10px",
    scale: 0.9,
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
    transformOrigin: "50% 0",
  },
  exitStacked: {
    filter: "brightness(0)",
    translateX: 0,
    translateY: 0,
    scale: 0.8,
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
    transformOrigin: "50% 0",
  },
  exitModal: {
    filter: "brightness(1)",
    translateX: 0,
    translateY: "100%",
    boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
    transformOrigin: "50% 0",
  },
}

type VariantKey = keyof typeof variants

export interface IGetVariants {
  isEntering: boolean
  isExiting: boolean
  isPush: boolean
  isPop: boolean
  presentationFrom: StackPresentation | undefined
  presentationTo: StackPresentation
}

export const getPresentationVariants = ({
  isEntering,
  isExiting,
  isPush,
  isPop,
  presentationFrom,
  presentationTo,
}: IGetVariants): [VariantKey, VariantKey, VariantKey] => {
  let enter: VariantKey = "enter"
  let active: VariantKey = "active"
  let exit: VariantKey = "exit"

  if (!isEntering && !isExiting) {
    enter = "stacked"
    exit = "stacked"
    return [enter, active, exit]
  }

  if (isEntering) {
    if (isPush) {
      if (presentationTo === "modal") {
        enter = "exitModal"
      }
      if (presentationTo === "modal-sheet") {
        enter = "exitModal"
        active = "activeModalSheet"
      }
      if (
        (presentationFrom === "modal" || presentationFrom === "modal-sheet") &&
        presentationTo === "default"
      ) {
        enter = "enter"
      }
    } else if (isPop) {
      enter = "exit"
      if (presentationTo === "modal-sheet") {
        active = "activeModalSheet"
      }
      if (presentationFrom === "modal" || presentationFrom === "modal-sheet") {
        enter = "stacked"
      }
      if (
        presentationFrom === "modal-sheet" &&
        presentationTo === "modal-sheet"
      ) {
        exit = "exitModal"
      }
    }
  } else if (isExiting) {
    if (isPush) {
      if (presentationTo === "modal" || presentationTo === "modal-sheet") {
        exit = "stacked"
      } else if (
        (presentationFrom === "modal" || presentationFrom === "modal-sheet") &&
        presentationTo === "default"
      ) {
        exit = "exit"
      }
    }
    if (isPop) {
      exit = "enter"
      if (
        presentationFrom === "default" &&
        (presentationTo === "modal" || presentationTo === "modal-sheet")
      ) {
        exit = "enter"
      } else if (
        (presentationFrom === "modal" || presentationFrom === "modal-sheet") &&
        presentationTo === "default"
      ) {
        exit = "exitModal"
      } else if (
        presentationFrom === "modal-sheet" &&
        presentationTo === "modal-sheet"
      ) {
        exit = "exitModal"
      }
    }
  }

  return [enter, active, exit]
}
