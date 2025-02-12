
import styled from 'styled-components'


export const View = styled.div<{hover?: string}>`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	${({hover}) => hover && `
		&:hover {
			color: ${hover};
		}
	`}
`

export const Text = styled.div<{ size?: number }>`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	font-family: 'Roboto';
	
	${({ size }) =>
		size &&
		`
        @media only screen and (max-width: 600px) {
           font-size: ${size - 4}px;
        }
        @media only screen and (min-width: 600px) {
           font-size: ${size - 3}px;
        }
        @media only screen and (min-width: 768px) {
           font-size: ${size - 2}px;
        }
        @media only screen and (min-width: 992px) {
           font-size: ${size - 1}px;
        }
        @media only screen and (min-width: 1200px) {
           font-size: ${size}px;
        }
   `}
`
