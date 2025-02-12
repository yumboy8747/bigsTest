import React, {useState} from 'react'
import {Blacked} from "../../../../CRM/components/styles";
import {ReactComponent as ModalCloseIcon} from "../../../../assets/HomeTownIcon/ModalCloseIcon.svg";
import styled from "styled-components";
import {message, Select} from "antd";
import API from "../../../../utils/api";
import {media} from "../../../../utils/CalVW";




export const HomeTownCustomerSignUpModal = ({setIsCustomerSignUpModalOpen}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const isValidPassword = (pw) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!%*#?&])[A-Za-z\d!%*#?&]{8,}$/;
        return regex.test(pw);
    };


    const clickCustomerSignUp = () => {
        const shouldEdit = window.confirm(`가입하시겠습니까?`);

        if(password !== confirmPassword) {
            message.error('비밀번호가 다릅니다.')
            return;
        }

        if (!isValidPassword(password)) {
            message.error('비밀번호는 8자 이상이며, 숫자, 영문자, 특수문자(!%*#?&)를 포함해야 합니다.');
            return;
        }

        if(shouldEdit) {
            if(!name && !password && !email && !confirmPassword) {
                message.error('필수 사항을 입력해주세요.')
            } else {
                API.post('/auth/signup', '', {
                    password,
                    name,
                    confirmPassword,
                    username: email,
                }).then((res: any) => {

                      if (res && res.username) {
                          message.error(res.username || `회원가입에 실패하였습니다.`);
                          return;
                      }
                  }).catch((err: any) => {
                      // 서버에서 아무런 값을 전달하지 않는 이상 현상, 에러 핸들링에 대한 문제 발생
                    message.success('회원가입 되었습니다.');
                    setIsCustomerSignUpModalOpen(false);
                })


            }
        }
    }




    return (
      <>
          <Blacked onClick={() => setIsCustomerSignUpModalOpen(false)}/>
          <ModalWrapper className={"scroll-container"} >
              <ModalHeader>
                  <ModalTitle>회원가입</ModalTitle>
                  <CloseIconSVG as={ModalCloseIcon} onClick={() => {setIsCustomerSignUpModalOpen(false)}  }/>
              </ModalHeader>

              <Table>
                  <tbody>
                  <TableRow>
                      <Th>
                          <ThLabel>
                              이름
                              <RequireIcon>*</RequireIcon>
                          </ThLabel>
                      </Th>
                      <Td><Input type="text" value={name} onChange={e => setName(e.target.value)}/></Td>
                  </TableRow>

                  <TableRow>
                      <Th>
                          <ThLabel>
                              메일(아이디)
                              <RequireIcon>*</RequireIcon>
                          </ThLabel>
                      </Th>
                      <Td><Input type="text" placeholder={'test@gmail.com'} value={email} onChange={e => setEmail(e.target.value)}/></Td>
                  </TableRow>
                  <TableRow>
                      <Th>
                          <ThLabel>
                              비밀번호
                              <RequireIcon>*</RequireIcon>
                          </ThLabel>
                      </Th>
                      <Td><Input type="password" placeholder={'8자 이상, 숫자, 영문자, 특수문자(!%*#?&) 1개 이상의 조합'}  value={password} onChange={e => setPassword(e.target.value)}/></Td>
                  </TableRow>
                  <TableRow>
                      <Th>
                          <ThLabel>
                              비밀번호 확인
                              <RequireIcon>*</RequireIcon>
                          </ThLabel>
                      </Th>
                      <Td><Input type="password" placeholder={'8자 이상, 숫자, 영문자, 특수문자(!%*#?&) 1개 이상의 조합'}  value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/></Td>
                  </TableRow>
                  </tbody>
              </Table>

              <SignUpButton onClick={() => clickCustomerSignUp()}>
                  가입완료
              </SignUpButton>
          </ModalWrapper>
      </>
    )
}


const ModalWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 800px;
    width: 800px;
    min-height: 411px;
    background-color: #fff;
    overflow-y: auto;
    border-radius: 8px;
    padding: 24px;
    z-index: 99;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;

    @media ${media.mobile} {
        width: 95%;
    }

`;


const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

const CloseIconSVG = styled.svg`
    width: 24px;
    cursor: pointer;
`

const ModalTitle = styled.div`
    font-family: Pretendard, sans-serif;
    font-weight: 600;
    font-size: 18px;
    line-height: 21.48px;
    color: #2E2559;
`

const Table = styled.table`
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
    border: 1px solid #ccc;
`;

const TableRow = styled.tr`
    min-height: 40px;
`;

const Th = styled.th`
    padding: 10px;
    text-align: left;
    width: 22%;
    border: 1px solid #ccc;
    background-color: #F4F2FF;
`;

const ThLabel = styled.div`
    font-family: Pretendard, sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 16.71px;
    color: #00000099;
    display: flex;
    gap: 2px;
`

const RequireIcon = styled.p`
    color: #F15151;
`

const Td = styled.td`
    padding: 10px;
    text-align: left;
    width: 78%;
    border: 1px solid #ccc;
`;



const Input = styled.input`
    width: 100%;
    height: 28px;
    padding-left: 10px;
    border: 1px solid #2E2559;
    border-radius: 4px;
    display: flex;
`;


const SignUpButton = styled.div`
    width: 100px;
    padding: 11px;
    background-color: #530DAD;
    color: #fff;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    font-weight: 500;
    font-size: 15px;
    line-height: 17.9px;
    font-family: Pretendard, sans-serif;
`;