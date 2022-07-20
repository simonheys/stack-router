import { matchPath } from "react-router-dom"

import { areSiblingPaths } from "./path"
import { StackPresentation } from "./variants"

export type PresentationByPath = Record<string, StackPresentation>

export const getMatchingPresentationPath = (
  pathToMatch: string,
  presentationByPath: PresentationByPath,
) => {
  if (!pathToMatch) {
    return
  }
  const paths = Object.keys(presentationByPath)
  for (const path of paths) {
    const match = matchPath(path, pathToMatch)
    if (match !== null) {
      return path
    }
  }
}

export const getPresentationForPath = (
  path: string,
  presentationByPath: PresentationByPath,
): StackPresentation => {
  const matchingPath = getMatchingPresentationPath(path, presentationByPath)
  if (matchingPath && presentationByPath[matchingPath]) {
    return presentationByPath[matchingPath]
  }
  /**
   * use modal presentation if any sibing is also modal
   * this allows us to cleanly use horizontal stack navigation inside modal
   */
  const paths = Object.keys(presentationByPath)
  for (const presentationPath of paths) {
    if (areSiblingPaths(presentationPath, path)) {
      const presentation = presentationByPath[presentationPath]
      if (presentation === "modal" || presentation === "modal-sheet") {
        return presentation
      }
    }
  }
  return "default"
}
