import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList , SafeAreaView } from 'react-native';
import ListItem from "../components/ListItem";
import axios from 'axios';
import Constants from 'expo-constants';

const URL = `http://newsapi.org/v2/top-headlines?country=jp&category=business&apiKey=${Constants.manifest.extra.newsApiKey}`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    height: 100,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    flexDirection: "row"
  },
  leftContainer: {
    width: 100,
  },
  rightContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
    justifyContent: "space-between"
  },
  text: {
    fontSize: 16,
  },
  subText: {
    fontSize: 12,
    color: "gray"
  }
});

export default HomeScreen = (props) => {
  const { navigation } = props;

  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
      try {
        const response = await axios.get(URL);
        setArticles(response.data.articles);
      } catch (error) {
        console.error(error);
      }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles}
        renderItem={({item}) => (
          <ListItem
           imageUrl={item.urlToImage}
           title={item.title}
           author={item.author}
           onPress={() => navigation.navigate('Article')}
           />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}
