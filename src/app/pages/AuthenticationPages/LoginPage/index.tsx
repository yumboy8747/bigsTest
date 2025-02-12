import * as React from 'react'
import styled from "styled-components";
import LoginForm from "../../../organisms/Auth/Forms/LoginForm";
import {HomeTownCustomerSignUpModal} from "../../../organisms/Auth/Forms/HomeTownCustomerSignUpModal";



export function LoginPage() {
	const [isCustomerSignUpModalOpen, setIsCustomerSignUpModalOpen] = React.useState(false);

	return (
		<Container>

			<ContentContainer>

				<LoginForm setIsSignUpModalOpen={setIsCustomerSignUpModalOpen} />

				{isCustomerSignUpModalOpen &&
					<HomeTownCustomerSignUpModal setIsCustomerSignUpModalOpen={setIsCustomerSignUpModalOpen}/>
				}

			</ContentContainer>
		</Container>
	)
}

const ContentContainer = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #F7F2FD;
	
	
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
