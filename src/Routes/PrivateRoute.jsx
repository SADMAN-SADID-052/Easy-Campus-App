import { useContext } from 'react';

import { Navigate, useLocation } from 'react-router';
import Loading from '../Components/Loading';
import { AuthContext } from '../Provider/AuthProvider';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location = useLocation();


    if(loading)
    {

        return <Loading></Loading>
    }

    if(user && user?.email)
    {

        return children;
    }
    return (
        <div>

            <Navigate state={location.pathname} to={"/auth/login"}></Navigate>
            
        </div>
    );
};

export default PrivateRoute;