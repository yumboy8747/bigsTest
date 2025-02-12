import React from 'react'
import { useNavigate } from 'react-router-dom'
import { adminPageLogo } from 'app/constants/IMAGES'
import CImage from '../Common/CImage'
import CView from '../Common/CView'

const HeaderLogo = () => {
	const navigation = useNavigate()
	return (
		<CView
			onClick={() => {
				navigation('/admin');
			}}
			style={{
				float: 'left',
				height: 38,
				paddingInline: 5,
				justifyContent: 'center',
				alignItems: 'center',
				background: 'rgba(255, 255, 255, 1)',
				borderRadius: 5,
				cursor: 'pointer',
				userSelect: 'none',
			}}>
			<CImage
				alt={'headerLogo'}
				src={adminPageLogo}
				resizeMode={'contain'}
				style={{ width: '100%', height: '100%' }}
			/>
		</CView>
	)
}

export default HeaderLogo
