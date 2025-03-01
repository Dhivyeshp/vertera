import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

const usersCollection = collection(db, "users");

// Add a user to Firestore
export const addUserToDatabase = async (userId: string, email: string) => {
  try {
    await addDoc(usersCollection, {
      userId,
      email,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

// Get all users from Firestore
export const getUsers = async () => {
  try {
    const snapshot = await getDocs(usersCollection);
    return snapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
