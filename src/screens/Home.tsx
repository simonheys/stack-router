import { useCallback } from "react"

import { NavigationBar } from "../ui/NavigationBar"
import { TableCellLink } from "../ui/TableCell"

export function Home() {
  const onOpenWindow = useCallback(() => {
    window.open(
      window.location.href,
      "_blank",
      "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=400,height=600,left=100,top=100",
    )
  }, [])
  return (
    <>
      <NavigationBar title={"Stack Router PoC"} />
      <h2>Home</h2>
      <TableCellLink to="/tabs/1">Tabs</TableCellLink>
      <TableCellLink to="/about">About</TableCellLink>
      <TableCellLink to="/users">Users</TableCellLink>
      <TableCellLink to="/users/picker/123/edit">Edit User 123</TableCellLink>
      <TableCellLink to="/" onClick={onOpenWindow}>
        Open popup
      </TableCellLink>
    </>
  )
}
