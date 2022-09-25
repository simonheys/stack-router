import {
  Children,
  ReactElement,
  ReactNode,
  cloneElement,
  isValidElement,
} from "react"
import { Route, resolvePath } from "react-router-dom"

import { StackScreen } from "../StackScreen"
import { StackPresentation } from "./variants"

export interface IWrappedChildrenAndPresentation {
  /** the routes wrapped with StackScreen */
  wrappedChildren: ReactNode
  /** path mapped to path presentation */
  presentationByPath: Record<string, StackPresentation>
  /** all unique paths */
  paths: string[]
}

/**
 * Iterates Route children and wraps in StackScreen to provide animation with StackRoutes
 * Takes a record mapping route path to presentation
 *
 * converts e.g.
 *
 * `<Route modal path="/users/picker" element={<UsersPicker />} />`
 *
 * into
 *
 * `<Route modal path="/users/picker" element={<StackScreen path={"/users/picker"}><UsersPicker /></StackScreen>}/>`
 *
 */

export const getWrappedChildrenAndPresentation = (
  childRoutes: ReactNode,
  parentPath = "/",
): IWrappedChildrenAndPresentation => {
  const presentationByPath: IWrappedChildrenAndPresentation["presentationByPath"] =
    {}
  let unfilteredPaths: string[] = []
  const wrappedChildren = Children.map(childRoutes, (child) => {
    if (isValidElement(child)) {
      let { children, element, presentation, path } = child.props
      /** router path to this child, accounting for patent path */
      const childPath = path
        ? resolvePath(path, parentPath).pathname
        : parentPath
      if (child.type === Route) {
        if (presentation) {
          /** record the presentation prop for this router path if present */
          presentationByPath[childPath] = presentation
        }
        /** keep a record of all raw paths */
        unfilteredPaths.push(childPath)
      }
      /** recurse into children, also handles type===Fragment */
      if (children) {
        const {
          wrappedChildren: nestedWrappedChildren,
          presentationByPath: nestedPresentationByPath,
          paths: nestedPaths,
        } = getWrappedChildrenAndPresentation(children, childPath)
        /** replace current children with wrapped */
        children = nestedWrappedChildren
        /** add the presentation records */
        Object.assign(presentationByPath, nestedPresentationByPath)
        unfilteredPaths = unfilteredPaths.concat(nestedPaths)
      }
      /** wrap the element in StackScreen and copy in the router path as a prop */
      if (element) {
        element = <StackScreen path={childPath}>{element}</StackScreen>
      }
      /** return a clone of this Route with wrapped element and children */
      return cloneElement(
        child as ReactElement,
        {
          element,
        },
        children,
      )
    }

    return child
  })
  const paths = Array.from(new Set(unfilteredPaths))
  return {
    wrappedChildren,
    presentationByPath,
    paths,
  }
}
