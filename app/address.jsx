import { Entypo } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GooglePlacesTextInput from 'react-native-google-places-textinput';
import MapView from 'react-native-maps';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
const Address = () => {
  const router = useRouter()
  const primaryColor = "#F2994A"
  const tertiaryColor = "#EDEDED"
  const secondaryColor = "#838383"


  const [location, setLocation] = useState({
    latitude: 25.1917406,
    longitude: 66.4960045,
    latitudeDelta: 1,
    longitudeDelta: 1,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentAddress, setCurrentAddress] = useState("Loading")
  const [storageLocation, setStorageLocation] = useState(null)
  useEffect(() => {
  const fetchConditionalLocation = async () => {
    try {
      const item = await AsyncStorage.getItem("userLocation");

      if (item) {
        console.log("item was found");
        const locationData = JSON.parse(item);
        console.log(locationData.location);

        setLocation(locationData.location);
        setCurrentAddress(locationData.currentAddress);
        mapRef.current?.animateToRegion(locationData.location, 3 * 500);
      } else {
        console.log("This was executed");
        await getCurrentLocation();
      }
    } catch (error) {
      console.error("Error fetching location from storage:", error);
    }
  };

  fetchConditionalLocation();
}, []);

  const getCurrentLocation = async () => {

    console.log('function started')

    setCurrentAddress("Loading")

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let newLocation = await Location.getCurrentPositionAsync({});
    const reverseGeoCode = await Location.reverseGeocodeAsync({ latitude: newLocation.coords.latitude, longitude: newLocation.coords.longitude })
    setCurrentAddress(reverseGeoCode[0].formattedAddress)

    setLocation({ latitude: newLocation.coords.latitude, longitude: newLocation.coords.longitude, latitudeDelta: 0.003608739935479832, longitudeDelta: 0.0017907097935676575 });


  }

  const getCurrentLocationByPlaces = async (newLocation) => {

    setLocation({ ...location, latitude: newLocation.latitude, longitude: newLocation.longitude });
    mapRef.current.animateToRegion(location, 3 * 500);

  }

  // console.log(location);
  const centerMap = async () => {
    //Animate the user to new region. Complete this animation in 3 seconds
    // await geoCodeAddress()
    await getCurrentLocation()

    mapRef.current.animateToRegion(location, 3 * 500);
  };

  const geoCodeAddress = async (locationString) => {
    const newLocation = await Location.geocodeAsync(locationString)

    mapRef.current.animateToRegion({ latitude: newLocation[0].latitude, longitude: newLocation[0].longitude, latitudeDelta: 0.003608739935479832, longitudeDelta: 0.0017907097935676575 }, 3 * 500);

    console.log(location);

  }


  const mapCustomStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
  ]


  const mapRef = useRef(null)
  //   let text = 'Waiting...';
  //   if (errorMsg) {
  //     text = errorMsg;
  //   } else if (location) {
  //     text = JSON.stringify(location);
  //   }

  const onRegionChangeCompleteFunction = async (e) => {
    setCurrentAddress("Loading")
    const reverseGeoCode = await Location.reverseGeocodeAsync({ latitude: e.latitude, longitude: e.longitude })
    setCurrentAddress(reverseGeoCode[0].formattedAddress)
  }



  return (
    <View style={styles.container}>

      <View style={{ flex: 1, position: "relative" }}>
        <MapView
          customMapStyle={mapCustomStyle}
          ref={mapRef}
          region={location}
          initialRegion={location}
          onRegionChangeComplete={(e) => onRegionChangeCompleteFunction(e)}

          style={styles.map} 
          
          
          >
          {/* <Marker ref={mapRef} coordinate={{ latitude: location.latitude, longitude: location.longitude }} /> */}
        </MapView>
        <View style={{ position: "absolute", top: 0, width: "100%", backgroundColor: "white" }}>
          <SafeAreaView>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 10 }}>
              <View style={{ padding: 10 }}>
                <Text style={{ color: secondaryColor }}>
                  Location
                </Text>
                <View style={{ paddingVertical: 5, flexDirection: "row" }}>
                  <Entypo name="location-pin" size={24} color={primaryColor} />
                  <Text style={{ fontFamily: "PoppinsSemibold", width: "80%" }}>
                    {currentAddress}
                  </Text>
                </View>
              </View>
              <View style={{ justifyContent: "center" }}>


                <SimpleLineIcons style={{ padding: 10, borderWidth: 1, borderColor: tertiaryColor, borderRadius: 100 }} name="bell" size={24} color={secondaryColor} />
              </View>

            </View>
            <View style={{ paddingHorizontal: 20 }}>
              <GooglePlacesTextInput

                style={{ input: { borderColor: tertiaryColor, backgroundColor: "#FBFBFB" } }}
                apiKey="AIzaSyATlZqtixYhhOdj3X2_fShcV7ftf_ulzWs"
                onPlaceSelect={(e) => getCurrentLocationByPlaces(e.details.location)}
                placeHolderText='Search'
                detailsFields={['displayName', 'formattedAddress', 'location', 'id']}
                fetchDetails={true}
                // languageCode='ur'
                includedRegionCodes={['pk']}
              />
            </View>
          </SafeAreaView>
        </View>
      </View>

      <View style={{ position: "absolute", flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>

        <FontAwesome5 name="map-marker-alt" size={34} color={primaryColor} />

      </View>
      <View onTouchStart={() => { centerMap() }} style={{ position: "absolute", bottom: "20%", right: 20 }}>


        <FontAwesome6 style={{ padding: 10, borderWidth: 1, borderColor: primaryColor, backgroundColor: tertiaryColor, borderRadius: 100 }} name="location-crosshairs" size={34} color={primaryColor} />
      </View>
      <View style={{ position: "absolute", bottom: 0, backgroundColor: "white", width: "100%", boxShadow: `0px -10px 15px ${tertiaryColor}`, padding: 20, borderRadius: 20, flexDirection: "row", justifyContent: "space-between", paddingBottom: 30 }}>
        <View>
          <Text style={{ color: secondaryColor }}>Estimated Delivery</Text>
          <Text style={{ fontFamily: "PoppinsSemibold", fontSize: 20 }}>
            20-30 Mins
          </Text>
        </View>
        <Button onPress={() => {
          const saveLocation = async () => await AsyncStorage.setItem("userLocation", JSON.stringify({ location, currentAddress }))
          saveLocation()
          router.back()
        }
        } textColor="white" style={{ borderRadius: 10, backgroundColor: "#F2994A", borderWidth: 0, paddingVertical: 2, justifyContent: "center" }} mode="outlined">
          Save Address
        </Button>

      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Address