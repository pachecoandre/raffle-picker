import { Space } from 'antd';
import React, { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  backLink?: string;
  configUrl?: string;
  children: ReactNode;
}

const Title: FC<Props> = ({ backLink, children, configUrl }) => {
  return (
    <Space>
      {backLink && <a href={backLink} />}
      <div><h1>{children}</h1></div>
      {configUrl && <Link to={configUrl}>edit</Link>}
    </Space>
  );
};

export default Title;
