import { GoogleLogin } from 'react-google-login';

const clientId = '636146546883-fi2hg7utp4h0uu6ki3lgt4mdi3nj08m0.apps.googleusercontent.com';
    
function Login(){

    const onSuccess = (res) => {console.log("Login true.. client: ", res.profileObj);}
    const onFailure = (res) => {console.log("Login false.. res: ", res);}


    
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
        
        </div>
    )
}

export default Login;