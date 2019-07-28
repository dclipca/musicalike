import React from 'react'
import { StyleSheet, Dimensions, TextInput, View, Image } from 'react-native'
import { Icon } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import ArtistConfirmationWindow from '../components/ArtistConfirmationWindow'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation-locker';
var { height, width } = Dimensions.get('window')


class MainScreen extends React.Component {

    getCorrection = (artistName) => {
        fetch('http://ws.audioscrobbler.com/2.0/?method=artist.getcorrection&artist=' + artistName + '&api_key=ab8caed470fc3b1760a688cb40f78a2b&format=json')
        .then(getCorrectionResponse => getCorrectionResponse.json())
        .then(getCorrectionResponse => {
            artistNameCorrection = getCorrectionResponse.corrections.correction.artist.name.slice()
            if (artistNameCorrection != undefined && artistNameCorrection != this.props.formValue) {
                this.props.changeSuggestedArtistName(artistNameCorrection)
                this.props.changeConfirmationRequired(true)}})
        .catch(error => console.log(error))
    }

    onChangeText(value) {
        this.props.changeFormValue(value)
        this.getCorrection(value)
    }

    componentDidMount() {
        Orientation.lockToPortrait()
        didFocus = this.props.navigation.addListener("didFocus", this.props.resetResultsReady)
    }
    
    componentWillUnmount() {
        this.didFocus.remove()
    }

    render() {
        return (
            <LinearGradient colors={['#FFEDBC', '#ED4264']} style={styles.linearGradientContainer}>
                <View style={styles.coverMix}>
                    <Image
                    source={require('../logo.png')}
                    style={styles.logo}
                    />
                </View>
                <View style={styles.roundedTextboxItem}>
                    <TextInput
                    value={this.props.formValue}
                    onChangeText={(text) => this.onChangeText(text)}
                    onSubmitEditing={() => this.props.navigation.navigate('ResultScreen')}
                    placeholderTextColor='black'
                    placeholder='Queen, The Rolling Stones'
                    style={styles.roundedTextboxInput}
                    />
                    <View style={styles.confirmView}>
                        <Icon
                        name='checkmark'
                        style={{color: 'green'}}
                        />
                    </View>
                </View>
                { this.props.confirmationRequired ? <ArtistConfirmationWindow /> : null}
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    logo:{
        height: height * 3/10, width: height * 3/10
    },
    confirmView: {
        justifyContent: 'center', alignItems: 'center',flex: 0.1, backgroundColor: 'transparent', borderTopRightRadius: 10, borderBottomRightRadius: 10
    },
    coverMix: {
        flexDirection: 'row',
        height: height * 3/10,
        width: height * 3/10,
        justifyContent: 'space-around',
        marginTop: height * 1/20
    },
    roundedTextboxItem: {
        marginTop: height * 1/20,
        width: width * 6/10,
        height: height * 1/20,
        borderRadius: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    roundedTextboxInput: {
        flex: 0.9,
        color: 'black',
        textAlign: 'center'
    },
    linearGradientContainer: {
        flex: 1,
        width,
        height: height,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }
})

function mapStateToProps(state) {
    return {
        store: state,
        formValue: state.formValue,
        suggestedArtistName: state.suggestedArtistName,
        confirmationRequired: state.confirmationRequired,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        resetResultsReady: () => dispatch({type: 'RESET_RESULTS_READY', payload: false}),
        changeFormValue: (newValue) => dispatch({ type: 'CHANGE_FORM_VALUE', payload: newValue }),
        changeSuggestedArtistName: (newArtistName) => dispatch({ type: 'CHANGE_SUGGESTED_ARTIST_NAME', payload: newArtistName }),
        changeConfirmationRequired: (boolean) => dispatch({ type: 'CHANGE_CONFIRMATION_REQUIRED', payload: boolean })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)

