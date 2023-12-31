import { useClickOutside } from "hooks/use-click-outside"
import { useRef, useState } from "react"
import * as React from "react"
import styled from "styled-components"
import { Icons } from "components/CurrentWeather/Icons"
import { mainTheme } from "theme"

const Placeholder = styled.p`
    color: #b3b3b3;
    font-size: 16px;
    line-height: 22px;
`

export const DropdownItem = styled.div`
    width: 100%;
    cursor: pointer;
    padding: 9px 12px;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
`

const Dropdown = styled.div`
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

const SelectBox = styled.div<{ isOpen: boolean; error?: boolean; withoutBorder?: boolean }>`
    position: relative;
    width: 100px;
    height: 40px;
    background: #fff;
    border: 1px solid
    ${({ error, withoutBorder }) => withoutBorder ? "transparent" : error ? "#D5584D" : "#D3D7F3"};
    box-sizing: border-box;
    border-radius: ${({ isOpen }) => (isOpen ? "8px 8px 0px 0px" : "8px")};
    display: flex;
    align-items: center;
    padding: 0 12px 0 8px;
`

const Label = styled.div`
    width: 75%;
    position: relative;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-left: 8px;
    color: ${({ theme }) => theme.grayColor};
`


type Value = string | number

export type SelectInputProps<T extends Value> = {
    value: T | null
    placeholder?: string
    onChange: (value: T) => void
    options: {
        value: T
        label: string
    }[]
    error?: boolean
    onBlur?: () => void
    className?: string
    withoutBorder?: boolean
    onClick?: () => void
}

export const SelectDropdown = <T extends Value = Value>({
  value,
  placeholder,
  onChange,
  options,
  error,
  onBlur,
  className,
  withoutBorder,
  onClick,
}: SelectInputProps<T>) => {

  const [isOpen, changeOpen] = useState(false)

  const dropdownItems = options.map((item, index) => {
    return (
      <DropdownItem key={index} onClick={() => onChange(item.value)}>
        {item.label}
      </DropdownItem>
    )
  })

  let selectedItem = options.find(item => item.value === value)
  // @ts-ignore
  selectedItem = selectedItem || {label: value, value}

  const selectBoxRef = useRef<HTMLDivElement>(null)

  useClickOutside(selectBoxRef, () => {
    changeOpen(false)
  })

  return (
    <SelectBox
      isOpen={isOpen}
      error={error}
      ref={selectBoxRef}
      placeholder={placeholder}
      className={className}
      onClick={() => {
        onClick && onClick()
        const newValue = !isOpen
        changeOpen(newValue)
        if (!newValue && onBlur) {
          onBlur()
        }
      }}
      withoutBorder={withoutBorder}
    >
      {selectedItem && !!selectedItem.value ? <><Icons fill={mainTheme.grayColor} name={"globe"} /><Label>{selectedItem.label}</Label></> : <Placeholder>{placeholder}</Placeholder>}
      <Icons fill={mainTheme.grayColor} isRotated={isOpen} name={"arrow"} />
      {isOpen && <Dropdown>{dropdownItems}</Dropdown>}
    </SelectBox>
  )
}