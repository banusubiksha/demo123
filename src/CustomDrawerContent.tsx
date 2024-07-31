import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import userData from './data.json';

const CustomDrawerContent: React.FC<any> = (props) => {
  const user = userData.user;

  const navigateToProfile = () => {
    props.navigation.navigate('Profile');
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={navigateToProfile}>
            <Image
              source={require('./assets/logo.png')}
              style={styles.profilePicture}
            />
          </TouchableOpacity>
          <Text style={styles.viewProfile} onPress={navigateToProfile}>
            View Profile
          </Text>
        </View>

        <View style={styles.drawerItems}>
          <DrawerItemList {...props} />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  profileContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  viewProfile: {
    fontSize: 18,
    color: '#007BFF',
    marginTop: 10,
  },
  drawerItems: {
    flex: 1,
    marginTop: 20,
  },
});

export default CustomDrawerContent;