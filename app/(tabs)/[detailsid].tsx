import { Button, Card, Dialog } from '@rneui/themed';
import { useLocalSearchParams } from 'expo-router';
import React,{useState} from 'react';
import { Dimensions, Image, Pressable, Text, View } from 'react-native';
// import { Button } from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width,height} = Dimensions.get("screen")
type Orchid = {
  id: string;
  name: string;
  img: string;
  descriptions: string;
};

const details = () => {
  const { detailsid,name,descriptions,img } = useLocalSearchParams<{detailsid:string,name:string,descriptions:string,img:string}>();
  const [visible, setVisible] = useState(false);
  const [text,setText] = useState("")

  const handleAddToFavorite = async () => {
    const data = await AsyncStorage.getItem(`favorite`) || "[]";
    const object:Orchid[] = await JSON.parse(data!);
    //check if the id is in the list
    const isExist = object?.find((item:Orchid) => item.id === detailsid);
    if(isExist){
      return;
    }
    object.push({id:detailsid,name:name,img:img,descriptions:descriptions});
    await AsyncStorage.setItem(`favorite`, JSON.stringify(object));
    setText("Add to favorite success")
    setVisible(true);
  };
  const handleRemoveFromFavorite = async () => {
    // remove from favorite
    const data = await AsyncStorage.getItem(`favorite`);
    const object = await JSON.parse(data!);
    const exist = object?.find((item:Orchid) => item.id === detailsid);
    if(!exist){
      return;
    }
    const filtered = object.filter((item:Orchid) => item.id !== detailsid);
    await AsyncStorage.setItem(`favorite`, JSON.stringify(filtered));
    setText("Remove from favorite success")
    setVisible(true);
  };


  return (
    <>
    <View style={{ flex: 1 }}>
        <Card>
          <Card.Title>{name}</Card.Title>
          <Image source={{ uri: img }} style={{ width: '100%', height: 300 }} resizeMode='contain'/>
          <Card.Divider />
          <Text>{descriptions}</Text>
          <Card.Divider />
          <View>
          <Button onPress={handleAddToFavorite}>add to favorite</Button>
          <Card.Divider />
          <Button onPress={handleRemoveFromFavorite} style={{marginTop:10}}>remove from favorite</Button>
          </View>
        </Card>
        {
          visible && <Pressable onPress={() => setVisible(false)} style={{position: "absolute", width: width, height: height,top:0, left: 0, zIndex: 10, backgroundColor: "rbga(52,52,52,0.5)", alignItems: "center", justifyContent:"center"}}>
            <View style={{paddingHorizontal: 40, paddingVertical: 20, backgroundColor: "white"}}>
              <Text style={{fontWeight: "500", fontSize: 16}}>{text}</Text></View>
        </Pressable>}
    </View>
    </>
  );
};

export default details;
