import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '~/lib/firebase';

const withAuthCheck = (WrappedComponent: React.ComponentType<any>) => {
  const WithAuthCheck: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const auth = useAuth();
    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
      if (auth) {
        const unsubscribe = auth.onAuthStateChanged((authUser: any) => {
          if (authUser) {
            if (location.pathname === '/login') {
              navigate('/');
              setUser(authUser);
            }
          } else {
            setUser(null);
            navigate('/login');
          }
        });
        return () => unsubscribe();
      }
    }, [auth, location]);

    return <WrappedComponent user={user} />;
  };

  WithAuthCheck.displayName = `WithAuthCheck(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuthCheck;
};

export default withAuthCheck;
