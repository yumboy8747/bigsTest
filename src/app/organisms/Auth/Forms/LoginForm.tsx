import React, {useEffect, useState} from 'react'
import API from '../../../../utils/api'
import {useToken} from '../../../../app/hooks'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import {Checkbox, message} from 'antd'
import '../../../../CRM/assets/font.css'
import {ReactComponent as LoginLogo} from '../../../../assets/HomeTownLogin/LoginLogo.svg'
import {media} from "../../../../utils/CalVW";


const LoginForm = ({setIsSignUpModalOpen}) => {

  const {mutate} = useToken()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isCheck, setIsCheck] = useState(false)

  const loginUrl = window.location.href;

  // 이메일 주소 저장
  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');

    if (savedEmail) {
      setEmail(savedEmail);
      setIsCheck(true);
    }
  }, []);

  // Enter키 로그인
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleSubmit();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [email, password]);


  const onChangeEmail = e => {
    setEmail(e.target.value)
  }

  const onChangePassword = e => {
    setPassword(e.target.value)
  }

  // 토큰에서 정보 취득
  function parseJwt(token: string) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Invalid Token", e);
      return null;
    }
  }


  const handleSubmit = async () => {

    if (isCheck) {
      localStorage.setItem('savedEmail', email);
    } else {
      localStorage.removeItem('savedEmail');
    }


    try {
      const res = await API.send('POST', '/auth/signin', null, {
        username:email,
        password,
      })

      if (res?.accessToken) {
        mutate(res?.accessToken);

        const userInfo = parseJwt(res?.accessToken);
        localStorage.setItem('LOCAL@NAME', userInfo.name);
        localStorage.setItem('LOCAL@USERNAME', userInfo.username);

        localStorage.setItem('refreshToken', res.refreshToken);
        message.success('로그인 성공!');

        navigate('/', {state: loginUrl});

      } else {
        message.error(res.message)
      }
    } catch (e) {
      message.error('로그인 에러 발생');
      console.log(e, 'ERROR LOGIN')
    }
  }

  return (
    <Container>
      <LoginWrap>
        <LoginLogoSVG as={LoginLogo}/>

        <LoginInputSection>
          <LoginInputWrap>
            <InputTitle>아이디(메일주소)</InputTitle>
            <LoginInput onChange={onChangeEmail} value={email}></LoginInput>
          </LoginInputWrap>
          <LoginInputWrap>
            <InputTitle>비밀번호</InputTitle>
            <LoginInput onChange={onChangePassword} type={'password'}></LoginInput>
          </LoginInputWrap>
        </LoginInputSection>

        <LoginButton
          onClick={() => {
            handleSubmit();
          }}>
          로그인
        </LoginButton>

        <SignUpWrapper>
          <SignUpButton onClick={() => setIsSignUpModalOpen(true)}>회원가입</SignUpButton>
        </SignUpWrapper>


        <CheckWrap>
          <Checkbox checked={isCheck} onChange={event => setIsCheck(event.target.checked)} />
          <CheckLabel onClick={() => setIsCheck(!isCheck)}>아이디 저장</CheckLabel>
        </CheckWrap>
      </LoginWrap>


    </Container>
  )
}

export default React.memo(LoginForm)

const Container = styled.div`
    width: 858px;
    height: 520px;
    display: flex;
    justify-content: center;
    
    @media ${media.mobile} {
        justify-content: center;
        align-items: center;
        width: 100%;
        
    }
`

const LoginWrap = styled.div`
    width: 429px;
    height: 520px;
    background-color: white;
    padding-top: 82px;
    padding-left: 40px;
    padding-right: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media ${media.mobile} {
       padding: 82px 0 0 0;
    }
`

const LoginLogoSVG = styled.svg`
    width: 85px;
    margin-bottom: 40px;
`


const InputTitle = styled.div`
    font-weight: 500;
    font-size: 15px;
    line-height: 17.9px;
    color: #000000CC;
    font-family: Pretendard, sans-serif;
    margin-bottom: 8px;
`

const LoginInputWrap = styled.div`

`

const LoginInputSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const LoginInput = styled.input`
    border: 1px solid #00000033;
    width: 349px;
    height: 45px;
    padding-left: 10px;
`

const LoginButton = styled.button`
    width: 349px;
    height: 56px;
    background-color: #530DAD;
    box-shadow: 0px 4px 8px 0px #0000001A;
    border-radius: 2px;
    margin-top: 40px;

    color: #FFFFFF;
    font-family: Pretendard, sans-serif;
    font-weight: 500;
    font-size: 18px;
    line-height: 21.48px;
`

const SignUpWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 12px;
    
    @media ${media.mobile} {
        width: 81%;
    }
`

const CheckWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: flex-start;
    width: 100%;
    margin-top: 20px;
    
    @media ${media.mobile} {
        margin-left: 80px;
    }
`

const CheckLabel = styled.div`
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
`

const SignUpButton = styled.div`
    color: #000000;
    font-family: Pretendard, sans-serif;
    font-size: 15px;
    line-height: 17.9px;
    font-weight: 500;
    cursor: pointer;
`

