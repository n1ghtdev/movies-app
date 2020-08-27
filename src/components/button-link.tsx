import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

type Props = {
  to: string;
  children: React.ReactNode;
};

function ButtonLink({ to, children }: Props) {
  return (
    <Button
      style={{ color: '#fff', fontWeight: 'bold' }}
      component={Link}
      to={to}
    >
      {children}
    </Button>
  );
}

export default ButtonLink;
