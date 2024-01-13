import { Container, ContainerProps, Link, Stack, styled, Typography } from '@mui/material';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

const FooterWrapper = styled(Container)(
  ({ theme }) => `
        margin-top: ${theme.spacing(4)};
`
);

const Footer: FC<ContainerProps> = ({ ...rest }) => {
  return (
    <FooterWrapper className="footer-wrapper" {...rest}>
      <Stack justifyContent="center" spacing={1}>
        <Typography color="#A4A4B2" fontSize={10}>
          By using this product, you acknowledge having read the{' '}
          <Link
            component={NavLink}
            sx={{ color: theme => theme.palette.common.white, textDecoration: 'underline' }}
            to={'/privacy-policy'}
          >
            privacy policy
          </Link>
          &nbsp;and&nbsp;
          <Link
            component={NavLink}
            sx={{ color: theme => theme.palette.common.white, textDecoration: 'underline' }}
            to={'/legal-disclaimer'}
          >
            legal disclaimer
          </Link>
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          pb={4}
          textAlign={{ xs: 'center', md: 'left' }}
        >
          <Typography color="#A4A4B2" variant="subtitle1">
            &copy; 2023 - Rollup Bridge
          </Typography>
          <Typography
            color="#A4A4B2"
            sx={{
              pt: 0,
            }}
            variant="subtitle1"
          >
            A product of{' '}
            <Link href="https://altlayer.io/" rel="noopener noreferrer" target="_blank">
              altlayer.io
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </FooterWrapper>
  );
};

export default Footer;
