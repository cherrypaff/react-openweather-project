import styled from "styled-components"

export const Loader = styled.div`
  position: relative;
  width: 36px;
  height: 36px;
  @keyframes rotate-animation {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes anti-rotate-animation {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(-360deg);
    }
  }
  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    border-width: 4px;
    border-style: solid;
    border-radius: 50%;
  }
  &:before {
    width: 100%;
    height: 100%;
    border-bottom-color: ${props => props.theme.coldStats};
    border-right-color: ${props => props.theme.coldStats};
    border-top-color: transparent;
    border-left-color: ${props => props.theme.coldStats};
    top: 0px;
    left: 0px;
    animation: rotate-animation 1s linear 0s infinite;
  }
  &:after {
    width: 56%;
    height: 56%;
    border-bottom-color: ${props => props.theme.hotStats};
    border-right-color: ${props => props.theme.hotStats};
    border-top-color: transparent;
    border-left-color: transparent;
    left: calc((100% - 56%) / 2);
    top: calc((100% - 56%) / 2);
    animation: anti-rotate-animation 0.85s linear 0s infinite;
  }
`

export const OverLay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`