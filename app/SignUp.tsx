import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { signUp } from "./services/auth";
import { addUserToDatabase } from "./services/database";
import { User } from "firebase/auth";
import { useRouter } from "expo-router"; // Import useRouter from expo-router

interface SignUpScreenProps {
  onSignUpSuccess: (user: User) => void;
}

const SignUpScreen = ({ onSignUpSuccess }: SignUpScreenProps) => {
  const router = useRouter(); // Initialize the router
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    if (!name) {
      Alert.alert("Error", "Please enter your name.");
      return false;
    }
    if (!email) {
      Alert.alert("Error", "Please enter your email.");
      return false;
    }
    if (!password) {
      Alert.alert("Error", "Please enter your password.");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const newUser = await signUp(email, password);

      if (newUser && newUser.uid) {
        await addUserToDatabase(newUser.uid, name);
        onSignUpSuccess(newUser);
        Alert.alert("Success", "Account created successfully!");
      } else {
        throw new Error("User sign-up failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Sign-up error:", error);
      Alert.alert("Error", error.message || "An error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = (provider: string) => {
    Alert.alert("Info", `${provider} login not implemented yet.`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Back button to navigate to onboarding */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push("/initialOnboarding")} // Navigate to onboarding
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Sign up</Text>
      </View>
      
      <Text style={styles.subtitle}>Sign up with one of following options.</Text>

      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity 
          style={styles.socialButton}
          onPress={() => handleSocialAuth("Google")}
        >
          <Text style={styles.socialButtonText}>G</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.socialButton}
          onPress={() => handleSocialAuth("Apple")}
        >
          <Text style={styles.socialButtonText}>⌘</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.inputLabel}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Oliver Cederborg"
        placeholderTextColor="#666"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />

      <Text style={styles.inputLabel}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="tim@apple.com"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.inputLabel}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Pick a strong password"
        placeholderTextColor="#666"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#D946EF" />
      ) : (
        <>
          <TouchableOpacity
            style={styles.mainButton}
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text style={styles.mainButtonText}>Create Account</Text>
          </TouchableOpacity>
          
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>
              Already have an account? 
            </Text>
            {/* Log in button to navigate to login page */}
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={styles.switchButtonText}>
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingTop: 100,
    backgroundColor: "#111111",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  backButtonText: {
    color: "#FFF",
    fontSize: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 20,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  socialButton: {
    width: "48%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
  },
  socialButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 10,
    backgroundColor: "#111827",
    color: "#FFFFFF",
    fontSize: 16,
  },
  mainButton: {
    width: "100%",
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#D946EF",
    alignItems: "center",
  },
  mainButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  switchText: {
    color: "#9CA3AF",
    fontSize: 14,
  },
  switchButtonText: {
    color: "#D946EF",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default SignUpScreen;