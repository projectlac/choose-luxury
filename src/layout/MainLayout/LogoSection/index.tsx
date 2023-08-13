import Link from 'Link';
// material-ui
import { Link as MuiLink } from '@mui/material';
import Image from 'next/image';
// project imports
import { DASHBOARD_PATH } from 'config';
import Logo from 'assets/header/logo.png';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
  <MuiLink component={Link} href={DASHBOARD_PATH}>
    <Image alt="logo" src={Logo.src} width={60} height={48} objectFit="contain"></Image>
  </MuiLink>
);

export default LogoSection;
