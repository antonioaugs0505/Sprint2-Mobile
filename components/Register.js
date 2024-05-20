import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const Register = ({ navigation }) => {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleRegister = () => {
    // Create a new user object
    const newUser = {
      id: Math.random(), // Generate a random id (not a secure way to generate ids)
      name,
      phone,
      email,
      password
    };

    // Add the new user to the array (this is for demonstration purposes, in a real app you would store this in a database)
    users.push(newUser);

    // Navigate back to Login screen
    navigation.navigate('Login');
  };

  return (
    <View>
      <Text>Register Screen</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={text => setPhone(text)}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default Register;
