import './App.css';
import Header from './Header';
import React, { useState, useEffect } from 'react';
import UsersList from './UsersList';
import io from 'socket.io-client';


const ENDPOINT = "http://localhost:4080";

function App() {
  const [sandMsgError, setSandMsgError] = useState('');
  const [sandMsg, setSandMsg] = useState('');
  const [SenderId, setSenderId] = useState('');
  const [ReceiverId, setReceiverId] = useState('');
  const [senderLoop, setSenderLoop] = useState([]);
  const [receiverLoop, setReceiverLoop] = useState([]);
  const [token, setToken] = useState('');
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [showOptionsArray, setShowOptionsArray] = useState([]);
  let socket;


useEffect(() => {
   const socket = io(ENDPOINT, { transports: ['websocket'] });
  socket.on('login', (data) => {
      handleLoginStatus();
    })
    socket.on('logout', (data) => {
      handleLogoutStatus();
    })
}, [])


  useEffect(() => {
 const socket = io(ENDPOINT, { transports: ['websocket'] });

  socket.on('connect', () => {
    console.log("connection complete successfully");
    const Sender_Id = localStorage.getItem('SenderId');
    console.log('Connected', Sender_Id);

    socket.emit('joined', { Sender_Id });

    socket.on('welcome', (data) => {
        console.log(data); 
    });

    socket.on('userJoined', (data) => {
        console.log(data);
    });
});


  socket.on('selectUserChatData', (data) => {
     const ReceiverIdValue = localStorage.getItem('ReceiverId');
    if (ReceiverIdValue) {
      setReceiverId(ReceiverIdValue);
    } else {
      console.log('No ReceiverId found.');
    }
  
        setSenderLoop(data.selectUserChatLIST);
  })

  socket.on('sendMessage', (data) => {
    setSenderLoop(data.messages);
    document.getElementById('sandMsg').value = "";
  })

  socket.on('removeloop', (data) => {
    setSenderLoop(data.messages);
    document.getElementById('sandMsg').value = "";
  })
  

  return () => {

    socket.disconnect();
  };
}, []); 




  const toggleOptions = (index) => {
    const newShowOptionsArray = [...showOptionsArray]; 
    newShowOptionsArray[index] = !newShowOptionsArray[index]; 
    setShowOptionsArray(newShowOptionsArray); 
  };

useEffect(() => {
    const socket = io(ENDPOINT, { transports: ['websocket'] });
    socket.on('messageAPP', (data) => {
      setSenderLoop(data.chat);
    })
    socket.on('changeUser',(data) => {
      const ReceiverIdValue = localStorage.getItem('ReceiverId');
    if (ReceiverIdValue) {
      setReceiverId(ReceiverIdValue);
    } 
    })

}, [])
  useEffect(() => {
    const senderIdValue = localStorage.getItem('SenderId');
    if (senderIdValue) {
      setSenderId(senderIdValue);
    } else {
      console.log('No SenderId found.');
    }

    const ReceiverIdValue = localStorage.getItem('ReceiverId');
    if (ReceiverIdValue) {
      setReceiverId(ReceiverIdValue);
    } else {
      console.log('No ReceiverId found.');
    }

    const tokenValue = localStorage.getItem('token');
    if (tokenValue) {
      setToken(tokenValue);
    } else {
      console.log('No token found.');
    }

    if (SenderId && ReceiverId && token) {
      // senderHandleSubmit();
      // chatData();
      chatSocket();
     
    }
  }, [SenderId, ReceiverId, token]);

  // const chatData = async () => {
  //    const socket = io(ENDPOINT, { transports: ['websocket'] });
  //     socket.emit('selectUserChat',({data: "ok"}));
  // }


  const handleLoginStatus = async () => {
    try {

      const response = await fetch('http://localhost:4080/api/v1/users/login-status', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
         body: JSON.stringify({ SenderId }),

      });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'An error occurred during fetching sending messages');
      }
      // chatSocket()
;
    } catch (error) {
      console.error('Error fetching sending messages:', error);
    }
  };
  const handleLogoutStatus = async () => {
    try {

      const response = await fetch('http://localhost:4080/api/v1/users/logout-status', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
         body: JSON.stringify({ SenderId }),

      });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'An error occurred during fetching sending messages');
      }
      // chatSocket()
;
    } catch (error) {
      console.error('Error fetching sending messages:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
 
    try {
      if(!ReceiverId){
        throw new Error('Please select User');
      }
    var currentTime = new Date();
    var date = currentTime.toLocaleDateString();
    var time = currentTime.toLocaleTimeString();
  

      const response = await fetch('http://localhost:4080/api/v1/chat/message', {
       
        method: 'POST',
        headers: {
           Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({ sandMsg,SenderId,ReceiverId, date, time }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (responseData.error) {
          throw new Error(responseData.error);
        } else {
          throw new Error('An error occurred during login');
        }
      }

      setSandMsg('');
      chatSocket();
      // alert('Message sent successfully');
    } catch (error) {
      console.error("Error sending message: ", error);
      setSandMsgError('Failed to send message. Please try again.');
    }
  };

   const handlesocket = async (event) => {
      event.preventDefault();
       document.getElementById('sandMsg').value = "";
       if (!sandMsg.trim()) {
            return;
        }

        setSandMsg('');
      console.log("hello");
       const socket = io(ENDPOINT, { transports: ['websocket'] });
      socket.emit('message', { sandMsg, SenderId, ReceiverId });
     
    };

  const handleSubmitokcheck = async (event) => {
    event.preventDefault();
  
try{ 
      const response = await fetch('http://localhost:4080/api/v1/chat/message', {
       
        method: 'GET',
        headers: {
           Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        
        
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (responseData.error) {
          throw new Error(responseData.error);
        } else {
          throw new Error('An error occurred during login');
        }
      }


      alert('Message  successfullyfgdgdfgdf');
    } catch (error) {
      console.error("Error sending message: ", error);
      setSandMsgError('Failed to send message. Please try again.');
    }
  };


  const senderHandleSubmit = async () => {
    try {

      const response = await fetch('http://localhost:4080/api/v1/chat/get-user-chat', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },

      });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'An error occurred during fetching sending messages');
      }

      // setSenderLoop(responseData.data);
    } catch (error) {
      console.error('Error fetching sending messages:', error);
    }
  };

  const handleEdit = () => {
    // Implement edit functionality
    console.log("Edit clicked");
  };

  const handleDelete = async (removeId) => {
    try {

      const response = await fetch('http://localhost:4080/api/v1/chat/message-remove', {
        method: 'delete',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
         body: JSON.stringify({ removeId }),

      });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'An error occurred during fetching sending messages');
      }
      chatSocket()
      // alert('Message remove successfully');
      // window.location.reload();
    } catch (error) {
      console.error('Error fetching sending messages:', error);
    }
  };

  const handleDeleteSocket = async (removeId ) => {
      
      console.log("removeId", removeId)
       const socket = io(ENDPOINT, { transports: ['websocket'] });
      socket.emit('removeMessage', { removeId,SenderId, ReceiverId });
      
    };
 
const chatSocket = async () => {
  
try{ 
      const response = await fetch('http://localhost:4080/api/v1/chat/get-chat-data', {
       
        method: 'GET',
        headers: {
           Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        
        
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (responseData.error) {
          throw new Error(responseData.error);
        } else {
          throw new Error('An error occurred during login');
        }
      }


      // alert('Message  successfully');
    } catch (error) {
      console.error("Error sending message: ", error);
      setSandMsgError('Failed to send message. Please try again.');
    }
  };
  return (
    <>
      <Header />
      <div className="container">
  <div className="row">
    <div className="col-sm-3">
    <UsersList />
    </div>
    <div className="col-sm-9">
 <div className="container">
        <div className="chat-container">
 {senderLoop?.map((user, index) => (
        <div key={user.id}>
          <div>
            {user.SenderId === ReceiverId && user.ReceiverId === SenderId ? (
              <div className="chat-message other-message">
                <p>{user.content}</p>
              </div>
            ) : null}
            {user.SenderId === SenderId && user.ReceiverId === ReceiverId ? (
              <div className="chat-message user-message">
                <p>{user.content}</p>
                <div className="dropdown">
                  <div onClick={() => toggleOptions(index)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
</svg></div>
                  {showOptionsArray[index] && (
                    <div className="dropdown-content">

                  <div onClick={() => handleDelete(user._id)}>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M3.5 3a.5.5 0 0 0-1 0v1a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-1 0v1H3.5v-1zm10.354 1.354a.5.5 0 0 1 0 .707l-8 8a.5.5 0 0 1-.708 0l-8-8a.5.5 0 1 1 .708-.708L8 10.293l7.146-7.147a.5.5 0 0 1 .708 0z"/>
  </svg>
</div>
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ))}

          <form onSubmit={handleSubmit} className="message-form">
            <input
              type="text"
              className="message-input"
              id="sandMsg"
              placeholder="Type your message..."
              value={sandMsg}
              onChange={(e) => setSandMsg(e.target.value)}
            />
            <button type="submit" className="send-button">Send</button>

          </form>
                         {/* <button style={{ marginTop: '15px' }} onClick={() => handleLogoutStatus()} className="hide">status User</button> */}
        </div>
      </div>
    </div>
    
  </div>
</div>
   
      
    </>
  );
}

export default App;
