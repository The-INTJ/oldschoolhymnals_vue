import { getDocs, collection } from 'firebase/firestore';
import { firestore } from './firebase';

export async function getHymnals() {
    const querySnapshot = await getDocs(collection(firestore, "hymnals"));
    const hymnalArray: any = [];
    querySnapshot.forEach(hymnal => {
        console.log(`${hymnal.id} => ${hymnal.data().Title}`)
        hymnalArray.push(hymnal);
    });
    return hymnalArray;
}