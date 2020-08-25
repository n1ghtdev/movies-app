import { useSelector } from 'react-redux';
import { RootState } from 'src/modules/reducers';

export default function useAuth() {
  const { user, isAuthorized } = useSelector((state: RootState) => state.user);

  return { user, isAuthorized };
}
