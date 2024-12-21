// import './App.css';
// import Header from './Header';
// import React, { useState, useEffect } from 'react';
// import UsersList from './UsersList';

// function App() {
//   const [sandMsgError, setSandMsgError] = useState('');
//   const [sandMsg, setSandMsg] = useState('');
//   const [SenderId, setSenderId] = useState('');
//   const [ReceiverId, setReceiverId] = useState('');
//   const [senderLoop, setSenderLoop] = useState([]);
//   const [receiverLoop, setReceiverLoop] = useState([]);
//   const [token, setToken] = useState('');
//   const [sender, setSender] = useState('');
//   const [receiver, setReceiver] = useState('');


//   useEffect(() => {
//     const senderIdValue = localStorage.getItem('SenderId');
//     if (senderIdValue) {
//       setSenderId(senderIdValue);
//     } else {
//       console.log('No SenderId found.');
//     }

//     const ReceiverIdValue = localStorage.getItem('ReceiverId');
//     if (ReceiverIdValue) {
//       setReceiverId(ReceiverIdValue);
//     } else {
//       console.log('No ReceiverId found.');
//     }

//     const tokenValue = localStorage.getItem('token');
//     if (tokenValue) {
//       setToken(tokenValue);
//     } else {
//       console.log('No token found.');
//     }

//     if (SenderId && ReceiverId && token) {
//       senderHandleSubmit();
//       receiverHandleSubmit();
//     }
//   }, [SenderId, ReceiverId, token]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       if(!ReceiverId){
//         throw new Error('Please select User');
//       }
//     var currentTime = new Date();
//     var date = currentTime.toLocaleDateString();
//     var time = currentTime.toLocaleTimeString();

//       const response = await fetch('http://localhost:4080/api/v1/chat/message', {
       
//         method: 'POST',
//         headers: {
//            Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
        
//         body: JSON.stringify({ sandMsg,SenderId,ReceiverId, date, time }),
//       });

//       const responseData = await response.json();

//       if (!response.ok) {
//         if (responseData.error) {
//           throw new Error(responseData.error);
//         } else {
//           throw new Error('An error occurred during login');
//         }
//       }

//       setSandMsg('');
//       alert('Message sent successfully');
//       window.location.reload();
//     } catch (error) {
//       console.error("Error sending message: ", error);
//       setSandMsgError('Failed to send message. Please try again.');
//     }
//   };

//   const senderHandleSubmit = async () => {
//     try {
//       const sender = SenderId;
//       const receiver = ReceiverId;
//       const response = await fetch('http://localhost:4080/api/v1/chat/get-Sending-Message', {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ sender, receiver }),
//       });
//       const responseData = await response.json();

//       if (!response.ok) {
//         throw new Error(responseData.error || 'An error occurred during fetching sending messages');
//       }

//       setSenderLoop(responseData.data);
//     } catch (error) {
//       console.error('Error fetching sending messages:', error);
//     }
//   };

//   const receiverHandleSubmit = async () => {
//     try {
//       const sender = ReceiverId;
//       const receiver = SenderId;
//       const response = await fetch('http://localhost:4080/api/v1/chat/get-Receiving-Message', {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ sender, receiver }),
//       });
//       const responseData = await response.json();

//       if (!response.ok) {
//         throw new Error(responseData.error || 'An error occurred during fetching receiving messages');
//       }

//       setReceiverLoop(responseData.data);
//     } catch (error) {
//       console.error('Error fetching receiving messages:', error);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="container">
//   <div className="row">
//     <div className="col-sm-3">
//     <UsersList />
//     </div>
//     <div className="col-sm-9">
//  <div className="container">
//         <div className="chat-container">
// {ReceiverId !== '' ? (
//         <div >
//           {receiverLoop?.map(user => (
//             <div key={user.id} >
//                 <div className="chat-message other-message">
//             <div>
//               <p>{user.content}</p>
//               <p>{user.time}</p>
//             </div>
//           </div>
//               </div>
//           ))}
//         </div>
//       ) : (
//                 <p>Hi! I have a question about your products.</p>
//       )}
           
            
//           {/* /////////////////////// */}
//           {SenderId !== '' ? (
//         <div >
//           {senderLoop?.map(user => (
//             <div key={user.id} >
//                 <div className="chat-message user-message">
//             <div>
//               <p>{user.content}</p>
//               <p>{user.time}</p>
//             </div>
//           </div>
//               </div>
//           ))}
//         </div>
//       ) : (
//                 <p>Hi! I have a question about your products.</p>
//       )}
//           {/* //////////////////// */}
//           <form onSubmit={handleSubmit} className="message-form">
//             <input
//               type="text"
//               className="message-input"
//               id="sandMsg"
//               placeholder="Type your message..."
//               value={sandMsg}
//               onChange={(e) => setSandMsg(e.target.value)}
//             />

//             <button type="submit" className="send-button">Send</button>
//           </form>
//         </div>
//       </div>
//     </div>
    
//   </div>
// </div>
   
      
//     </>
//   );
// }

// export default App;
