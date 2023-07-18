import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SET_TOKEN, getUser } from '../redux/actions';
import { loginSuccess } from '../redux/reducers/AuthSliceReducer';
import { useNavigate } from 'react-router';

const GoogleCallback = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authorizationCode = urlParams.get('code');
        if (authorizationCode) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://localhost:3142/google/callback?code=${authorizationCode}`);
                    const data = await response.json();
                    if (response.ok) {
                        
                        dispatch({ type: SET_TOKEN, payload: data.accessToken });
                        dispatch(loginSuccess(data));
                        navigate('/home');
                        dispatch(getUser(data.accessToken));
                    } else {
                        console.log('Error trying to login');
                    }
                } catch (error) {
                    console.log(error);
                }
            };
    
            fetchData();
        } else {
            console.log('Error loading authorization, check your settings')
        }
    }, [dispatch, navigate]);

    return (
        <div className='spinner-container'>
            <div className="spinner-grow spinner-custom" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
        
        
    );
};

export default GoogleCallback;
