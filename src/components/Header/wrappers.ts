import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 100px;
`;

export const SearchElement = styled.div`
  position: relative;
  height: 60px;
  border-radius: 8px;
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  z-index: 1;
  margin-right: 30px;
  width: 600px;
`;

export const SearchInput = styled.input`
  margin-left: 1rem;
  height: 60px;
  border: none;
  border-radius: 8px;
  font-size: 1.125rem;
  width: 100%;
  &:focus {
    outline: none;
  }
  &::placeholder {
  }
`;

export const AutoCompletion = styled.div`
    position: absolute;
    width: calc(100% + 2px);
    max-height: 150px;
    border: 1px solid #D3D7F3;
    box-sizing: border-box;
    border-radius: 0 0 8px 8px;
    background: #ffffff;
    top: 100%;
    left: -1px;
    margin-bottom: 16px;
    z-index: 1;
    overflow: auto;
    overflow-x: hidden;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }
`

export const AutoCompletionItem = styled.div`
    width: 100%;
    cursor: pointer;
    padding: 9px 12px;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
`

export const AddButton = styled.button`
  padding: 4px 24px;
  text-align: center;
  font-weight: 500;
  height: 60px;
  font-size: 14px;
  line-height: 18px;
  background: #459de9;
  border-radius: 8px;
  border: none;
  outline: none;
  color: #ffffff;
  cursor: pointer;
  width: 120px;
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.1);
`


