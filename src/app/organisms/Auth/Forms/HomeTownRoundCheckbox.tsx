import React from 'react';
import styled from "styled-components";
import {Checkbox} from 'antd';


export const HomeTownRoundCheckbox = ({text, checked, ...props}) => {

  return (
    <CheckboxContainer >
      <HiddenCheckbox checked={checked} {...props} />
      <StyledCheckbox checked={checked}/>
      <CheckboxLabel>{text}</CheckboxLabel>
    </CheckboxContainer>
  );
};

const CheckboxContainer = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const HiddenCheckbox = styled.input.attrs({type: 'checkbox'})`
    border: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
    width: 14px;
    height: 14px;
    background: transparent;
    border: 1px solid black;
    border-radius: 50%;
    transition: all 150ms;
    display: flex;
    align-items: center;
    justify-content: center;

    &:after {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${props => (props.checked ? 'black' : 'transparent')};
        display: block;
    }
`;

const CheckboxLabel = styled.span`
    margin-left: 8px;
    font-size: 14px;
    color: #141C26;
    font-weight: 400;
    line-height: 16.71px;
`;
