import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useTheme } from '@mui/material';
import { ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';

const LinkArrow: React.FC<
  { to: string; label: ReactNode; style?: React.CSSProperties } & LinkProps
> = ({ label, style: _style, to, ...props }) => {
  const theme = useTheme();
  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    fontWeight: 500,
    ..._style,
  };

  return (
    <Link style={style} to={to} {...props}>
      {label}
      <ArrowForwardRoundedIcon
        sx={{
          height: '20px',
          marginLeft: '9px',
          path: { fill: theme.colors.functional.text.link },
        }}
      />
    </Link>
  );
};

export default LinkArrow;
