import type { ReactNode } from "react";

const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={`max-w-[1500px] mx-auto px-8 w-full ${className}`}>
      {children}
    </div>
  );
};

export default Container;
