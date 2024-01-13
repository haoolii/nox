import CloseIcon from '@mui/icons-material/Close';
import { IconButton, IconButtonProps } from '@mui/material';
import React from 'react';

const CloseButton: React.FC<IconButtonProps & { onClose: () => void }> = ({
  onClose,
  sx,
  ...props
}) => {
  const _sx = Object.assign(
    {
      p: 0,
      position: 'absolute',
      right: 16,
      top: 16,
      color: '#D8D8D8',
    },
    sx
  );

  return (
    <IconButton aria-label="close" onClick={onClose} sx={_sx} {...props}>
      <CloseIcon />
    </IconButton>
  );
};

export default CloseButton;
