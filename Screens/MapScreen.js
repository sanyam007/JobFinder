import React, {Component} from 'react';
import {View, Text, ActivityIndicator, } from 'react-native';
import MapView from 'react-native-maps';
import {Button, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import * as actions from '../actions';


class MapScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Map',
        tabBarIcon:({tintColor}) => {
                return <Icon name="my-location" size={30} color={tintColor} />
            
        }
    });
    state = {
        mapLoaded: false,
        region: {
            longitude:73.779694,
            latitude:18.574520,
            longitudeDelta:0.04,
            latitudeDelta:0.09
        }
    }
    componentDidMount(){
        this.setState({mapLoaded: true});
    }

    onRegionChangeComplete = (region) => {
         this.setState({region});
    }

    onButtonPress = () => {
        this.props.fetchJobs(this.state.region, () => {
            this.props.navigation.navigate('deck');
        });
   }
   
    render(){
        if(!this.state.mapLoaded){
            return <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size="large" />
            </View>
        }
        return(
            <View style={{flex: 1}}>
                <MapView 
                    style={{flex: 1}} 
                    region={this.state.region}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                />
                <View style={styles.button}>
                    <Button 
                        large
                        title="Search This Area"
                        backgroundcolor="#009688"
                        icon={{name:'search'}}
                        onPress={this.onButtonPress}
                    />
                </View>

            </View>
        );
    }
};

const styles = {
    button:{
        position: 'absolute',
        bottom: 20,
        left: 50,
        right: 50
    }
}

export default connect(null,actions)(MapScreen);