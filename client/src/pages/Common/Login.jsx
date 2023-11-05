import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Common/Navbar';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const LOGIN_URL = 'http://localhost:3001/api/signin';



//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Email:', email);
//     console.log('Password:', password);
//     console.log('Remember Me:', rememberMe);
//   };


  
  async function handleLogin() {

    // if (!user || !pwd) {
    //     setErrMsg('Missing Username or Password');
    //     userRef.current.focus();
    //     return;
    // }

    try {
         const response = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
      credentials: 'include', // Add this line to include credentials (cookies) in the request
    });

    

        console.log(JSON.stringify(response?.data));
        //console.log(JSON.stringify(response));
        const accessToken = response?.data?.access_token;


        const firstname = response?.data?.firstname;
        const lastname = response?.data?.lastname;

        const username = firstname + " " + lastname;
        console.log(username)



        navigate('/dashboard', {state: {username: username}});

    
        
      



        }
     catch (err) {

        console.log(err);
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
            setErrMsg('Invalid Email or Password');
        } else {
            setErrMsg('Login Failed');
        }
       
    }


}

  return (

    <div>
        <Navbar/>
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4 ">

            <div className='flex-col items-start justify-center w-full mx-0'>
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2 ">Email</label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md p-2 "
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              className="mr-2"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />

            <div className='flex items-center justify-between w-full'>
            <label htmlFor="rememberMe" className="text-sm text-gray-700 font-medium">Remember Me</label>
            <a href="/forgot-password" className="text-blue-500 text-sm">Forgot Password?</a>
            </div>
          </div>
          
            <button onClick={handleLogin} className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2" >Login</button>
           
     
        </form>
        <div className="mt-4 text-center flex ">
        <p className="text-gray-700 text-sm mx-2">Are you not registered yet?</p>
        <a href="/signup" className="text-blue-500 text-sm text-decoration-line: underline">Sign Up</a>
      </div>
      </div>
     
    </div>
    </div>
  );
}

export default LoginForm;
