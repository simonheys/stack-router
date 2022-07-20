import { useParams } from "react-router-dom"

import { ContentBox } from "../ui/ContentBox"
import { NavigationBar } from "../ui/NavigationBar"
import { TableCellLink } from "../ui/TableCell"

export function UserDetails() {
  let { id } = useParams()
  return (
    <>
      <NavigationBar back title={"User"} />
      <h2>User {id} Details</h2>
      <TableCellLink to={`/users/picker/${id}/edit`}>Edit user</TableCellLink>
      <ContentBox>Content in here</ContentBox>
    </>
  )
}
