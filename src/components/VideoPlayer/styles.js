import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import colorPalette from '../../config/colorPalette';

const styles = {
  player: StyleSheet.create({
    container: {
      backgroundColor: '#000',
      flex: 1,
      alignSelf: 'stretch',
      justifyContent: 'center',
    },
    video: {
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  }),
  error: StyleSheet.create({
    container: {
      backgroundColor: 'rgba( 0, 0, 0, 0.5 )',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      marginBottom: 16,
      color: colorPalette.red,
    },
    text: {
      backgroundColor: 'transparent',
      color: '#f27474'
    },
  }),
  loader: StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
  controls: StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: null,
      width: null,
    },
    column: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: null,
      width: null,
    },
    vignette: {
      resizeMode: 'stretch'
    },
    back: {
      color: colorPalette.dirtyWhite,
      marginLeft: 10,
    },
    control: {
      padding: 16,
    },
    text: {
      backgroundColor: 'transparent',
      color: '#FFF',
      fontSize: 14,
      textAlign: 'center',
    },
    pullRight: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    top: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'flex-start',
    },
    bottom: {
      alignItems: 'stretch',
      flex: 2,
      justifyContent: 'flex-end',
    },
    topControlGroup: {
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      width: null,
      margin: 12,
      marginBottom: 18,
    },
    bottomControlGroup: {
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginLeft: 12,
      marginRight: 12,
      marginBottom: 0,
    },
    volume: {
      flexDirection: 'row',
    },
    fullscreen: {
      position: 'absolute',
      left: 20,
      top: -7,
    },
    fullScrenIcon: {
      color: colorPalette.dirtyWhite,
    },
    playPause: {
      zIndex: 0
    },
    title: {
      alignItems: 'center',
      flex: 0.6,
      flexDirection: 'column',
      padding: 0,
    },
    titleText: {
      textAlign: 'center',
    },
    timer: {
      width: 80,
    },
    timerText: {
      backgroundColor: 'transparent',
      color: '#FFF',
      fontSize: 11,
      textAlign: 'right',
    },
  }),
  volume: StyleSheet.create({
    container: {
      position: 'absolute',
      right: 18,
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      height: 5,
      width: 100,
      borderRadius: 2.5,
    },
    icon: {
      position: 'absolute',
      left: -24,
      color: colorPalette.dirtyWhite
    },
    track: {
      backgroundColor: '#333',
      height: 1,
      marginLeft: 7,
    },
    fill: {
      backgroundColor: colorPalette.red,
      width: 100,
      height: 5,
      borderRadius: 2.5,
    },
    handle: {
      position: 'absolute',
      marginTop: -24,
      marginLeft: -14,
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: colorPalette.dirtyWhite
    },
    hiddenHandle: {
      position: 'absolute',
      marginTop: -24,
      marginLeft: -24,
      padding: 16,
    },
    volumeIcon: {
      color: colorPalette.dirtyWhite
    }
  }),
  seekbar: StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      flex: 2,
      marginLeft: 20,
      marginRight: 20
    },
    track: {
      backgroundColor: '#333',
      height: 1,
      position: 'relative',
      top: 14,
      width: '100%'
    },
    fill: {
      backgroundColor: colorPalette.dirtyWhite,
      height: 1,
      width: '100%'
    },
    handle: {
      position: 'absolute',
      marginLeft: -7,
      height: 28,
      width: 28,
    },
    circle: {
      borderRadius: 12,
      position: 'relative',
      top: 8,
      left: 8,
      height: 12,
      width: 12,
    },
  }),
  blurView: StyleSheet.create({
    container: {
      justifyContent: 'center',
      height: 70,
      width: '100%',
    },
    blur: {
      flex: 1,
    },
    icon: {
      color: colorPalette.dirtyWhite,
    },
    middleIcon: {
      marginHorizontal: 30,
    },
    controls: {
      flex: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    mediaControls: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }
  })
};

export default styles;
