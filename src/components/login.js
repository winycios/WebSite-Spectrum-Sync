import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const clientId = '636146546883-fi2hg7utp4h0uu6ki3lgt4mdi3nj08m0.apps.googleusercontent.com';
    
function Login(){

    const onSuccess = (res) => {console.log("Login true.. client: ", res.profileObj);}
    const onFailure = (res) => {console.log("Login false.. res: ", res);}


    const responseFacebook = (response) => {
        console.log(response);
      }
    return (
        <div id='signInButton'>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        
        <div>
        <FacebookLogin
            appId="437144815431727"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
        />
        </div>
        </div>
        
        
    )
}

export default Login;