import styled from "styled-components";

export const TopBarWrapper = styled.div`
  width: calc(100vw - 280px);
  height: 50px;
  padding: 8px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  font-weight: 700;
`

export const Blacked = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
`