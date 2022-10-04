import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Auth from '../utils/auth';

const SignOut = () => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    useEffect(() => {
        dispatch(Auth.logout())
        .then(() => {
            <Navigate to="/" replace={true} />
            // navigate("/", { replace: true });
            console.log('HIT DAT LOGOUT!');
        })
        
    });

    return;
};

export default SignOut;