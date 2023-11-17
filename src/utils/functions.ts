import Services from "../service-call/services";

const regenerateAccessToken = () => {
    Services.regenerateAccessToken({userName : localStorage.getItem('userName'), refreshToken:localStorage.getItem('refresh_token') }).then((res)=>{
        localStorage.setItem('userName',res.userName);
        localStorage.setItem('access_token', res.accessToken.access_token);
        
    }).catch((err)=> console.error(err));

    return localStorage.getItem('access_token');
}


export const loginValidation = () => {
    if(localStorage.getItem('access_token')){
        if(Date.now() > new Date(localStorage.getItem('expire_access_token')).getTime()){
            if(Date.now() > new Date(localStorage.getItem('expire_refresh_token')).getTime()){
                return null;
            } else {
                return regenerateAccessToken();
            }
        } else{
            return localStorage.getItem('access_token');
        }
    } else{
        return null;
    }
}
