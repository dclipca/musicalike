import React from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { Content, List } from 'native-base';
import { Container } from 'native-base'
import YTSearch from 'youtube-api-search'
import ArtistListItem from '../components/ArtistListItem'
import LoadingScreen from './LoadingScreen'
import Orientation from 'react-native-orientation-locker';

class ResultScreen extends React.Component {
    componentDidMount() {
      Orientation.lockToPortrait()
        getSimilar = (suggestedArtistName = this.props.suggestedArtistName) => {
            fetch('http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=' + suggestedArtistName + '&api_key=ab8caed470fc3b1760a688cb40f78a2b&format=json')
            .then(getSimilarResponse => getSimilarResponse.json())
            .then((getSimilarResponse) => {
              modifiedGetSimilarResponse = []
              getSimilarResponse.similarartists.artist.slice(0, 8).forEach(artistArray => {
                name = artistArray.name
                match = artistArray.match
                modifiedGetSimilarResponse.push({name, match})})
                modifiedGetSimilarResponse.forEach(artist => { 
                YTSearch({ key: 'AIzaSyCIjfFKB5LuYPf4LB6gVhFVWnKZHejp45s', term: artist['name'], maxResults: 1}, searchResult => {
                artist['videoId'] = (searchResult[0].id.videoId)
                artist['isShown'] = false })})})
            .then(() => {
                setTimeout(() => {this.props.sendGetSimilarResponseToState(modifiedGetSimilarResponse)
                console.log(modifiedGetSimilarResponse)}, 1000)
            })}
          getSimilar()
      }
  render() {
    return (
      this.props.resultsReady ?
      <Container>
        <Content>
          <List>
            {this.props.getSimilarResponse.map((artist) => {
            return <ArtistListItem
            key={artist.videoId}
            isShown={artist.isShown}
            name={artist.name}
            match={artist.match}
            videoId={artist.videoId}
            getSimilarResponse={this.props.getSimilarResponse}
            />
            })}
          </List>
        </Content>
      </Container> : <LoadingScreen />
    );
  }
}

function mapStateToProps(state) {
    return {
        getSimilarResponse: state.getSimilarResponse,
        resultsReady: state.resultsReady,
        suggestedArtistName: state.suggestedArtistName
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sendGetSimilarResponseToState: (getSimilarResponse) => dispatch({type: 'SEND_GET_SIMILAR_RESPONSE_TO_STATE', payload: getSimilarResponse}),
      }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(ResultScreen))
