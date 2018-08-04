import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Slider, CameraRoll, UIManager, findNodeHandle } from 'react-native';
import { RNCamera } from 'react-native-camera';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './styles'
import colors from '../../data/colors'

// Values for flash to toggle through
const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

/** 
 * Component to display appropiate view for camera
 */
export default class CameraComp extends React.Component {

  
  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    ratios: [],
    photoId: 1,
    showGallery: false,
    photos: [],
    size: 140,
    radius: 70,
    measurements: {},
    flashIcon: 'flash-outline',
    x: 500,
    y: 500
  };


  getRatios = async function() {
    const ratios = await this.camera.getSupportedRatios();
    return ratios;
  };

  

  // Function to toggle through different flash values/types
  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });

    if(this.state.flash == 'on') {
      this.setState({
        flashIcon: 'flash-auto'
      })
    }
    if(this.state.flash == 'off') {
      this.setState({
        flashIcon: 'flash'
      })
    }
    if(this.state.flash == 'auto') {
      this.setState({
        flashIcon: 'flashlight'
      })
    }
    if(this.state.flash == 'torch') {
      this.setState({
        flashIcon: 'flash-outline'
      })
    }
  }

  // Function that handles taking picture
  takePicture = async function() {
    // Options for captured image
    const options = { quality: 0, base64: true };
    if (this.camera) {
      this.camera.takePictureAsync(options).then(data => {
        // Navigate to Picture screen to review the picture, also passing along data to other screen
        this.props.navigation.navigate('Picture', {imageData: data, radius: this.state.radius, x: this.state.x, y: this.state.y})
      });
    }
  };

  // Function to enlarge the radius of the virtual circle (up to a limit)
  enlarge() {
    if(this.state.size < 237) {
      this.setState({
        size: this.state.size+17,
        radius: this.state.radius+8.5
      })
    }
  }

  // Function to reduce the radius of the virtual circle (down to a limit)
  reduce() {    
    if(this.state.size > 4) {
      this.setState({
        size: this.state.size-17,
        radius: this.state.radius-8.5
      })
    }
  }

  // Function to obtain position and dimensions of a component
  measure() {
    this.view.measure((x, y, width, height) => {
      this.setState({
        measurements: {
          x,
          y,
          width,
          height
        }
      })
    })
  }


  renderCamera() {
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        focusDepth={this.state.depth}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}
      >
      <View
        style={{
          flex: 0.1,
          backgroundColor: 'transparent',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 10,
        }}
      >
        <TouchableOpacity onPress={this.toggleFlash.bind(this)}>
          <MaterialCommunityIcons name={this.state.flashIcon} size={50} color='white' />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0.8,
          backgroundColor: 'transparent',
          justifyContent: 'center'
        }}
      >
      {/* Virtual circle */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flex: 0.1}}></View>
        <View style={styles.circle}
          ref={ref => this.view = ref}
          onLayout={({ nativeEvent}) => {
            this.setState({
              measurements: nativeEvent.layout
            })
          }}
        >
          <View style={[styles.icon, {width: this.state.size, height: this.state.size, borderRadius: this.state.radius}]} />
        </View>
        <View style={{justifyContent: 'center', flex: 0.1}}>
            {/* Button to enlarge virtual circle */}
            <TouchableOpacity style={styles.zoomButton} onPress={ () => this.enlarge()}>
              <Text style={styles.flipText}> + </Text>
            </TouchableOpacity>
            {/* Button to reduce virtual circle */}
            <TouchableOpacity style={styles.zoomButton} onPress={ () => this.reduce()}>
              <Text style={styles.flipText}> - </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        </View>
        <View
          style={{
            flex: 0.1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <View style={{
            backgroundColor: 'white',
            alignSelf: 'flex-end',
            height: 70,
            width: 70,
            marginBottom: 20,
            borderRadius: 35,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <View style={{
              backgroundColor: 'black',
              height: 60,
              width: 60,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <TouchableOpacity style={styles.picButton} activeOpacity={0.5} onPress={() => this.takePicture() }/>
            </View>
          </View>
        </View>
      </RNCamera>
    );
  }

  render() {
    return <View style={styles.container}>{this.renderCamera()}</View>;
  }
}
