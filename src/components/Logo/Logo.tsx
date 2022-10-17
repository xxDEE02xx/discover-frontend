import React from 'react';

import { ColorsEnum } from 'common/theme';

export interface LogoProps {
  height?: string;
  width?: string;
  viewBox?: string;
  color?: string;
}

const Logo: React.FC<LogoProps> = ({
  color = ColorsEnum.primary,
  height = '142.605',
  width = '240',
  viewBox = '0 0 142.605 240',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      viewBox={viewBox}
      data-testid="synthesis-logo-id"
      {...props}
    >
      <circle fill={color} cx="7.92" cy="7.92" r="7.92" transform="translate(63.383 45)" />
      <path fill={color} d="M0 0H14.621V14.621H0z" transform="translate(63.992 180.379)" />
      <path
        fill={color}
        d="M80.06 115.614l-10.658-3.112c-7.262-1.994-10.684-7.622-10.684-12.639 0-6.063 3.444-12.155 12.577-12.155 12.7 0 11.774 15.727 10.651 19.8h13.815l-.087-.94c-1.229-13.212-10.167-19.91-24.363-19.91-14.084 0-24.066 8.22-24.066 19.99a16.384 16.384 0 007.188 13.755c3.176 2.269 5.7 3.332 12.274 5.167l8.009 2.224c7.977 2.239 11.712 6.061 11.712 12.933 0 11.124-7.872 13.226-14.2 13.226-6.082 0-9.578-2.706-11.493-6.336-2.629-4.987-2.274-11.718-1.534-15.576h-14.2l.02.879c.151 6.808 2.724 12.4 7.44 16.186s11.346 5.713 19.668 5.713c15.477 0 25.477-8.2 25.477-20.88-.001-9.319-5.576-15.143-17.546-18.325z"
      />
    </svg>
  );
};

export default Logo;
