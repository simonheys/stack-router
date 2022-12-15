import { FC } from "react"

import { Route, Routes } from "../lib"
import { About } from "../screens/About"
import { Home } from "../screens/Home"
import { TabScreen1, TabScreen2, TabScreen3 } from "../screens/Tabs"
import { UserDetails } from "../screens/UserDetails"
import { UserEdit } from "../screens/UserEdit"
import { UserEditPicker } from "../screens/UserEditPicker"
import { Users } from "../screens/Users"
import { UsersPicker } from "../screens/UsersPicker"

export const RootRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tabs/1" element={<TabScreen1 />}></Route>
      <Route path="/tabs/2" element={<TabScreen2 />}></Route>
      <Route path="/tabs/3" element={<TabScreen3 />}></Route>
      <>
        <>
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<Users />} />
        </>
      </>
      <Route presentation="modal" path="/users/picker">
        <Route index element={<UsersPicker />} />
        <Route path=":id">
          <Route index element={<UserDetails />} />
          <Route presentation="modalSheet" path="edit">
            <Route index element={<UserEdit />} />
            <Route presentation="modalSheet" path="picker">
              <Route index element={<UserEditPicker />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}
