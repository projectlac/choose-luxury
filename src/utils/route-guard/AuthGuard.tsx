import { useRouter } from 'next/router';
// project imports
import useAuth from 'hooks/useAuth';
import { GuardProps } from 'types';
import { useEffect } from 'react';
import Loader from 'components/ui-component/Loader';
import { ROLE_PERMISSIONS } from 'utils/const';

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }: GuardProps) => {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      if ([ROLE_PERMISSIONS.USER].includes(user?.role?.toLocaleLowerCase() ?? ROLE_PERMISSIONS.USER)) {
        router.push('/');
      }
    }

    // if (user?.role !== 'Admin') {
    //   router.push('/login');
    // }
    // eslint-disable-next-line
  }, [isLoggedIn]);

  if (!isLoggedIn) return <Loader />;

  return children;
};

export default AuthGuard;
