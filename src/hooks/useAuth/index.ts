import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const useAuth = () => {
  const { access, refresh, permissions } = useSelector(
    (state: RootState) => state.auth
  );

  const isAuthenticated = !!access && !!refresh;

  const hasPermission = (requiredPermissions: string[]) => {
    return requiredPermissions.some((permission) =>
      permissions.includes(permission)
    );
  };

  return { isAuthenticated, hasPermission };
};

export default useAuth;