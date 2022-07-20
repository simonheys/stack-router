import {
  getMatchingPresentationPath,
  getPresentationForPath,
} from "./presentation"
import { presentationByPath } from "./transition.test"

describe("presentation", () => {
  test("getMatchingPresentationPath", () => {
    expect(
      getMatchingPresentationPath("/users/123/edit/", presentationByPath),
    ).toEqual("/users/:id/edit")
    expect(
      getMatchingPresentationPath("/users/pick", presentationByPath),
    ).toEqual("/users/pick")
    expect(
      getMatchingPresentationPath("/users/pick/", presentationByPath),
    ).toEqual("/users/pick")
    expect(getMatchingPresentationPath("/", presentationByPath)).toBeUndefined()
    expect(getMatchingPresentationPath("", presentationByPath)).toBeUndefined()
    expect(
      // @ts-ignore
      getMatchingPresentationPath(undefined, presentationByPath),
    ).toBeUndefined()
  })
  test("getPresentationForPath", () => {
    expect(getPresentationForPath("/", presentationByPath)).toEqual("default")
    expect(getPresentationForPath("/tabs/1", presentationByPath)).toEqual(
      "default",
    )
    expect(
      getPresentationForPath("/users/details", presentationByPath),
    ).toEqual("modal")
    expect(
      getPresentationForPath("/users/123/edit/", presentationByPath),
    ).toEqual("modal")
  })
})
