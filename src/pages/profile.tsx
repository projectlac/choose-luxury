import { styled } from '@mui/system';
import Profile from 'components/Profile/Profile';
import Footer from 'components/landingpage/Footer';
import Header from 'components/landingpage/Header';
import useAuth from 'hooks/useAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AppBar from 'ui-component/extended/AppBar';
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';

const HeaderWrapper = styled('div')(({ theme }) => ({
  overflowX: 'hidden',
  overflowY: 'clip'
}));

const ProfileIndex = () => {
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    if (!user || !user.id) router.push('/login');
  }, [router, user]);
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
};

export default ProfileIndex;
