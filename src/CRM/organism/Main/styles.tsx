import styled from "styled-components";
import '../../assets/font.css'

export const Main = styled.div`
  font-family: 'Pretendard';
  background-color: #FFF;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #888;
  }
  display: flex;
`
export const Icon = styled.div`
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
export const Display = styled.div`
  background-color: #fff;
  width: 100%;
  min-height: calc(100vh - 50px);
  height: auto;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 2px 2px 8px 2px #74747476;
  overflow: hidden;
  overflow-y: auto;
    
    
`