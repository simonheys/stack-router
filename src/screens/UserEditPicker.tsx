import { useParams } from "react-router-dom"

import { ContentBox } from "../ui/ContentBox"
import { NavigationBar } from "../ui/NavigationBar"
import { ScreenContainer } from "../ui/ScreenContainer"

export function UserEditPicker() {
  let { id } = useParams()
  return (
    <ScreenContainer>
      <NavigationBar close title={"Picker"} />
      <h2>User Edit Picker {id}</h2>
      <ContentBox>Content in here</ContentBox>
    </ScreenContainer>
  )
}
