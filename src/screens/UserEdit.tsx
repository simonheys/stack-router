import { useParams } from "react-router-dom"

import { NavigationBar } from "../ui/NavigationBar"
import { ScreenContainer } from "../ui/ScreenContainer"
import { TableCellLink } from "../ui/TableCell"

export function UserEdit() {
  let { id } = useParams()
  return (
    <ScreenContainer>
      <NavigationBar close title={"Edit"} />
      <h2>User Edit {id}</h2>
      <TableCellLink to={`/users/picker/${id}/edit/picker`}>
        User edit picker
      </TableCellLink>
    </ScreenContainer>
  )
}
