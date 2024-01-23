import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Button, StyleSheet, Alert, } from 'react-native';
import React, { useState } from 'react';


const NumeroArvaus = () => {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState('Guess a number between 1 and 100.');
  const [attempts, setAttempts] = useState(0);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const handleGuess = () => {
    const guess = parseInt(userGuess);

    if (isNaN(guess) || guess < 1 || guess > 100) {
      setFeedback('Invalid Guess. Please enter a number between 1 and 100.');
      return;
    }

    setAttempts(attempts + 1);

    if (guess === randomNumber) {
      Alert.alert(
        'Congratulations!',
        `You guessed the number in ${attempts} ${attempts === 1 ? 'guess' : 'guesses'}.`,
        [{ text: 'OK', onPress: () => resetGame() }]
      );
    } else if (guess < randomNumber) {
      setFeedback(`Your guess ${guess} is too low`);
    } else {
      setFeedback(`Your guess ${guess} is too high`);
    }

    setUserGuess('');
  };

  const resetGame = () => {
    setRandomNumber(generateRandomNumber());
    setAttempts(0);
    setFeedback('Guess a number between 1 and 100.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
      <Text style={styles.feedback}>{feedback}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter your guess"
        value={userGuess}
        onChangeText={(text) => setUserGuess(text)}
      />
      <Button title="Make guess" onPress={handleGuess} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  feedback: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
  },
});

export default NumeroArvaus;