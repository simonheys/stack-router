import { Center, Flex } from "@chakra-ui/react"
import { ComponentProps, FC, ReactNode } from "react"
import { NavLink } from "react-router-dom"

import { NavigationBar } from "../ui/NavigationBar"
import { ScreenContainer } from "../ui/ScreenContainer"
import { TableCellLink } from "../ui/TableCell"

const Tab: FC<
  ComponentProps<typeof NavLink> & ComponentProps<typeof Center>
> = (props) => {
  return <Center flex={1} as={NavLink} color={"white"} {...props} />
}

export function TabScreenContainer({ children }: { children: ReactNode }) {
  return (
    <ScreenContainer>
      <NavigationBar back title={"Tabs"} />
      {children}
      <Flex
        position={"absolute"}
        left={0}
        right={0}
        bottom={0}
        height={"96px"}
        bg={"rgba(255, 255, 255, 0.1)"}
        zIndex={123}
      >
        <Tab to="/tabs/1" replace>
          Tab1
        </Tab>
        <Tab to="/tabs/2" replace>
          Tab2
        </Tab>
        <Tab to="/tabs/3" replace>
          Tab3
        </Tab>
      </Flex>
    </ScreenContainer>
  )
}

export function TabScreen1() {
  return (
    <TabScreenContainer>
      <h2>Tab1</h2>
      <TableCellLink to="/users">Users</TableCellLink>
      <TableCellLink to="/users/picker/123/edit">Edit User 123</TableCellLink>
    </TabScreenContainer>
  )
}

export function TabScreen2() {
  return (
    <TabScreenContainer>
      <h2>Tab2</h2>
      <TableCellLink to="/about">About</TableCellLink>
    </TabScreenContainer>
  )
}

export function TabScreen3() {
  return (
    <TabScreenContainer>
      <h2>Tab3</h2>
    </TabScreenContainer>
  )
}
