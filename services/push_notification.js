import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async() => {
    let previousToken = await AsyncStorage.getItem('pushtoken');
    console.log(previousToken);
    if(previousToken){
        return;
    } else{
        console.log('in');
        let {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        if(status !== 'granted'){
            return;
        }
        //console.log(status);

        let token = await Notifications.getExpoPushTokenAsync();
        console.log(token);
        const t = {token: {token}};
        //console.log(t);
        const config = {
            headers: { Authorization: `Bearer ${t}` }
        };
        await axios.post(PUSH_ENDPOINT,config);
        AsyncStorage.setItem('pushtoken', token);
        //console.log("ddone");
      //  let previousToken1 = await AsyncStorage.getItem('pushtoken');
    // console.log(previousToken1);


    }


};