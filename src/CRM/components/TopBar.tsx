import React from 'react'
import { TopBarWrapper } from './styles';
import { FaBars } from 'react-icons/fa6';
import { Icon } from '../organism/Main/styles';
import { useLocation } from 'react-router-dom';

export const TopBar = ({ view, setView }) => {
  const location = useLocation()
  const { pathname } = location;
  const current = pathname.split("/")[1]

  return (
    <TopBarWrapper style={{width: view ? 'calc(100vw - 280px)' : '100vw'}}>
      <Icon onClick={() => setView(!view)}>
        <FaBars />
      </Icon>
      {current == '' && '게시판'}

    </TopBarWrapper>
  )
}

export default React.memo(TopBar);