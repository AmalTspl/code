import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Home() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['accesstoken', 'refreshtoken']);

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const refreshtoken = cookies.refreshtoken;
        const response = await axios.post('http://localhost:5000/refresh', { refreshtoken });

        const data = response.data;

        if (data.accesstoken) {
          console.log('New Access Token:', data.accesstoken);
          setCookie('accesstoken', data.accesstoken, { path: '/', httpOnly: true, secure: true });
        } else {
          setTimeout(refreshToken, 1000); // Retry after some time if no new token is received
        }
      } catch (error) {
        console.log('Token refresh failed:', error);
        navigate('/');
      }
    };

    // Call the refreshToken function when the component mounts
    refreshToken();
  }, [cookies, setCookie, navigate]);

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
    </div>
  );
}

export default Home;
