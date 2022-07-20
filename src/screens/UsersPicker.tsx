import styled from "styled-components"

import { NavigationBar } from "../ui/NavigationBar"
import { ScrollRestoration } from "../ui/ScrollRestoration"
import { TableCellLink } from "../ui/TableCell"

const ids = Array.from({ length: 20 }).map((_, index) => index + 1)

const Container = styled(ScrollRestoration)`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  overflow-x: hidden;
  overflow-y: overlay;
  &::-webkit-scrollbar-track,
  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: rgba(255, 255, 255, 0.05);
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
`

export function UsersPicker() {
  return (
    <>
      <NavigationBar close title={"Users"} />
      <Container scrollId="UsersPicker">
        {ids.map((id) => (
          <TableCellLink key={id} to={`/users/picker/${id}`}>
            User {id} details
          </TableCellLink>
        ))}
      </Container>
    </>
  )
}
