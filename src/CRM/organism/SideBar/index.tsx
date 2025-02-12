import React from 'react'
import { SideBarMenu, SideBarWrapper } from './styles'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../Main/styles'
import { FaChevronRight } from 'react-icons/fa6'
import { useToken } from '../../../app/hooks'
import styled from 'styled-components'

export const SideBar = ({ current, view}) => {
	const { data,mutate } = useToken();
	const navigate = useNavigate();


	const menuClick = menu => {
		navigate(menu)
	}

	const menu = [{name: '게시판', url: '/'}]


	return (
		<SideBarWrapper style={{ display: view ? 'block' : 'none' }}>

			<UserInfoWrapper>
				<UserLabel>
					Name
					<UserName>{ localStorage.getItem('LOCAL@NAME') } </UserName>
				</UserLabel>

				<UserLabel>
					ID
					<UserName>{ localStorage.getItem('LOCAL@USERNAME') } </UserName>
				</UserLabel>
			</UserInfoWrapper>


				<SideBarMenu>
					{menu.map((item, index) => {
						return (
							<Menu
								key={index}
								onClick={() => {
									menuClick(item.url)
								}}
								openMenu={current === item.url}
							>
								{item.name}
								<Icon><FaChevronRight /></Icon>
							</Menu>
						)
					})}
				</SideBarMenu>


			<SideBarTitle>
				<div>
					{data !== '' && (
						<LoginBtn onClick={() => {
							mutate(null)
							navigate('/login')
						}}>로그아웃</LoginBtn>
					)}
				</div>
			</SideBarTitle>
		</SideBarWrapper>
	)
}

export default React.memo(SideBar)


export const Menu = styled.div<{ openMenu: boolean }>`
  width: 200px;
  height: 49px;
	border-radius: 4px;
	padding: 14px 10px 14px 16px;
	color: ${(props) => props.openMenu ? '#FFFFFF' : '#FFFFFF99'};
  font-weight: 500;
  font-size: 18px;
	line-height: 21.48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all .3s;
  background-color: ${(props) => props.openMenu ? '#FFFFFF33' : ''};
	
  ${Icon} {
    color: white;
		display: ${(props) => props.openMenu ? '' : 'none'};
  }

`



const UserInfoWrapper = styled.div`
	padding: 33px 0px 30px 20px;
	border-bottom: 1px solid #3E346B;
	
	display: flex;
	flex-direction: column;
	gap: 20px;
`



const UserName = styled.div`
	color: white;
	font-family: Pretendard, sans-serif;
	font-weight: 700;
	font-size: 16px;
	line-height: 19.09px;
	
	display: flex;
	align-items: center;
	gap: 5px;
`

const UserLabel = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`




export const SideBarTitle = styled.div`
  width: 100%;
  height: 60px;
  font-size: 20px;
  padding: 10px 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #010101;
  font-weight: 700;
`
export const LoginBtn = styled.div`
  border: none;
  background-color: #df7777;
  color: #fff;
  font-family: Pretendard, sans-serif;
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: .3s;
  &:hover {
    border: 1px solid #df7777;
    background-color: transparent;
    color: #df7777;
  }
`