import React, {Component} from 'react';
import {View, Text, Platform} from 'react-native';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {clearLikedJob} from '../actions';

class SettingScreen extends Component {
   
     render(){
        return(
            <View>
                <Button 
                    title="Reset Liked Jobs"
                    large
                    icon={{name: 'delete-forever'}}
                    backgroundColor="#F44336"
                    onPress={() => {this.props.clearLikedJob; this.props.navigation.navigate('deck')}}
                    
                />
            </View>
        );
    }
};

export default connect(null,{clearLikedJob})(SettingScreen);