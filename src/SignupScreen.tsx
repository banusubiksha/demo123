import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated, ScrollView, Platform, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';

// Function to split text into an array of letters
const splitTextIntoLetters = (text: string) => text.split('');

// Function to create animations for each letter
const createAnimations = (text: string) => {
  return splitTextIntoLetters(text).map((_, index) => {
    const animation = new Animated.Value(-3000); // Start position above the screen
    Animated.timing(animation, {
      toValue: 0, // End position
      duration: 1500,
      delay: index * 100, // Staggered delay
      useNativeDriver: true,
    }).start();
    return animation;
  });
};

// Function to generate a random CAPTCHA code of a given length
const generateCaptcha = (length: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let captcha = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    captcha += characters[randomIndex];
  }
  return captcha;
};

const SignupScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const text = "Sign Up";
  const animations = useState(createAnimations(text))[0];
  const [salutation, setSalutation] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [captcha, setCaptcha] = useState(generateCaptcha(4));
  const [enteredCaptcha, setEnteredCaptcha] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Refresh CAPTCHA when the component mounts
    setCaptcha(generateCaptcha(4));
  }, []);

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha(4));
  };

  const handleCaptchaChange = (text: string) => {
    setEnteredCaptcha(text);
  };

  const handleSignup = () => {
    // Add your signup logic here
    if (enteredCaptcha === captcha) {
      // Proceed with signup
      navigation.replace('Login');
    } else {
      alert('CAPTCHA does not match');
      refreshCaptcha();
    }
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDateOfBirth(currentDate);
    }
  };

  // Set maximum date to January 1, 2006
  const maximumDate = new Date(2006, 0, 1);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        {splitTextIntoLetters(text).map((letter, index) => (
          <Animated.Text
            key={index}
            style={[styles.title, {
              transform: [{ translateY: animations[index] }],
            }]}
          >
            {letter}
          </Animated.Text>
        ))}
      </View>
      <View style={styles.inputContainer}>
        <Icon name="user" size={30} color="#fff" style={styles.icon} />
        <TextInput 
          style={styles.input} 
          placeholder="Name" 
          placeholderTextColor="#fff" 
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={30} color="#fff" style={styles.icon} />
        <TextInput 
          style={styles.input} 
          placeholder="Email" 
          placeholderTextColor="#fff" 
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="phone" size={30} color="#fff" style={styles.icon} />
        <TextInput 
          style={styles.input} 
          placeholder="Phone Number" 
          placeholderTextColor="#fff" 
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="calendar" size={30} color="#fff" style={styles.icon} />
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
          <Text style={styles.datePickerText}>{dateOfBirth.getFullYear() === 1970 ? 'Select Date' : dateOfBirth.toDateString()}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Icon name="home" size={30} color="#fff" style={styles.icon} />
        <TextInput 
          style={styles.input} 
          placeholder="Address" 
          placeholderTextColor="#fff" 
          value={address}
          onChangeText={setAddress}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={30} color="#fff" style={styles.icon} />
        <TextInput 
          style={styles.input} 
          placeholder="Password" 
          placeholderTextColor="#fff" 
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={30} color="#fff" style={styles.icon} />
        <TextInput 
          style={styles.input} 
          placeholder="Confirm Password" 
          placeholderTextColor="#fff" 
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      {/* CAPTCHA Display and Refresh Section */}
      <View style={styles.captchaDisplayContainer}>
        <Text style={styles.captchaText}>{captcha}</Text>
        <TouchableOpacity onPress={refreshCaptcha}>
          <Text style={styles.refreshText}>Refresh CAPTCHA</Text>
        </TouchableOpacity>
      </View>
      {/* CAPTCHA Input Section */}
      <View style={styles.captchaInputContainer}>
        <TextInput 
          style={styles.captchaInput} 
          placeholder="Enter CAPTCHA" 
          placeholderTextColor="#fff" 
          value={enteredCaptcha}
          onChangeText={handleCaptchaChange}
        />
      </View>
      {/* Signup Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Back to Login</Text>
        </TouchableOpacity>
      </View>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={dateOfBirth}
          mode="date"
          display="default"
          onChange={onChangeDate}
          maximumDate={maximumDate}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#fff',
    fontFamily: 'Bazooka-BoldItalic', // Ensure this name matches exactly
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize:16,
    color: '#fff',
    fontFamily: 'Bazooka', // Ensure this name matches exactly
  },
  captchaDisplayContainer: {
    backgroundColor: '#333',
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    padding: 9,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  captchaText: {
    fontSize: 18,
    color: '#fff',
  },
  refreshText: {
    fontSize: 16,
    color: '#717171',
    marginTop: 5,
  },
  captchaInputContainer: {
    backgroundColor: '#333',
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    width: '100%',
  },
  captchaInput: {
    padding: 10,
    fontSize: 16,
    color: '#fff',
  },
  button: {
    backgroundColor: '#555',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkContainer: {
    marginTop: 20,
  },
  linkText: {
    color: '#fff',
    fontSize: 16,
  },
  icon: {
    padding: 15,
  },
  datePicker: {
    flex: 1,
    padding: 15,
  },
  datePickerText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SignupScreen;
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}

