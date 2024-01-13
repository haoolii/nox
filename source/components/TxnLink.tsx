import { Link, LinkProps } from '@mui/material';
import React from 'react';

import { useConfig } from '../contexts/ConfigContext';
import { Side } from '../core/type';

const TxnLink: React.FC<LinkProps & { txnHash: string; side: Side; size?: number }> = ({
  side,
  size = 16,
  txnHash,
  ...props
}) => {
  const { l1, l2 } = useConfig();

  return (
    <Link
      href={
        side === 'l1'
          ? `${l1.blockExplorers?.default.url}/tx/${txnHash}`
          : `${l2.blockExplorers?.default.url}/tx/${txnHash}`
      }
      rel="noopener noreferrer"
      target="_blank"
      {...props}
    >
      {`${txnHash.slice(0, size)}${size < txnHash.length && '...'}`}
    </Link>
  );
};

export default TxnLink;
