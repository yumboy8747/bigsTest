import React from 'react'

const CustomIcon = ({ type, ...rest }) => {
	const icons = require(`@ant-design/icons`)
	const Component = icons[type]
	return <Component {...rest} />
}
export default React.memo(CustomIcon)