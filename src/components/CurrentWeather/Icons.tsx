import React from 'react';
import { ReactComponent as Arrow } from '../../assets/arrow.svg';
import { ReactComponent as Globe } from '../../assets/globe.svg';
import { ReactComponent as Celsius } from '../../assets/celsius.svg';
import { ReactComponent as Fahrenheit } from '../../assets/fahrenheit.svg';
import { ReactComponent as Close } from '../../assets/close.svg';

interface IconProps {
  name: string
  size?: {
    height: string
    width: string
  }
  fill?: string
  isRotated?: boolean
  onClick?: () => void
}

export const Icons: React.FC<IconProps> = (props) => {
  let Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const rotate = `rotate(${props.isRotated ? "180deg" : "0deg"})`

  switch (props.name) {
    case 'celsius':
      Icon = Celsius;
      break;
    case 'fahrenheit':
      Icon = Fahrenheit;
      break;
    case 'globe':
      Icon = Globe;
      break;
    case 'arrow':
      Icon = Arrow;
      break;
    case 'close':
      Icon = Close;
      break;

    default:
      Icon = Arrow;
  }
  return <Icon onClick={props.onClick} style={{
    fill: props.fill || '',
    transform: rotate,
    transition: 'all 300ms',
    ...(props.size ? props.size : {}) }}
  />
};