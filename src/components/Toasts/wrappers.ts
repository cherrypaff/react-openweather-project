import styled from "styled-components"

export const ToastsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 84px;
  right: 24px;
  z-index: 9999;
`

export const ToastWrapper = styled.div<{ type: "info" | "error" }>`
  margin-top: 10px;
  padding: 8px;
  background: ${({ type }) => (type === "info" ? "white" : "#ffb98f")};
  color: black;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-shadow: 0 0 42px rgba(188, 195, 214, 0.3);
  border-radius: 8px;
`

export const ToastText = styled.span`
  font-weight: 500;
`