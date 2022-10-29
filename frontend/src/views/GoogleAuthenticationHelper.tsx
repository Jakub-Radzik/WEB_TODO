import { useLazyQuery, useQuery } from "@apollo/client"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Loader from "../elements/loader"
import { PrimaryText } from "../elements/text"
import { GET_GOOGLE_TOKENS, GoogleTokensResponse, GoogleTokensVariables } from "../graphQL/queries/google"
import { errorToast, successToast } from "../utils/toasts"
import PATH from "../utils/router/paths";
import { useAuth } from "../context/AuthContext"

export const GoogleAuthenticationHelper = () => {

    const [refetchTokens] = useLazyQuery<GoogleTokensResponse,GoogleTokensVariables>(GET_GOOGLE_TOKENS);
    const navigate = useNavigate();
    const { setUserHandler } = useAuth();

    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if(code){
            refetchTokens({variables:{code: code}}).then((res)=>{
                if(res.data){
                    const {access_token, refresh_token} = res.data.googleTokens.tokens;
                    const {token} = res.data.googleTokens;
                    const {user} = res.data.googleTokens;

                    localStorage.setItem('access_token', access_token);
                    localStorage.setItem('refresh_token', refresh_token);
                    localStorage.setItem('token', token);
                    setUserHandler(user);

                    successToast('Authentication Successful');
                    setTimeout(()=>{
                        successToast(`Welcome ${user.login}`);
                    },500)
                    setTimeout(()=>navigate(PATH.APP), 1000)
                }else{
                    throw new Error('No tokens received');
                }
            }).catch((err)=>{
                errorToast('Error while authenticating with Google');
                setTimeout(()=>navigate(PATH.LOGIN),1000);
            });
        }
    },[window.location.search])

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            paddingTop: 100
        }}>
            <Loader/>
            <PrimaryText color="#000">Connecting with your Google Account</PrimaryText>
        </div>
    )
}