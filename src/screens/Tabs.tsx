import { ReactNode } from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components"

import { NavigationBar } from "../ui/NavigationBar"
import { ScreenContainer } from "../ui/ScreenContainer"
import { TableCellLink } from "../ui/TableCell"

export const TabbBar = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 96px;
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  background-color: rgba(255, 255, 255, 0.1);
  z-index: 123;
`

export const Tab = styled(NavLink)`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: white;
`

export function TabScreenContainer({ children }: { children: ReactNode }) {
  return (
    <ScreenContainer>
      <NavigationBar back title={"Tabs"} />
      {children}
      <TabbBar>
        <Tab to="/tabs/1" replace>
          Tab1
        </Tab>
        <Tab to="/tabs/2" replace>
          Tab2
        </Tab>
        <Tab to="/tabs/3" replace>
          Tab3
        </Tab>
      </TabbBar>
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
