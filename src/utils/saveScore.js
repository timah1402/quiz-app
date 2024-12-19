import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const saveUserScore = async (userId, userName, score) => {
  try {
    await addDoc(collection(db, 'scores'), {
      userId: userId,
      userName: userName,
      score: score,
      date: new Date().toISOString() // Date actuelle
    });
    console.log('Score ajouté avec succès !');
  } catch (error) {
    console.error('Erreur lors de l\'ajout du score :', error);
  }
};
