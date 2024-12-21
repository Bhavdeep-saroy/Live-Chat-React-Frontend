import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const ENDPOINT = "http://localhost:4080";
 const socket = io(ENDPOINT, { transports: ['websocket'] });

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const emailErrorMessage = loginError.split(', ').find(message => message.includes('email'));
  const passwordErrorMessage = loginError.split(', ').find(message => message.includes('password'));
   const [token, setToken] = useState('');
   const [SenderId, setSenderId] = useState();

  useEffect(() => {
    const tokenValue = localStorage.getItem('token');
    if (tokenValue) {
      setToken(tokenValue);
    } else {
      console.log('No token found.');
    }
  }, []); 
  useEffect(() => {
    const SenderIdValue = localStorage.getItem('SenderId');
    if (SenderIdValue) {
      setSenderId(SenderIdValue);
    } else {
      console.log('No SenderId found.');
    }
  }, []); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4080/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), 
      });
  
      const responseData = await response.json(); 

      if (!response.ok) {
        if (responseData.error) {
          throw new Error(responseData.error);
        } else {
          throw new Error('An error occurred during login');
        }
      }

 
     

      const newToken = responseData.token; 
      localStorage.setItem('token', newToken);
      const SenderId = responseData.user._id;
      localStorage.setItem('SenderId', SenderId);

      setEmail('');
      setPassword('');
      setLoginError('');
      $('#myLoginModal').modal('hide');
      window.location.reload();
      alert('Login successful');

    } catch (error) {
      console.error('Error logging in:', error);
      setLoginError(error.message); 
    }
  };

  const logouthandleSubmit = async () => {
    try {

      const response = await fetch('http://localhost:4080/api/v1/users/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({SenderId}), 
        
      });
            console.log("hello       =-=-=-=",SenderId);

      if (!response.ok) {
        const responseData = await response.json();
        let errorMessage = responseData.error || 'An error occurred during logout';
        throw new Error(errorMessage);
      }
      socket.disconnect();
      localStorage.removeItem('ReceiverId');
      localStorage.removeItem('SenderId');
      localStorage.removeItem('token');
      window.location.reload();
      alert('Logout successful');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  return (
    <div>
      {token !== '' ? (
        <button onClick={logouthandleSubmit}>Logout</button>
      ) : (
        <button data-toggle="modal" data-target="#myLoginModal">Login</button>
      )}

      {/* Modal */}
      <div className="modal fade" id="myLoginModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Login Form</h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              {loginError && <p className="text-danger">{loginError}</p>}
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input className="form-control" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  {emailErrorMessage && <p className="text-danger">{emailErrorMessage}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="pwd" className="form-label">Password:</label>
                  <input type="password" className="form-control" id="pwd" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  {passwordErrorMessage && <p className="text-danger">{passwordErrorMessage}</p>}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
