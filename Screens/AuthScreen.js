import React, {Component} from 'react';
import {View, Text, AsyncStorage} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';



class AuthScreen extends Component {
    componentDidMount(){
        this.props.facebookLogin();
       // AsyncStorage.removeItem('fb_token');
       // this.onAuthComplete(this.props);
    }
    componentDidUpdate(){
        console.log(this.props);
        this.onAuthComplete(this.props);
    } 
    onAuthComplete(props){
        console.log(props);
        console.log("onAuthComplete");
        if(props.token){
            this.props.navigation.navigate('map');
        }
    }

    
    render(){
        return(
            <View />
            );
    }
};


//auth came from reducer index.js
function mapStateToProps({ auth }){
    return {token: auth.token};
}

export default connect(mapStateToProps, actions)(AuthScreen);