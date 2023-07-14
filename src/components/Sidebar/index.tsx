import NavItem from "../NavItem";
import * as C from "./styles";
import React from 'react';

const Sidebar = () => {
  return(
    <C.Container>
      <NavItem icon='ic:outline-place' link='/home' text='Explorar' />
      <NavItem icon='ic:baseline-access-time' link='/schedules' text='Horários' />
    </C.Container>
  )
}

export default Sidebar;