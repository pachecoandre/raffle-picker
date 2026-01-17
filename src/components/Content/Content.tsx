import React, { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  justifyCenter?: boolean;
}

const Content: FC<Props> = ({ children, justifyCenter }) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default Content;
