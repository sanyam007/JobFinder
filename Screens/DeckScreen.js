import React, {Component} from 'react';
import {View, Text, Platform} from 'react-native';
import {connect} from 'react-redux';
import MapView from 'react-native-maps';
import { Card, Button, Icon } from 'react-native-elements';
import Swipe from '../components/swipe';
import * as actions from '../actions';

class DeckScreen extends Component {

    static navigationOptions = {
        title: 'Jobs',
        tabBarIcon:({tintColor}) => {
                return <Icon name="description" size={30} color={tintColor} />    
        }
    };
    
    renderCard(job){
        const initialRegion = {
            longitude:job.longitude,
            latitude: job.latitude,
            longitudeDelta:0.02 ,
            latitudeDelta:0.045  
        }
        return(
            <Card title={job.title.replace(/<strong>/g, '').replace(/<\/strong>/g, '')}>
                <View style={{height:250}}>
                <MapView 
                    scrollEnabled={false}
                    style={{flex:1}}
                    cacheEnabled={Platform.os === 'android' ? true: false}
                    initialRegion={initialRegion}
                >

                </MapView>
                </View>
                <View style={styles.detailWrapper}>
                    <Text style={styles.italics}>{job.company.display_name}</Text>
                    <Text style={styles.italics}>Salary:{job.salary_min}-{job.salary_max}</Text>
                </View>
                <Text style={{height:80}}>
                    {job.description.replace(/<strong>/g, '').replace(/<\/strong>/g, '')}
                </Text>
            </Card>
        );
    }


    renderNoMoreCards = () =>{
        return(
        <Card title="No More Jobs">
            <Button 
                    title="Back to Map"
                    large
                    icon={{name: 'my-location'}}
                    backgroundColor="#03A9F4"
                    onPress={() => this.props.navigation.navigate('map')}
                />
        </Card>
        );
    }
    render(){
        return(
            <View style={{marginTop:5}}>
                <Swipe 
                    data={this.props.jobs}
                    renderCard={this.renderCard}
                    renderNoMoreCards={this.renderNoMoreCards}
                    onSwipeRight={job => this.props.likeJob(job)}
                    keyProp="id"
                />
            </View>
        );
    }
};


const styles={
    italics:{
        fontStyle: 'italic'
    },
    detailWrapper:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        marginTop: 10
    }
}


//jobs came from reducer index.js 
function mapStateToProps({jobs}){
    return { jobs: jobs.results }
}

export default connect(mapStateToProps, actions)(DeckScreen);