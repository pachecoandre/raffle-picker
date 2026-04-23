import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Logo: React.FC = () => {
  return (
    <Link className="logo-text" to={'/'}>
      <div className="logo-wrapper">
        <span>Raffle Fun</span>
      </div>
    </Link>
  );
};

export default Logo;
