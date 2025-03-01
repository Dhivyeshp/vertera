import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert, StyleSheet } from "react-native";
import { signUp, signIn, logOut } from "../services/auth";
import { addUserToDatabase } from "../services/database"; 
import { User } from "firebase/auth"; 

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null); 
  const [loading, setLoading] = useState(false); // Prevent multiple sign-ups

  const handleSignUp = async () => {
    setLoading(true); // Disable button while processing
    try {
      const newUser = await signUp(email, password);

      if (newUser && newUser.uid) { // Ensure user exists
        await addUserToDatabase(newUser.uid, newUser.email || ""); 
        setUser(newUser); // Redirect to welcome
      } else {
        throw new Error("User sign-up failed. Please try again.");
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      Alert.alert("Error", error.message || "An error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const loggedInUser = await signIn(email, password);
      setUser(loggedInUser);
    } catch (error) {
      Alert.alert("Error", error.message || "An error occurred during sign-in.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogOut = async () => {
    try {
      await logOut();
      setUser(null);
    } catch (error) {
      Alert.alert("Error", error.message || "An error occurred during logout.");
    }
  };

  return (
    <View style={styles.container}>
      {!user ? (
        <>
          <Text style={styles.title}>Sign Up / Sign In</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />
          <View style={styles.buttonContainer}>
            <Button title="Sign Up" onPress={handleSignUp} color="#4CAF50" disabled={loading} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Sign In" onPress={handleSignIn} color="#2196F3" disabled={loading} />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.welcomeText}>Welcome, {user.email}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Log Out" onPress={handleLogOut} color="#FF5722" />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    width: "100%",
    marginVertical: 5,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default SignUpScreen;
