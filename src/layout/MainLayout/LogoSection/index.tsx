import Link from 'Link';
// material-ui
import { Link as MuiLink } from '@mui/material';
// project imports
import Logo from 'assets/header/logo.png';
import { DASHBOARD_PATH } from 'config';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
  <MuiLink component={Link} href={DASHBOARD_PATH}>
    <img alt="logo" src={Logo.src} width={60} height={48}></img>
  </MuiLink>
);

export default LogoSection;
