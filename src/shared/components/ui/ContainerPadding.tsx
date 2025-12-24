import React from "react";

export const ContainerPadding = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="py-28">{children}</div>;
};
