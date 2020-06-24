import {AsyncStorage} from 'react-native';
import {FACEBOOK_LOGIN_SUCCESS} from './types';
import {FACEBOOK_LOGIN_FAIL} from './types';
import * as Facebook from 'expo-facebook'; 


//AsyncStorage.setItem('fb_token, token);
//AsyncStorage.getItem('fb_token');

export const facebookLogin = () => async dispatch => {
    let token = await AsyncStorage.getItem('fb_token');
    if(token){
        //console.log(token);
        dispatch({ type: 'FACEBOOK_LOGIN_SUCCESS', payload: token });
    } else{
        // start up login process
        doFacebookLogin(dispatch);
    }
}; 


const doFacebookLogin = async dispatch => {

    //console.log("dofacebooklogin");
    Facebook.initializeAsync('2641414512770069', 'JobSeeker');
    let {type, token} = await Facebook.logInWithReadPermissionsAsync('2641414512770069',{
        permissions: ['public_profile']
    });
    if(type === 'cancel'){
        return dispatch({ type: FACEBOOK_LOGIN_FAIL});
    }

    await AsyncStorage.setItem('fb_token', token);
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token});
};