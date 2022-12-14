import { ContentBox } from "../ui/ContentBox"
import { NavigationBar } from "../ui/NavigationBar"
import { ScreenContainer } from "../ui/ScreenContainer"
import { TableCellLink } from "../ui/TableCell"

export function Users() {
  return (
    <ScreenContainer>
      <NavigationBar back title={"Users"} />
      <h2>Users</h2>
      <TableCellLink to={"/users/picker"}>Pick a user</TableCellLink>
      <ContentBox>Content in here</ContentBox>
    </ScreenContainer>
  )
}
