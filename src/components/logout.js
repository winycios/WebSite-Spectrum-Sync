import { GoogleLogin } from 'react-google-login';

const clientId = '636146546883-fi2hg7utp4h0uu6ki3lgt4mdi3nj08m0.apps.googleusercontent.com';

function Logout(){
    const onSuccess = () => { console.log("Logou sucessfull.")}

    return (
        <div id='signInButton'>
        <GoogleLogin
            clientId={clientId}
            buttonText={"Logout"}
            onLogoutSuccess = {onSuccess}
            cookiePolicy={'single_host_origin'}

        />
    </div>
    )

}

export default Logout;