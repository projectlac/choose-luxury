import { useEffect } from 'react';
import { useRouter } from 'next/router';

// project imports
import useAuth from 'hooks/useAuth';
import { DASHBOARD_PATH } from 'config';
import { GuardProps } from 'types';
import Loader from 'components/ui-component/Loader';
import { ROLE_PERMISSIONS } from 'utils/const';

// ==============================|| GUEST GUARD ||============================== //

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */

const GuestGuard = ({ children }: GuardProps) => {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      if ([ROLE_PERMISSIONS.ADMIN, ROLE_PERMISSIONS.STAFF].includes(user?.role?.toLocaleLowerCase() ?? ROLE_PERMISSIONS.USER))
        router.push(DASHBOARD_PATH);
      else {
        router.push('/');
      }
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);

  if (isLoggedIn) return <Loader />;

  return children;
};

export default GuestGuard;
