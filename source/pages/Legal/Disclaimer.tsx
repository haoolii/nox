import { Button, Container, Stack, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Disclaimer = () => {
  return (
    <Container sx={{ pt: 3 }}>
      <Stack spacing={1} sx={{ color: '#fff' }}>
        <Typography mb={1} variant="h2">
          Disclaimer
        </Typography>
        <Typography component="p">
          The AltLayer Rollup Bridge available at {window.location.origin} has been developed by Alt
          Research Ltd. Use of the AltLayer Rollup Bridge is at the sole risk of the user. The
          service is provided on an “as is”, and “as available” basis. Alt Research Ltd expressly
          disclaims all warranties of any kind, whether express, implied or statutory, including the
          implied warranties of merchantability, fitness for a particular purpose, title, and
          non-infringement.
        </Typography>
        <Typography component="p">
          Alt Research Ltd. makes no warranty that (a) the service will meet your requirements; (b)
          the service will be uninterrupted, timely, secure, or error-free; (c) the results that may
          be obtained from the use of the service will be accurate or reliable; or (d) the quality
          of any products, services, applications, information, or other material purchased or
          obtained by you through the service will meet your expectations.
        </Typography>
        <Typography component="p">
          By accessing and using the service, you represent and warrant that you understand the
          inherent risks associated with using cryptographic and blockchain-based systems, and that
          you have a working knowledge of the usage and intricacies of digital assets, such as those
          following the ethereum token standard (ERC-20) and bridging across different blockchain
          solutions. You further understand that the markets for these digital assets are highly
          volatile due to various factors, including adoption, speculation, technology, security,
          and regulation.
        </Typography>
        <Typography component="p">
          You acknowledge and accept that the cost and speed of transacting with cryptographic and
          blockchain-based systems such as Ethereum are variable and may increase dramatically at
          any time. You further acknowledge and accept the risk that your digital assets may lose
          some or all of their value while they are supplied to the protocol through the interface,
          you may suffer loss due to the fluctuation of prices of tokens in a trading pair or
          liquidity pool, and, especially in expert modes, experience significant price slippage and
          cost. you understand that anyone can create a token, including fake versions of existing
          tokens and tokens that falsely claim to represent projects, and acknowledge and accept the
          risk that you may mistakenly trade those or other tokens. You further acknowledge that we
          are not responsible for any of these variables or risks, and cannot be held liable for any
          resulting losses that you experience while accessing or using the service. Accordingly,
          you understand and agree to assume full responsibility for all of the risks of accessing
          and using the service.
        </Typography>
        <Typography component="h4" pt={1} variant="h4">
          Limitation of Liability
        </Typography>
        <Typography component="p">
          You expressly understand and agree that Alt Research Ltd. will not be liable for any
          indirect, incidental, special, consequential, exemplary damages, or damages for loss of
          profits including damages for loss of goodwill, use, or data or other intangible losses
          (even if Alt Research Ltd. has been advised of the possibility of such damages), whether
          based on contract, tort, negligence, strict liability, or otherwise, resulting from: (a)
          the use or the inability to use the service; (b) the cost of procurement of substitute
          goods and services resulting from any goods, data, information, or services purchased or
          obtained or messages received or transactions entered into through or from the service;
          (c) unauthorised access to or alteration of your transmissions or data; (d) statements or
          conduct of any third party on the service; (e) interruption or cessation of function
          related to the interface; (f) bugs, viruses, trojan horses, or the like that may be
          transmitted to or through the interface; (g) errors or omissions in, or loss or damage
          incurred as a result of the use of, any content made available through the interface; or
          (h) any other matter relating to the service.
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="center" my={3}>
        <Button
          component={NavLink}
          fullWidth
          sx={{ textTransform: 'none' }}
          to="/deposit"
          variant="contained"
        >
          Back to home
        </Button>
      </Stack>
    </Container>
  );
};

export default Disclaimer;
