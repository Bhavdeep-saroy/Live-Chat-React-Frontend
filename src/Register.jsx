import React from 'react'
import { useState,useEffect } from 'react';



export default function Login() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const tokenValue = localStorage.getItem('token');
    if (tokenValue) {
      setToken(tokenValue);
    } else {
      console.log('No token found.');
    }
  }, []); 
   const [email, setEmail] = useState('');
   const [fullName, setfullName] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setconfirmPassword] = useState('');
   const [otp, setOTP] = useState('');
   const [registerError, setregisterError] = useState('');
   
   const emailErrorMessage = registerError.split(', ').find(message => message.includes('email'));
    

   const otpHandleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4080/api/v1/users/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), 
      });
  
      const responseData = await response.json(); 

     if (!response.ok) {
      if (responseData.error) {
        throw new Error(responseData.error);
      } else {
        throw new Error('An error occurred during login');
      }
    }
     localStorage.setItem('userEmail', email);
      // setEmail('');
      setregisterError('');
      $('#hideOtpForm').hide();
      $('#showVerifyForm').show();
      alert("OTP sand your Email Address");

    } catch (error) {
      console.error('Error logging in:', error);
      setregisterError(error.message); 

      
    }
  };
  const verifyHandleSubmit = async (event) => {
    event.preventDefault();
    try {
    
      const response = await fetch('http://localhost:4080/api/v1/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email,password, confirmPassword, otp, fullName }), 
      });
      const responseData = await response.json(); 

     if (!response.ok) {
      if (responseData.error) {
        throw new Error(responseData.error);
      } else {
        throw new Error('An error occurred during login');
      }
    }
      setfullName('');
      setPassword('');
      setconfirmPassword('');
      setOTP('');
      setregisterError('');
      $('#myRegisterModal').modal('hide');
      alert("User Registretion successfully");

    } catch (error) {
      console.error('Error logging in:', error);
      setregisterError(error.message); 

      
    }
  };
  
   
  return (
    <div>
         {token !== '' ? (
      <p></p>
      ) : (
        <button  data-toggle="modal" data-target="#myRegisterModal">Sin Up</button>
      )}
       


  {/* <!-- Modal --> */}
  <div className="modal fade" id="myRegisterModal" role="dialog">
    <div className="modal-dialog">
    
      {/* <!-- Modal content--> */}
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Register Form</h4>
          <button type="button" className="close" data-dismiss="modal">&times;</button>
           <>{registerError && <p className="text-danger">{registerError}</p>}  </>
        </div>
        <div className="modal-body">
          <form id="hideOtpForm" onSubmit={otpHandleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email:</label>
          <input  className="form-control" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {emailErrorMessage && <p className="text-danger">{emailErrorMessage}</p>}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
           {/* Verify Form OTP and Email      start*/}
      </form>
      <form style={{ display: 'none' }} id="showVerifyForm" onSubmit={verifyHandleSubmit} className="login-form">
       <div className="form-group">
                                    <label htmlFor="userEmail" className="form-label">User Email:</label>
                                    <input
                                        className="form-control"
                                        id="userEmail"
                                        placeholder="Enter email"
                                        value={email} // Use the same email state
                                        disabled
                                        onChange={(e) => setEmail(e.target.value)} 
                                    />
                                    {/* {emailErrorMessage && <p className="text-danger">{emailErrorMessage}</p>} */}
                                </div>
                
            
        <div className="form-group">
          <label htmlFor="fullName" className="form-label">Full Name:</label>
          <input  className="form-control" id="fullName" placeholder="Enter Full Name" value={fullName} onChange={(e) => setfullName(e.target.value)} />
          {/* {fullNameErrorMessage && <p className="text-danger">{fullNameErrorMessage}</p>} */}
        </div>
        <div className="form-group">
          <label htmlFor="otp" className="form-label">OTP:</label>
          <input  className="form-control" id="otp" placeholder="Enter OTP" value={otp} onChange={(e) => setOTP(e.target.value)} />
          {/* {otpErrorMessage && <p className="text-danger">{otpErrorMessage}</p>} */}
        </div>
         <div className="form-group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input  className="form-control" id="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {/* {passwordErrorMessage && <p className="text-danger">{passwordErrorMessage}</p>} */}
        </div>
         <div className="form-group">confirmPassword
          <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
          <input  className="form-control" id="confirmPassword" placeholder="Enter confirmPassword" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} />
          {/* {confirmPasswordErrorMessage && <p className="text-danger">{confirmPasswordErrorMessage}</p>} */}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {/* Verify Form OTP and Email           End*/}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>
    </div>
  )
}
