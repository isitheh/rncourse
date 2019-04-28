import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { deletePlace } from '../../store/actions/index/';

class PlaceDetail extends Component {
  state = {
    viewMode: Dimensions.get('window').height > 500 ? "portrait" : "landscape"
  }

  constructor (props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles);
  }

  componentWillUnmount () {
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  updateStyles = (dims) => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape"
    });
  }

  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  }

  render () {
    return (
      <View style={styles.container}>
        <View>
          <Image
            style={this.state.viewMode === "portrait" ? styles.placeImage: styles.placeImageResponsive}
            source={this.props.selectedPlace.image}
          />
          <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
        </View>
        <View>
          <TouchableOpacity>
            <View style={styles.deleteButton}>
              <Icon
                size={30}
                name={Platform.OS === 'android' ? "md-trash" : "ios-trash"}
                color="red"
                onPress={this.placeDeletedHandler}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 50,
  },
  placeImage: {
    width: "100%",
    height: 200
  },
  placeName: {
    fontWeight: "bold",
    textAlign:  "center",
    fontSize: 28
  },
  deleteButton: {
    alignItems: 'center'
  },
  closeButton: {
    alignItems: 'center'
  },
  placeImageResponsive: {
    width: "80%",
    height: 150
  },
});


const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: (key) => dispatch(deletePlace(key))
  };
}

export default connect(null, mapDispatchToProps)(PlaceDetail);