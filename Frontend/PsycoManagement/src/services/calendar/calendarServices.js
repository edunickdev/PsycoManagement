import { db } from "../../config/firebase";
import { collection, getDocs, updateDoc, doc, query, where } from "firebase/firestore";

export const getAppointments = async (idTherapist) => {
  try {
    const q = query(collection(db, "appointments"), where("id_therapist", "==", idTherapist));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
};

export const updateAppointment = async (event) => {
  try {
    const eventRef = doc(db, "appointments", event.id);
    await updateDoc(eventRef, event);
    return true;
  } catch (error) {
    console.error("Error updating appointment:", error);
    return false;
  }
};
