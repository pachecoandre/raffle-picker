import React, { FC, ReactNode } from 'react';

interface Props {
  mt?: number;
  mb?: number;
  children?: ReactNode;
}

const Section: FC<Props> = ({ mt = 2, mb = 4, children }) => (
  <div
    style={{
      marginTop: `${mt * 8}px`,
      marginBottom: `${mb * 8}px`
    }}
  >
    {children}
  </div>
);

export default Section;
