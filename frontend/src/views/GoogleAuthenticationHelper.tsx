import { useLazyQuery, useQuery } from "@apollo/client"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Loader from "../elements/loader"
import { PrimaryText } from "../elements/text"
import { GET_GOOGLE_TOKENS, GoogleTokensResponse, GoogleTokensVariables } from "../graphQL/queries/google"
import { errorToast, successToast } from "../utils/toasts"
import PATH from "../utils/router/paths";

export const GoogleAuthenticationHelper = () => {

    const [refetchTokens] = useLazyQuery<GoogleTokensResponse,GoogleTokensVariables>(GET_GOOGLE_TOKENS);
    const navigate = useNavigate();

    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if(code){
            refetchTokens({variables:{code: code}}).then((res)=>{
                console.log();
                if(res.data?.googleTokens){
                    localStorage.setItem('accessToken', res.data.googleTokens.access_token);
                    localStorage.setItem('refreshToken', res.data.googleTokens.refresh_token);
                    navigate(PATH.HOME);
                    successToast('Authentication Successful');
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