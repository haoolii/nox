import { Breadcrumbs as MuiBreadcrumbs, BreadcrumbsProps, Link, Typography } from '@mui/material';
import React from 'react';

const Breadcrumbs: React.FC<BreadcrumbsProps & { links: { href?: string; name: string }[] }> = ({
  links,
  ...props
}) => {
  return (
    <MuiBreadcrumbs {...props}>
      {links.map((link, i) =>
        link.href ? (
          <Link color="text.secondary" href={link.href} key={i} underline="hover">
            {link.name}
          </Link>
        ) : (
          <Typography color="text.primary" key={i}>
            {link.name}
          </Typography>
        )
      )}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
