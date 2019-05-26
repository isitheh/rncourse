import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { deletePlace } from '../../store/actions/index/';
import MapView from 'react-native-maps';

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
        <View style={styles.placeDetails}>
          <View style={styles.subContainer}>
            <Image
              style={this.state.viewMode === "portrait" ? styles.placeImage: styles.placeImageResponsive}
              source={this.props.selectedPlace.image}
            />
          </View>
          <View style={styles.subContainer}>
            <MapView
              initialRegion={{
                ...this.props.selectedPlace.location,
                latitudeDelta: 0.0122,
                longitudeDelta:
                  Dimensions.get("window").width /
                  Dimensions.get("window").height *
                  0.0122
              }}
              style={styles.map}
              style={this.state.viewMode === "portrait" ? styles.map: styles.mapResponsive}
            >
              <MapView.Marker coordinate={this.props.selectedPlace.location}/>
            </MapView>
          </View>
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
  map: {
    //...StyleSheet.absoluteFillObject,
    width: "100%",
    height: 200
  },
  placeDetails: {
    //flex: 2
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
    width: "100%",
    height: 100
  },
  mapResponsive: {
    width: "100%",
    height: 100
  },
  subContainer: {
    //flex: 1,
  }
});


const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: (key) => dispatch(deletePlace(key))
  };
}

export default connect(null, mapDispatchToProps)(PlaceDetail);