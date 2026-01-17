import React, { FC, ReactNode } from "react";

import './styles.css'

interface Props {
  children: ReactNode;
}

const Container: FC<Props> = ({ children }) => {
  return (
    <div className="container">
      <div className="content">{children}</div>
    </div>
  );
};

export default Container;
