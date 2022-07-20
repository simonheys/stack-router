import { ContentBox } from "../ui/ContentBox"
import { NavigationBar } from "../ui/NavigationBar"

export function About() {
  return (
    <>
      <NavigationBar back title={"About"} />
      <h2>About</h2>
      <ContentBox>Stack Router PoC demo</ContentBox>
    </>
  )
}
