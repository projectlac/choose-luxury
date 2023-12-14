import { styled } from '@mui/system';
import Profile from 'components/Profile/Profile';
import Footer from 'components/landingpage/Footer';
import Header from 'components/landingpage/Header';
import AppBar from 'ui-component/extended/AppBar';
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';

const HeaderWrapper = styled('div')(({ theme }) => ({
  overflowX: 'hidden',
  overflowY: 'clip'
}));

function ProfileIndex() {
  return (
    <div>
      <HeaderWrapper id="home">
        <AppBar />
        <Header />
      </HeaderWrapper>
      <Breadcrumbs />
      <Profile />
      <Footer />
    </div>
  );
}

export default ProfileIndex;
