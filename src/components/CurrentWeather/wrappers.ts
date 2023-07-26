import styled from "styled-components"

export const CityCardContainer = styled.div<{ positiveTemp: boolean }>`
  position: relative;
  background-color: ${({ positiveTemp, theme }) => (positiveTemp ? theme.hotCardBackgroundColor : theme.coldCardBackgroundColor)};
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  &:not(:first-child) {
    margin-left: 10px;
    margin-right: 10px;
  }

  &:not(:last-child) {
    margin-left: 10px;
    margin-right: 10px;
  }
`

export const CloseContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
`

export const CardRowContainer = styled.div<{topRow?: boolean}>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: ${({ topRow }) => (topRow ? "flex-start" : "center")};
  margin: ${({ topRow }) => (topRow ? "0 0 20px 0" : "30px 0 0 0")};
`

export const GroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const CardColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const Location = styled.span`
  font-weight: 500;
  font-size: 32px;
  line-height: 36px;
  margin-bottom: 5px;
`

export const Date = styled.span`
  font-weight: 300;
  font-size: 28px;
  line-height: 32px;
`

export const FeelsLike = styled.span`
  color: ${({ theme }) => theme.grayColor};
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
`

export const Stats = styled.span`
  font-weight: 500;
  font-size: 22px;
  line-height: 28px;

  &:nth-child(2) {
    margin-bottom: 7px;
    margin-top: 7px;
  }
`

export const WeatherDescription = styled.div`
  font-weight: 400;
  font-size: 22px;
  line-height: 28px;
  color: ${({ theme }) => theme.grayColor};
`

export const ColorfulStats = styled.span<{ positiveTemp: boolean }>`
  color: ${({ positiveTemp, theme }) => (positiveTemp ? theme.hotStats : theme.coldStats)};
  font-weight: 600;
  font-size: 22px;
  line-height: 28px;
`

export const TempWrapper = styled.h4`
  font-style: normal;
  font-weight: bold;
  font-size: 68px;
  line-height: 100px;
  position: relative;
`

export const MeasureTypeWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  top: -15px;
  right: -120px;
  width: 125px;
`

export const Divider = styled.div`
  height: 45px;
  width: 4px;
  background: ${({ theme }) => theme.grayColor};
  margin-left: 5px;
`

export const GraphCanvas = styled.canvas`
  height: 400px;
`