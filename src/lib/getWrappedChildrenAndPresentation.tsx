import {
  Children,
  ReactElement,
  ReactNode,
  cloneElement,
  isValidElement,
} from "react"
import { Route, resolvePath } from "react-router-dom"

import { StackScreen } from "./StackScreen"
import { Presentation } from "./types"

type DeclaredPresentationByPath = Record<string, Presentation>

export interface WrappedChildrenAndPresentation {
  /** the routes wrapped with StackScreen */
  wrappedChildren: ReactNode
  /** `path` mapped to `presentation` declared in `<Route ... />` */
  declaredPresentationByPath: DeclaredPresentationByPath
}

/**
 * Iterates Route children and wraps in StackScreen to provide animation with StackRoutes
 * Takes a record mapping route path to presentation
 *
 * converts e.g.
 *
 * `<Route presentation="modal" path="/users/picker" element={<UsersPicker />} />`
 *
 * into
 *
 * `<Route presentation="modal" path="/users/picker" element={<StackScreen path={"/users/picker"}><UsersPicker /></StackScreen>}/>`
 *
 */

export const getWrappedChildrenAndPresentation = (
  childRoutes: ReactNode,
  parentPath = "/",
): WrappedChildrenAndPresentation => {
  const presentationByPath: DeclaredPresentationByPath = {}
  const wrappedChildren = Children.map(childRoutes, (child) => {
    if (isValidElement(child)) {
      let { children, element, presentation, path } = child.props
      /** router path to this child, accounting for parent path */
      const childPath = path
        ? resolvePath(path, parentPath).pathname
        : parentPath
      if (child.type === Route) {
        if (presentation) {
          /** record the presentation prop for this router path if present */
          presentationByPath[childPath] = presentation
        }
      }
      /** recurse into children, also handles type===Fragment */
      if (children) {
        const {
          wrappedChildren: nestedWrappedChildren,
          declaredPresentationByPath: nestedPresentationByPath,
        } = getWrappedChildrenAndPresentation(children, childPath)
        /** replace current children with wrapped */
        children = nestedWrappedChildren
        /** add the presentation records */
        Object.assign(presentationByPath, nestedPresentationByPath)
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
  return {
    wrappedChildren,
    declaredPresentationByPath: presentationByPath,
  }
}
