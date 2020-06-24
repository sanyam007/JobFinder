import React, { Component } from 'react';
import { View, Text, ScrollView, Linking, Platform } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';


class ReviewScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Liked Jobs',
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="favorite" size={30} color={tintColor} />
        },
        headerRight: () => (
            <Button title="Settings"
                onPress={() => navigation.navigate('settings')}
                type="clear"
            />
        )
    });

    renderLikedJobs() {
        return this.props.likedJobs.map(job => {
            console.log(job);
            const { company, created, redirect_url, longitude, latitude, title, id } = job;
            console.log(latitude, longitude);
            const initialRegion = {
                longitude,
                latitude,
                latitudeDelta: 0.045,
                longitudeDelta: 0.02
            }
            return (
                <Card title={title.replace(/<strong>/g, '').replace(/<\/strong>/g, '')} key={id}>
                    <View style={{ height: 200 }}>
                        <MapView
                            style={{ flex: 1 }}
                            cacheEnabled={Platform.os === 'android'}
                            scrollEnabled={false}
                            initialRegion={initialRegion}
                        />
                        <View style={styles.detailWrapper}>
                            <Text style={styles.italics}>{company.display_name}</Text>
                            <Text style={styles.italics}>{created}</Text>
                        </View>
                        <Button
                            title="Apply Now"
                            backgroundColor="#03A9F4"
                            onPress={() => Linking.openURL(redirect_url)}
                        />
                    </View>
                </Card>
            );
        });
    }

    render() {

        return (
            <ScrollView>
                {this.renderLikedJobs()}
            </ScrollView>
        );
    }
};

const styles = {
    italics: {
        fontStyle: 'italic'
    },
    detailWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        marginTop: 10
    }
}


function mapStateToProps(state) {
    return { likedJobs: state.likedJobs };
}

export default connect(mapStateToProps)(ReviewScreen);