import MoreVertIcon from '@mui/icons-material/MoreVert';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { IconButton, Link, List, ListItem, ListItemText, Popover, useTheme } from '@mui/material';
import { FC, ReactElement, useRef, useState } from 'react';
import { useAccount } from 'wagmi';

import { useConfig } from '../../contexts/ConfigContext';

type renderPopoverContent = (handleClose: () => void) => ReactElement;
interface ActionMenuProps {
  renderPopoverContent: renderPopoverContent;
}

function PopoverRenderer({ renderPopoverContent }: ActionMenuProps): ReactElement {
  const ref = useRef<any>(null);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const theme = useTheme();

  const toggleActionMenu = () => {
    setShowActionMenu(state => !state);
  };

  const closeActionMenu = () => {
    setShowActionMenu(false);
  };

  return (
    <>
      <IconButton
        onClick={toggleActionMenu}
        ref={ref}
        sx={{
          position: 'relative',
          right: '-6px',
          borderRadius: '4px',
          background: 'transparent',
          p: '6px',
        }}
      >
        <MoreVertIcon
          sx={{
            color: theme.palette.common.white,
            background: theme.colors.functional.container.dark,
            height: '30px',
            width: '30px',
            borderRadius: '4px',
            padding: '4px',
            transform: 'rotate(90deg)',
          }}
        />
      </IconButton>
      <Popover
        anchorEl={ref.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        onClose={closeActionMenu}
        open={showActionMenu}
        sx={{
          '.MuiPopover-paper': {
            background: theme.colors.functional.container.dark,
            p: 0,
          },
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {renderPopoverContent(closeActionMenu)}
      </Popover>
    </>
  );
}

const ActionMenuContent: FC<{ onClose: () => void }> = () => {
  const { l1, l2 } = useConfig();
  const { address } = useAccount();

  return (
    <List component="nav" sx={{ p: 1 }}>
      {[l1, l2].map(network => (
        <ListItem
          component={Link}
          href={`${network.blockExplorers?.default.url}/address/${address}`}
          key={network.id}
          rel="noopener noreferrer"
          target="_blank"
        >
          <OpenInNewIcon color="secondary" sx={{ width: 18, mr: 1 }} />
          <ListItemText primary={`View on ${network.name} explorer`} />
        </ListItem>
      ))}
    </List>
  );
};

const ActionMenu = () => (
  <PopoverRenderer
    renderPopoverContent={handleClose => <ActionMenuContent onClose={handleClose} />}
  />
);

export default ActionMenu;
