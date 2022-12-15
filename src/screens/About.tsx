import { ContentBox } from "../ui/ContentBox"
import { NavigationBar } from "../ui/NavigationBar"
import { ScreenContainer } from "../ui/ScreenContainer"

export function About() {
  return (
    <ScreenContainer>
      <NavigationBar back title={"About"} />
      <h2>About</h2>
      <ContentBox>Stack Router PoC demo</ContentBox>
    </ScreenContainer>
  )
}
