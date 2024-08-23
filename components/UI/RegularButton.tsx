import React, { useState } from 'react';
import { darkenColor } from '../../utils';

interface RegularButtonProps {
  onClick: () => void;
  color?: string;
  textColor?: string;
  children: React.ReactNode;
  svgIcon?: string;
  darkenPercent?: number;
}

export default function RegularButton({
  onClick,
  color = '#05a1ff',
  textColor = 'white',
  children,
  svgIcon,
  darkenPercent = 0.1,
}: RegularButtonProps) {
  const [hover, setHover] = useState(false);

  const buttonHover = darkenColor(color, darkenPercent);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        backgroundColor: hover ? buttonHover : color,
        color: textColor,
      }}
      className="px-4 py-2 rounded mr-2 flex items-center cursor-pointer transition-colors duration-200"
    >
      {svgIcon && (
        <img src={svgIcon} alt="icon" className="mr-2 pointer-events-none" />
      )}
      {children}
    </button>
  );
}