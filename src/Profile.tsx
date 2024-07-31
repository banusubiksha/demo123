import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

// Import user data (ensure this file exists and has the expected structure)
import userData from './data.json';

type ProfilePageProps = {
  navigation: DrawerNavigationProp<any, any>;
};

const ProfilePage: React.FC<ProfilePageProps> = ({ navigation }) => {
  const user = userData.user;
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const handleChoosePhoto = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response: ImagePickerResponse) => {
      if (!response.didCancel && !response.errorCode && response.assets && response.assets.length > 0) {
        setPhotoUri(response.assets[0].uri ?? null);
      }
    });
  };

  // Navigate to Drawer and pass photo URI as a parameter
  const handleNavigate = () => {
    navigation.navigate('Drawer', { photoUri });
  };

  const getInitials = (name: string) => {
    const nameParts = name.split(' ');
    return nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[1][0]}`
      : nameParts[0][0];
  };

  const initials = getInitials(user.name);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={handleChoosePhoto}>
          {photoUri ? (
            <Image
              source={{ uri: photoUri }}
              style={styles.profilePicture}
            />
          ) : (
            <View style={styles.initialsContainer}>
              <Text style={styles.initials}>{initials}</Text>
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.viewProfile}>Tap to change photo</Text>
      </View>

      <View style={styles.userDetails}>
        <Text style={styles.userDetail}>Salutation: {user.salutation}</Text>
        <Text style={styles.userDetail}>Name: {user.name}</Text>
        <Text style={styles.userDetail}>Email: {user.email}</Text>
        <Text style={styles.userDetail}>Phone: {user.phone}</Text>
        <Text style={styles.userDetail}>Address: {user.address}</Text>
      </View>
      
    </View>
  );
};

// Styles for the ProfilePage component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#007BFF',
  },
  initialsContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#000',
  },
  initials: {
    fontSize: 50,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  viewProfile: {
    fontSize: 14,
    color: '#007BFF',
    marginTop: 10,
  },
  userDetails: {
    width: '100%',
    paddingHorizontal: 20,
  },
  userDetail: {
    fontSize: 16,
    marginBottom: 12,
    color: '#333',
  },
  
 
});

export default ProfilePage;
