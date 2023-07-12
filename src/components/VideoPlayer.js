// import {View, Text, StyleSheet} from 'react-native';
// import React from 'react';
// import Video from 'react-native-video';

// const VideoPlayer = () => {
//   const uri =
//  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'

//     const OnError =(e) =>{
//         console.log('error',e)
//     }
//     const onBuffer= (e)=>{
//         console.log('buffer',e)
//     }
//     const onLoad = (e)=>{
//       console.log(e)
//     }
//    const  onProgress =(e)=>{
//     console.log('onProgress',e.currentTime,e.seekableDuration)
//    }
//   return (
//     <View style={{flex:1}}>
//       {/* <View style={{height: '40%', width: '100%'}}>
//       </View> */}
//       <Video
//         source={{uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}} // Can be a URL or a local file.
//         ref={ref => {
//           this.player = ref;
//         }} // Store reference
//         onBuffer={onBuffer} // Callback when remote video is buffering
//         onError={OnError} // Callback when video cannot be loaded
//         style={styles.backgroundVideo}
//         onLoad={onLoad}
//         onProgress={onProgress}
//         paused={false}
//       />
//     </View>
//   );
// };

// export default VideoPlayer;
// // Later on in your styles..
// const styles = StyleSheet.create({
//   backgroundVideo: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//     // height:500,
//     // justifyContent:'center',
//     // width:'100%',
//     // backgroundColor:'red'
//   },
// });
