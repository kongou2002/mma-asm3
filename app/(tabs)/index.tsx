import { FlatList, Image, StyleSheet } from 'react-native';
import {useEffect} from 'react';
import { Button, ButtonGroup, Card } from '@rneui/themed';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import { View } from '../../components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

type Orchid = {
  id: string;
  name: string;
  img: string;
  descriptions: string;
};

const orchidsList = [
  {
    id: "1",
    name: "Phalaenopsis",
    img: "https://images.unsplash.com/photo-1618080578815-335456280012?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    descriptions:"lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "2",
    name: "Cattleya",
    img: "https://images.unsplash.com/photo-1591919668546-512635aa9030?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
    descriptions:"lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "3",
    name: "Dendrobium",
    img: "https://images.unsplash.com/photo-1689956841825-15aeafe5d510?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80",
    descriptions:"lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "4",
    name: "Miltonia",
    img: "https://images.unsplash.com/photo-1679966519593-43d645c9c433?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    descriptions:"lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "5",
    name: "Oncidium",
    img: "https://images.unsplash.com/photo-1510020278092-00b7460e9317?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80",
    descriptions:"lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "6",
    name: "Paphiopedilum",
    img: "https://images.unsplash.com/photo-1650731162438-ebef24a5078c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80",
    descriptions:"lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "7",
    name: "Cymbidium",
    img: "https://images.unsplash.com/photo-1696348997621-5040c4571b4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    descriptions:"lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "8",
    name: "Vanda",
    img: "https://plus.unsplash.com/premium_photo-1667239048943-ebbf4ad26271?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1908&q=80",
    descriptions:"lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
]

export default function TabOneScreen() {
  const [data, setData] = useState<Orchid[]>([]);
  useEffect(() =>{
    const getData = async () => {
      const orchids = await AsyncStorage.getItem('data');
      const orchidsArray = await JSON.parse(orchids!);
      setData(orchidsArray);
      const key = await AsyncStorage.getAllKeys();
      console.log(key);
    }
    getData();
  },[])
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
