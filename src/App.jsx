import './App.css';
import { useState, useEffect } from 'react';
import { gapi } from "gapi-script";
import GoogleLogin from 'react-google-login';

function App() {
  const clientID = "415478197601-vsqmphacp0eb343eog1fvcg8ttsiiim2.apps.googleusercontent.com"
  const [user, setUser] = useState({});


  const onSuccess = (response) => {
    setUser(response.profileObj);
    document.getElementsByClassName("btn").hidden = true;
  }
  const onFailure = () => {
    console.log("Algo salió mal");
  }

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
      });
    }
    gapi.load("client:auth2", start);
  });

  return (
    <div className="center">
      <h1>Login</h1>
    
      <div className='btn'>

        <GoogleLogin
         
          clientId={clientID}
          onSuccess={onSuccess}
          onFailure={onFailure}
          buttonText="Inicia con Google"
          cookiePolicy={"single_host_origin"}
        />

      </div>

      <div class={user? "profile": "hidden"}>
        <img src={user.imageUrl} alt=""/> 
        
      </div>
      <h4 className='nombre'>{user.name}</h4>


    </div>
  );
}

export default App;