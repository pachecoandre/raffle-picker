import React, { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  backLink?: string;
  configUrl?: string;
  children: ReactNode;
}

const Title: FC<Props> = ({ backLink, children, configUrl }) => {
  return (
    <div>
      {backLink && <a href={backLink} />}
      <h1>{children}</h1>
      {configUrl && <Link to={configUrl}>edit</Link>}
    </div>
  );
};

export default Title;
