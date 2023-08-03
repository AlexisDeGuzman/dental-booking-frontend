import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import { useContext, useEffect } from 'react';

const Logout = () => {

  const { unsetUser, setUser } = useContext(UserContext);

  useEffect(() => {
    // remove token from the localStorage
    unsetUser();
    // set user back to null
    setUser({
      id: null,
      isAdmin: null
    })
  })

  return (
    <Navigate to = '/login'/>
  );
};

export default Logout;