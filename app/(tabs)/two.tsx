import { Image, Pressable, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from '@rneui/themed';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { View } from '../../components/Themed';

type Orchid = {
  id: string;
  name: string;
  img: string;
  descriptions: string;
  isFavorite: boolean;
};

export default function TabTwoScreen() {
  const [data, setData] = useState<Orchid[]>([]);

  useEffect(() =>{
    const getData = async () => {
      const orchids = await AsyncStorage.getItem('favorite');
      const orchidsArray = await JSON.parse(orchids!);
      setData(orchidsArray);
    }
    getData();
  },[AsyncStorage.getItem('favorite')])
  return (
    <View style={styles.container}>
      <FlatList style={styles.list} data={data} renderItem={
    ({item}) => {
      return (
        <>
        <Link href={{pathname:"/(tabs)/[detailsid]" , params:{detailsid:`${item.id}`,name:`${item.name}`, img:`${item.img}`,descriptions:`${item.descriptions}`}}} asChild>
          <Pressable style={{width:"100%"}}>
            <Card>
              {/* <Text>{item.id}</Text> */}
              <Card.Title>{item.name}</Card.Title>
              <Card.Divider />
              <View style={{position:"relative",alignItems:"center"}}>
                <Image source={{uri: item.img}} style={{width: "100%", height: 400,}} />
              </View>
            </Card>
          </Pressable>
        </Link>
        </>
      );
    }
  }/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  list:{
    width: '100%',
    height: '100%',
  }
});