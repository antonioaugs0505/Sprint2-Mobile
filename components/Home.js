import React from 'react';
import { View, Text, Button } from 'react-native';

const Home = ({ route, navigation }) => {
  const { user } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome, {user.name}!</Text>
      <Button
        title="Logout"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

export default Home;
