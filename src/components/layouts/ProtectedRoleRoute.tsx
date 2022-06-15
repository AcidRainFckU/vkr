import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { User } from '../../redux/user/types';

interface Props {
  redirectPath?: string;
  condition: string[];
  children: JSX.Element;
}

const ProtectedRoute: FC<Props> = ({ redirectPath = '/', condition, children }) => {
  const user: User = useAppSelector((store) => store.user);

  if (user) {
    if (!condition.includes(user.role)) {
      return <Navigate to={redirectPath} replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
