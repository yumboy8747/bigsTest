import React, { useEffect } from 'react'
import { useToken } from '../../../hooks'
import { useNavigate } from 'react-router-dom'

export const LogoutPage = () => {
	const { mutate } = useToken('', false);
	const navigate = useNavigate();


	useEffect(() => {
		mutate(null);
		navigate('/')
	}, [])

	return (
		<></>
	)
}