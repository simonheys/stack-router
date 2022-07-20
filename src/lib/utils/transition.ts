import { Action as NavigationType } from "history"

import { areSiblingPaths, depthOfPath, getMatchingPath } from "./path"
import { PresentationByPath, getPresentationForPath } from "./presentation"
import { StackPresentation } from "./variants"

export interface ITransitionEntity {
  path: string | undefined
  presentation: StackPresentation
  depth: number
}

export interface ITransition {
  from?: ITransitionEntity
  to: ITransitionEntity
  navigationType: NavigationType
}

/** getTransisiton
 *
 *  fromPath -> toPath
 *
 *  checks 'presentation' 'modal' etc.
 *
 *  if it's a sibling default to horizontal
 *
 *  if not a sibling then takes presentation style from each routes index path
 *
 */

export const getTransition = (
  from: string | undefined,
  to: string,
  presentationByPath: PresentationByPath,
  paths: string[],
  navigationType: NavigationType,
): ITransition => {
  const fromMatchingPath = getMatchingPath(from, paths)
  const toMatchingPath = getMatchingPath(to, paths)
  const depthTo = depthOfPath(to)
  const depthFrom = from ? depthOfPath(from) : depthTo
  const areSiblings = from && areSiblingPaths(from, to)

  if (areSiblings) {
    const presentation: StackPresentation = "default"
    const transition: ITransition = {
      to: {
        path: toMatchingPath,
        presentation,
        depth: depthTo,
      },
      navigationType,
    }
    if (fromMatchingPath) {
      transition.from = {
        path: fromMatchingPath,
        presentation,
        depth: depthFrom,
      }
    }
    return transition
  }

  /* get from any sibling */
  const presentationFrom = from
    ? getPresentationForPath(from, presentationByPath)
    : "default"
  const presentationTo = getPresentationForPath(to, presentationByPath)
  const transition: ITransition = {
    to: {
      path: toMatchingPath,
      presentation: presentationTo,
      depth: depthTo,
    },
    navigationType,
  }
  if (fromMatchingPath) {
    transition.from = {
      path: fromMatchingPath,
      presentation: presentationFrom,
      depth: depthFrom,
    }
  }
  // useful for debugging
  // console.log(
  //   JSON.stringify(
  //     {
  //       from,
  //       to,
  //       fromMatchingPath,
  //       toMatchingPath,
  //       depthFrom,
  //       depthTo,
  //       areSiblings,
  //       presentationFrom,
  //       presentationTo,
  //       direction,
  //       transition,
  //     },
  //     null,
  //     2,
  //   ),
  // )
  return transition
}
