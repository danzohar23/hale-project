import React, { useState } from 'react';
import { Text, View, Image, ScrollView, Alert} from 'react-native';
import Slider from '@react-native-community/slider'
import { Button } from '@rneui/themed';

const App = () => {
  //User details starting state
  const [userDetails, setUserDetails] = useState({
    painValue: 0,
    painTypes: [],
    painLocations: [],
    triggers: [],
    asFactors: []
  })
  //On button press, add or remove the title from the array (independent if clause for each category)
  const buttonLog = (title, category) => {
    if(category == "Type"){
      if(!userDetails.painTypes.includes(title)){
        setUserDetails((prevState) => ({
        ...prevState,
        painTypes: [...prevState.painTypes, title],
      }));}
      if(userDetails.painTypes.includes(title)){
        setUserDetails((prevState) => ({
        ...prevState,
        painTypes: prevState.painTypes.filter((item) => item !== title),
      }));} 
    }
    if(category == "Location"){
      if(!userDetails.painLocations.includes(title)){
        setUserDetails((prevState) => ({
        ...prevState,
        painLocations: [...prevState.painLocations, title],
      }));}
      if(userDetails.painLocations.includes(title)){
        setUserDetails((prevState) => ({
        ...prevState,
        painLocations: prevState.painLocations.filter((item) => item !== title),
      }));}
    }
    if(category == "Triggers"){
      if(!userDetails.triggers.includes(title)){
        setUserDetails((prevState) => ({
        ...prevState,
        triggers: [...prevState.triggers, title],
      }));}
      if(userDetails.triggers.includes(title)){
        setUserDetails((prevState) => ({
        ...prevState,
        triggers: prevState.triggers.filter((item) => item !== title),
      }));}
    }
    if(category == "asFactors"){
      if(!userDetails.asFactors.includes(title)){
        setUserDetails((prevState) => ({
        ...prevState,
        asFactors: [...prevState.asFactors, title],
      }));}
      if(userDetails.asFactors.includes(title)){
        setUserDetails((prevState) => ({
        ...prevState,
        asFactors: prevState.asFactors.filter((item) => item !== title),
      }));}
    }
  }
  //Change the color of the button if it is selected
  const changeColor1 = (title) => {
    if(userDetails.painTypes.includes(title) || userDetails.painLocations.includes(title)){
      return '#b9a7f2';
    }
    else{
      return '#fff';
    }
  }
  //Change the color of the button if it is selected (for triggers and associated factors)
  const changeColor2 = (title,category) => {
    if((userDetails.triggers.includes(title) && (category == "Triggers")) || (userDetails.asFactors.includes(title) && (category == "asFactors"))){
      return '#b9a7f2';
    }
    else{
      return '#fff';
    }
  }

  //If the 'next' button is clicked, show the details and clear the user details for the next entry
  const handleOnPress = () => {
    Alert.alert("Information logged succesfully","User details: \nPain Value: "+ userDetails.painValue+"\nPain Types: "+userDetails.painTypes+"\nPain Locations: "+userDetails.painLocations+"\nTriggers: "+userDetails.triggers+"\nAssociated Factors: "+userDetails.asFactors)
    setUserDetails((prevState) => ({painValue: 0,
      painTypes: [],
      painLocations: [],
      triggers: [],
      asFactors: []}))
  }

  //Function to upload the data to the server (not implemented, just to show my knowledge of fetch)
  const serverUpload = () => {
    const postData = {
      painValue: userDetails.painValue,
      painTypes: userDetails.painTypes,
      painLocations: userDetails.painLocations,
      triggers: userDetails.triggers,
      asFactors: userDetails.asFactors,
    };

    fetch('https://dummy-url.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (response.ok) {
          // Handle success response if needed
          return response.json();
        } else {
          // Handle error response if needed
          throw new Error('Network response was not ok.');
        }
      })
      .then((data) => {
        Alert.alert('Information logged successfully', `User details: \n${JSON.stringify(data)}`);
      })
      .catch((error) => {
        // Handle error
        console.error('Error:', error);
        Alert.alert('Error occurred', 'An error occurred while logging the information.');
      })
      .finally(() => {
        // Clear user details after posting the data
        setUserDetails({
          painValue: 0,
          painTypes: [],
          painLocations: [],
          triggers: [],
          asFactors: [],
        });
      });
  };

  return ( 
    <ScrollView>
    <View className="mt-10">
      <Text className="font-bold m-10 text-3xl">Pain</Text>
      <View className="bg-lightGray ml-5 mr-5 p-4 rounded-lg">
        <Text className="font-bold text-2xl ml-4">How much pain do you feel?</Text>
        <View className="flex-row mt-10 mr-3 ml-5 bg-white p-4 rounded-lg">
          <Image source={require('./assets/onetearemoji.png')} className="h-10 w-10" />
          <Slider
            style={{width: 200, height: 40}}
            maximumValue={100}
            minimumValue={0}
            step={1}
            value={0}
            onValueChange={(value) => setUserDetails((prevState) => ({ ...prevState, painValue: value }))}
          />
          <Image source={require('./assets/hearteyesemoji.png')} className="h-10 w-10" />
        </View>
        <View className="bg-lightGray h-8"></View>
      </View>

      <View className="bg-lightGray mt-5 ml-5 mr-5 p-4 rounded-lg">
        <Text className="font-bold text-2xl ml-5">Pain type</Text>
        <View className="flex-row mt-5 ml-[-15] justify-evenly">
          <Button title="Sharp" color={changeColor1("Sharp")} titleStyle={{color: 'black'}}buttonStyle={{borderRadius: 10}} onPress={() => buttonLog("Sharp", "Type")} />
          <Button title="Cramping" color={changeColor1('Cramping')} titleStyle={{color: 'black'}} buttonStyle={{borderRadius: 10}} onPress={() => buttonLog("Cramping", "Type")} />
          <Button title="Pulling" color={changeColor1('Pulling')} titleStyle={{color: 'black'}} buttonStyle={{borderRadius: 10}} onPress={() => buttonLog("Pulling", "Type")} />
        </View>
        <View className="flex-row mt-3 ml-[-10] justify-evenly">
          <Button title="Stabbing" color={changeColor1('Stabbing')} titleStyle={{color: 'black'}} buttonStyle={{borderRadius: 10}} onPress={() => buttonLog("Stabbing", "Type")} />
          <Button title="Aching" color={changeColor1('Aching')} titleStyle={{color: 'black'}} buttonStyle={{borderRadius: 10}} onPress={() => buttonLog("Aching", "Type")} />
          <Button title="Pulsating" color={changeColor1('Pulsating')} titleStyle={{color: 'black'}} buttonStyle={{borderRadius: 10}} onPress={() => buttonLog("Pulsating", "Type")} />
        </View>
        <View className="bg-lightGray h-4"></View>
      </View>

      <View className="bg-lightGray mt-5 ml-5 mr-5 p-4 rounded-lg">
        <Text className="font-bold text-2xl ml-5">Pain Location</Text>
        <View className="flex-row mt-5 justify-evenly">
          <Button title="Vulva" color={changeColor1("Vulva")} titleStyle={{color: 'black'}} buttonStyle={{borderRadius: 10}} onPress={() => buttonLog("Vulva", "Location")} />
          <Button title="Ovaries" color={changeColor1('Ovaries')} titleStyle={{color: 'black'}} buttonStyle={{borderRadius: 10}} onPress={() => buttonLog("Ovaries", "Location")} />
          <Button title="Lower back" color={changeColor1('Lower back')} titleStyle={{color: 'black'}} buttonStyle={{borderRadius: 10}} onPress={() => buttonLog("Lower back", "Location")} />
        </View>
        <View className="flex-row mt-3 ml-[-15] justify-evenly">
          <Button title=" Womb " color={changeColor1(' Womb ')} titleStyle={{color: 'black'}} buttonStyle={{borderRadius: 10}} onPress={() => buttonLog(" Womb ", "Location")} />
          <Button title="  Leg  " color={changeColor1('  Leg  ')} titleStyle={{color: 'black'}} buttonStyle={{borderRadius: 10}} onPress={() => buttonLog("  Leg  ", "Location")} />
          <Button title="  Hip  " color={changeColor1('  Hip  ')} titleStyle={{color: 'black'}} buttonStyle={{borderRadius: 10}} onPress={() => buttonLog("  Hip  ", "Location")} />
        </View>
        <View className="bg-lightGray h-4"></View>
      </View>

      <View className="bg-lightGray mt-5 ml-5 mr-5 p-4 rounded-lg">
        <Text className="font-bold text-2xl ml-5">What are the triggers</Text>
        <View className="flex-row mt-5 justify-evenly">
          <Button title="Your data" color={changeColor2('Your data','Triggers')} titleStyle={{color: 'black'}} buttonStyle={{borderRadius: 10}} onPress={() => buttonLog("Your data", "Triggers")} />
          <Button title="Your goals" color={changeColor2('Your goals','Triggers')} titleStyle={{color: 'black'}} buttonStyle={{borderRadius: 10}} onPress={() => buttonLog("Your goals", "Triggers")} />
        </View>
        <View className="bg-lightGray h-4"></View>
      </View>

      <View className="bg-lightGray mt-5 ml-5 mr-5 p-4 rounded-lg">
        <Text className="font-bold text-2xl ml-5">Associated factors</Text>
        <View className="flex-row mt-5 justify-evenly">
          <Button title="Your data" color={changeColor2('Your data', 'asFactors')} titleStyle={{color: 'black'}} buttonStyle={{borderRadius: 10}} onPress={() => buttonLog("Your data", "asFactors")} />
          <Button title="Your goals" color={changeColor2('Your goals', 'asFactors')} titleStyle={{color: 'black'}} buttonStyle={{borderRadius: 10}}onPress={() => buttonLog("Your goals", "asFactors")} />
        </View>
        <View className="bg-lightGray h-4"></View>
      </View>
      <Button title="Next" buttonStyle={{backgroundColor: 'black', borderColor: 'white', borderWidth:2, borderRadius: 30}} containerStyle={{width:200, marginHorizontal: 100, marginVertical: 10}}onPress={handleOnPress}/>
    </View>
    </ScrollView>
  );
}  
export default App;