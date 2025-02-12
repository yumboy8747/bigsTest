import React from 'react'

interface Props {
	style?: React.CSSProperties
	children?: React.ReactNode
	className?: any
	onClick?: any
}

const CView: React.FC<Props> = ({ style, children, className, onClick }) => {
	return (
		<div
			onClick={onClick}
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-start',
				justifyContent: 'flex-start',
				...style,
			}}
			className={className}>
			{children}
		</div>
	)
}

export default React.memo(CView)