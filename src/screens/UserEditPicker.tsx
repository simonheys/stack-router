import { useParams } from "react-router-dom"

import { ContentBox } from "../ui/ContentBox"
import { NavigationBar } from "../ui/NavigationBar"

export function UserEditPicker() {
  let { id } = useParams()
  return (
    <>
      <NavigationBar close title={"Picker"} />
      <h2>User Edit Picker {id}</h2>
      <ContentBox>Content in here</ContentBox>
    </>
  )
}
