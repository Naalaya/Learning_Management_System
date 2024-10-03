import { FC, useState, useEffect } from "react";

interface FloatingIconProps {
  Icon: FC<any>;
  className: string;
  delay: number;
}

const FloatingIcon: FC<FloatingIconProps> = ({ Icon, className, delay }) => {
  const [position, setPosition] = useState({
    x: Math.random() * 100,
    y: Math.random() * 100,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        x: Math.random() * 100,
        y: Math.random() * 100,
      });
    }, Math.random() * 5000 + 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`absolute transition-all duration-[5000ms] ease-in-out ${className}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        animationDelay: `${delay}ms`,
      }}
    >
      <Icon className="h-8 w-8 md:h-12 md:w-12" />
    </div>
  );
};

export default FloatingIcon;
