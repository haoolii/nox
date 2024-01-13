import { Link, LinkProps } from '@mui/material';
import React from 'react';

import { useConfig } from '../contexts/ConfigContext';
import { Side } from '../core/type';

const AddressLink: React.FC<LinkProps & { address: string; side: Side }> = ({
  address,
  side,
  ...props
}) => {
  const { l1, l2 } = useConfig();

  return (
    <Link
      href={
        side === 'l1'
          ? `${l1.blockExplorers?.default.url}/address/${address}`
          : `${l2.blockExplorers?.default.url}/address/${address}`
      }
      rel="noopener noreferrer"
      target="_blank"
      {...props}
    >
      {`${address.slice(0, 8)}...${address.slice(-8)}`}
    </Link>
  );
};

export default AddressLink;
