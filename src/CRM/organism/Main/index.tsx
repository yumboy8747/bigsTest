import React, {Suspense, useEffect, useState} from 'react'
import { Main, Wrapper } from './styles'
import SideBar from '../SideBar'
import {Route, Routes, useLocation} from 'react-router-dom'
import TopBar from '../../components/TopBar'
import {AdminNotice} from "../../../HomeTown/Admin/AdminNotice";
import {Spin} from "antd";
import {useIsMobile} from "../../../utils/CalVW";

export const HomeTown = () => {

	// 유틸리티
	const location = useLocation()
	const { pathname } = location
	const current = pathname.split('/')[1] || '/';
	const isMobile = useIsMobile();
	const [view, setView] = useState(true)


	useEffect(() => {
		if(isMobile){
			setView(false);
		} else {
			setView(true)
		}
	}, [isMobile])

	return (
		<>
			<Main>
				<SideBar current={current} view={view}  />
				<Wrapper>
					<TopBar view={view} setView={setView} />
					<Suspense fallback={<Spin size="large" />}>
						<Routes>
							<Route path="/" element={<AdminNotice />} />

						</Routes>
					</Suspense>

				</Wrapper>
			</Main>

		</>
	)
}

