import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Function to split text into an array of letters
const splitTextIntoLetters = (text: string) => text.split('');

// Function to create animations for each letter
const createAnimations = (text: string) => {
  return splitTextIntoLetters(text).map((_, index) => {
    const animation = new Animated.Value(-300); // Start position above the screen
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

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const text = "Login";
  const animations = useState(createAnimations(text))[0];
  const [captcha, setCaptcha] = useState(generateCaptcha(4));
  const [enteredCaptcha, setEnteredCaptcha] = useState('');

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

  return (
    <View style={styles.container}>
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
        <Icon name="envelope" size={20} color="#fff" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#fff" />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#fff" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#fff" secureTextEntry />
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
      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.linkText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#fff',
    fontFamily: 'Bazooka-BoldItalic', // Ensure this name matches exactly
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  input: {
    flex: 1,
    padding: 10,
    color: '#fff',
    fontFamily: 'Bazooka', // Ensure this name matches exactly
  },
  captchaDisplayContainer: {
    backgroundColor: '#333',
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  captchaText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f4f4ee',
    fontFamily: 'Italic',
  },
  refreshText: {
    color: '#aaa',
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Bazooka',
  },
  captchaInputContainer: {
    width: '100%',
    marginTop: 10,
  },
  captchaInput: {
    padding: 10,
    backgroundColor: '#333',
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    color: '#fff',
    fontFamily: 'Bazooka',
  },
  icon: {
    padding: 10,
  },
  button: {
    backgroundColor: '#555',
    padding: 10,
    borderRadius: 45,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Bazooka',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  linkText: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 10,
    fontFamily: 'Bazooka',
  },
});

export default LoginScreen;
