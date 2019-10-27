import { connect } from "react-redux";
import React from "react";
import { Dimensions, TouchableOpacity, StyleSheet } from "react-native";
import { ListItem } from "native-base";
import { Thumbnail, Text, Left, Body, Button, Right } from "native-base";
import YouTube from "react-native-youtube";
var { height, width } = Dimensions.get("window");

class ArtistListItem extends React.Component {
  render() {
    return (
      <ListItem key={this.props.videoId} thumbnail>
        <Left>
          <Thumbnail
            scaleX={1.3}
            scaleY={1.3}
            square
            source={{
              uri:
                "https://img.youtube.com/vi/" +
                this.props.videoId +
                "/mqdefault.jpg"
            }}
          />
        </Left>
        <Body>
          <Text>{this.props.name}</Text>
          <Text note numberOfLines={1}>
            Match: {Math.round(this.props.match * 100)}%
          </Text>
          {this.props.isShown ? (
            <YouTube
              apiKey="AIzaSyB7d9JeizqXVFAxbs2oOJRnyvTHFYiSt9g"
              videoId={this.props.videoId}
              play={true}
              fullscreen={false}
              loop={false}
              style={styles.youtube}
            />
          ) : null}
        </Body>
        <Right>
          <Button transparent>
            <TouchableOpacity
              onPress={this.props.reverseIsShowForParticualArtistListItem}
            >
              {this.props.isShown ? <Text>Close</Text> : <Text>Play</Text>}
            </TouchableOpacity>
          </Button>
        </Right>
      </ListItem>
    );
  }
}

styles = StyleSheet.create({
  youtube: {
    alignSelf: "stretch",
    height: (height * 4) / 10,
    flex: 1
  }
});

function mapDispatchToProps(dispatch, ownProps) {
  return {
    reverseIsShowForParticualArtistListItem: () => {
      getSimilarResponseClone = ownProps.getSimilarResponse.slice();
      getSimilarResponseClone.forEach(artist => {
        if (artist.name == ownProps.name) {
          artist.isShown = !artist.isShown;
        } else {
          artist.isShown = false;
        }
        dispatch({
          type: "REVERSE_IS_SHOW_FOR_PARTICULAR_ARTIST_LIST_ITEM",
          payload: getSimilarResponseClone
        });
      });
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(ArtistListItem);
