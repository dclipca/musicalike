import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native'
import { Icon } from 'native-base'
import  { connect } from 'react-redux'
import { withNavigation } from 'react-navigation';
var {height, width} = Dimensions.get('window')

class ArtistConfirmationWindow extends React.Component {
    render() {
        return(
            <View style={styles.mainView}>
            <Text style={styles.isThisCorrect}>Is this correct?</Text>
            <View style={styles.subView}>
                <View style={styles.showView}>
                <Text>{this.props.suggestedArtistName}</Text>
                </View>
                <TouchableOpacity
                style={styles.confirmationView}
                onPress={() => this.props.navigation.navigate('ResultScreen')}>
                <Icon
                name='checkmark'
                style={{color: 'green'}}
                />
                </TouchableOpacity>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        marginTop: height * 1/100,
        flexDirection: 'column',
        alignItems: 'center',
    },
    subView: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 10,
        marginTop: height * 1/100,
        height: height * 1/20,
        width: width * 1/2.5,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    showView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.85
    },
    confirmationView: {
        backgroundColor: 'transparent',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        flex: 0.15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    isThisCorrect: {
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
        color: 'black',
    }
})

function mapStateToProps(state) {
    return {
        confirmationRequired: state.confirmationRequired,
        suggestedArtistName: state.suggestedArtistName
    }
}

export default withNavigation(connect(mapStateToProps)(ArtistConfirmationWindow))
