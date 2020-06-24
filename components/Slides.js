import React, {Component} from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import { Button } from 'react-native-elements';


const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
    
    renderLaastSlide(index){
        if(index === this.props.data.length - 1){
            return(
                <Button
                    title= 'Onwards!'
                    raised
                    buttonStyle={styles.buttonStyle}
                    onPress={this.props.onComplete}
                />
            );
        }
    }

    renderSlides(){
        return this.props.data.map((slide, index) => {
            return(
                 <View 
                    key={slide.text} 
                    style={[styles.slide, {backgroundColor: slide.color}]}
                 >
                     <Text style={styles.slideText}>{slide.text}</Text>
                     {this.renderLaastSlide(index)}
                 </View>
            );
        })
    }
    render(){
        return(
            <ScrollView horizontal pagingEnabled style={{flex:1}}>
                {this.renderSlides()}
            </ScrollView>
        );
    }
};

const styles = {
    slideText:{
        fontSize: 30,
        margin:10,
        color:'white',
        textAlign: 'center',
        justifyContent:'center',
        alignItems: 'center',

    },
    slide:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
    },
    buttonStyle:{
        backgroundColor:'#0288D1',
    }
}

export default Slides;