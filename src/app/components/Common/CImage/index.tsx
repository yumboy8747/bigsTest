import React from 'react'

interface IProps {
	width?: number | 'auto' | string
	height?: number | 'auto' | string
	resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center'
	src?: any
	alt: string
	style?: any
}

const CImage = ({ src, alt, width, height, resizeMode, style }: IProps) => {
	return (
		<img
			src={src}
			alt={alt}
			width={width}
			height={height}
			style={{ backgroundSize: resizeMode, ...style }}
		/>
	)
}

export default React.memo(CImage)