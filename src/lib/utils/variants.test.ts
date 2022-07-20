import { StackPresentation, getPresentationVariants } from "./variants"

export const dumpVariants = () => {
  const flags = [true, false]
  const presentations: StackPresentation[] = ["default", "modal", "modal-sheet"]
  let result = ""
  for (const presentationFrom of presentations) {
    for (const presentationTo of presentations) {
      for (const isEntering of flags) {
        const isExiting = !isEntering
        for (const isPush of flags) {
          const isPop = !isPush
          const [enter, active, exit] = getPresentationVariants({
            isEntering,
            isExiting,
            isPush,
            isPop,
            presentationFrom,
            presentationTo,
          })
          result += `${isEntering ? "entering" : "exiting"} ${
            isPush ? "push" : "pop"
          } ${presentationFrom} -> ${presentationTo} [${enter}, ${active}, ${exit}]\r`
        }
      }
    }
  }
  return result
}

describe("variants", () => {
  describe("getPresentationVariants", () => {
    test("getPresentationVariants", () => {
      expect(dumpVariants()).toMatchSnapshot()
    })
  })
})
