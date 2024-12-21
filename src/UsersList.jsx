import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
const ENDPOINT = "http://localhost:4080";

export default function UsersList() {
  const [loginError, setLoginError] = useState('');
  const [data, setData] = useState([]);
  const [token, setToken] = useState('');
  const [SenderId, setSenderId] = useState();
  const [searchTerm, setSearchTerm] = useState();
  const [addUserList, setAddUserList] = useState([]);
  const [ReceiverId, setReceiverId] = useState();


     useEffect(() => {
       const socket = io(ENDPOINT, { transports: ['websocket'] });
    //   socket.on('searchAddUsersLoop', (searchList) => {
    //   setData(searchList.searchList);
    // })
    socket.on('statusData',(data) => {
        setAddUserList(data.userData);
      })
     }, [])
   const handleClick = (data) => { 
     const socket = io(ENDPOINT, { transports: ['websocket'] });
      localStorage.setItem('ReceiverId', data);
      socket.emit('selectUserChat',({data: "ok"}));
      chatSocket();
  };
  const handleClickSocket = (data) => { 
    const socket = io(ENDPOINT, { transports: ['websocket'] });
      localStorage.setItem('ReceiverId', data);
      socket.emit('selectUserChat',({data: "ok"}));
  };

   const addUserHandle = async (data) => {
  try {
    

    // Assuming 'token' and 'SenderId' are already defined
    const response = await fetch('http://localhost:4080/api/v1/users/add-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ data, SenderId }), // Assuming 'data' and 'SenderId' are JSON objects
    });
    // console.log("=-=-=-=-=", data);

    if (!response.ok) {
      // Handle non-200 status codes
      const errorData = await response.json();
      throw new Error(errorData.error || 'An error occurred while adding users');
    }

    // Success message and any further actions
    alert('User added successfully');
    handleUserList(); // Assuming 'handleUserList' is defined and fetches the updated user list
  } catch (error) {
    // Handle errors
    console.error('Error during adding user:', error);
    alert('Error: ' + error.message);
  }
};


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
    const ReceiverIdValue = localStorage.getItem('ReceiverId');
    if (ReceiverIdValue) {
      setReceiverId(ReceiverIdValue);
    } else {
      console.log('No ReceiverId found.');
    }
  }, []); 

  const handleSearchSubmit = async () => {
        event.preventDefault();
  try {
    console.log("hello search");
    const response = await fetch('http://localhost:4080/api/v1/users/find-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ searchTerm }), 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'An error occurred while fetching users');
    }

    const responseData = await response.json();
    setData(responseData?.data);
    console.log(responseData?.data);
    if(responseData?.data.length === 0){
      alert('Users not found');
    }else{
      alert('Users found');
    }
    
  } catch (error) {
    alert("Error: " + error.message);
    console.error('Error during user search:', error);
  }
};
 const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleUserList = async () => {
  try {
    const response = await fetch('http://localhost:4080/api/v1/users/list-Add-Users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ SenderId }), 
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user list');
    }

    const responseData = await response.json();
   setAddUserList(responseData?.data);
   $('.block').show()
   $('.hide').hide()

  } catch (error) {
    console.error('Error fetching user list:', error);
  }
};

 const handleAddUserRemove = async (removeId) => {
  try {
    const response = await fetch('http://localhost:4080/api/v1/users/remove-Add-Users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ SenderId, removeId }), 
    });

    if (!response.ok) {
      throw new Error('Failed to fetch User Remove');
    }

    const responseData = await response.json();
    alert("User Removed")
   handleUserList();
   $('.block').show()
   $('.hide').hide()

  } catch (error) {
    console.error('Error fetching User Remove:', error);
  }
};
 const handleSearchSubmitSocket = async (event) => {
   event.preventDefault();
  try {
    const socket = io(ENDPOINT, { transports: ['websocket'] });
    socket.emit("SearchSocket", {searchTerm});
 

  } catch (error) {
    console.error('Error fetching user list:', error);
  }
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
  {token !== '' ? (
    <div>
      <div className="user-list">
        <form onSubmit={handleSearchSubmit} className="user-search-container">
          <input 
            type="text" 
            value={searchTerm} 
            onChange={handleSearchChange} 
            placeholder="Search users..." 
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
        {data.map(user => (
          <div key={user.id} className="user">
            {SenderId === user._id ? (
              <p></p>
            ) : (
              <div className="user-info">
                <h3>{user.fullName}</h3>
                <button onClick={() => addUserHandle(user._id)} className={`status ${user.isActive ? 'online' : 'offline'}`}>
                  {user.isActive ? 'Online' : 'Offline'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <button style={{ marginTop: '15px' }} onClick={() => handleUserList()} className="hide">Add User</button>
      <div style={{ marginTop: '9px' }} className="user-list block">
        {addUserList.map(user => (
          <div key={user.id} className="user">
            {SenderId === user._id ? (
              <p></p>
            ) : (
              <div className="user-info">
                <h3>{user.fullName}</h3>
                <button onClick={() => handleAddUserRemove(user._id)} className="svgcss" ><svg xmlns="http://www.w3.org/2000/svg" width="24"height="24"viewBox="0 0 24 24"fill="none"stroke="currentColor"stroke-width="2"stroke-linecap="round"stroke-linejoin="round"><path d="M3 6h18M8.25 6l1.5-3h5.5l1.5 3M6 6h12v12H6z" /></svg></button>
                <button onClick={() => handleClick(user._id)} className={`status ${user.isActive ? 'online' : 'offline'}`}>
                  {user.isActive ? 'Online' : 'Offline'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <p>Please log in to view users</p>
  )}
</>

  );
}
