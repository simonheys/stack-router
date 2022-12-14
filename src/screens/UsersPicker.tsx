import { Flex } from "@chakra-ui/react"

import { NavigationBar } from "../ui/NavigationBar"
import { ScreenContainer } from "../ui/ScreenContainer"
import { TableCellLink } from "../ui/TableCell"

const ids = Array.from({ length: 20 }).map((_, index) => index + 1)

export function UsersPicker() {
  return (
    <ScreenContainer>
      <NavigationBar close title={"Users"} />
      <Flex flexDirection={"column"} flex={1} overflowY={"auto"}>
        {ids.map((id) => (
          <TableCellLink key={id} to={`/users/picker/${id}`}>
            User {id} details
          </TableCellLink>
        ))}
      </Flex>
    </ScreenContainer>
  )
}
