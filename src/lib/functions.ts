import { getDocs, collection, doc, getDoc, setDoc, DocumentData } from 'firebase/firestore';
import { auth, firestore } from './firebase';
import { HymnalType } from '@/definitions/types';
import { hymnalNames } from '@/definitions/data';
import { User } from 'firebase/auth';

export async function unlockSelectedHymnals(hymnals: HymnalType[], user: User | null, ) {
    /* aquire user id */
    if (user?.email != null) {
        console.log(user.email)

        const docRef = doc(firestore, "users", "alex@taylorspot.com", "userData", "hymnalAccess");
        const docSnap = await getDoc(docRef);
        let localData: DocumentData;

        if (docSnap.exists()) {
            localData = docSnap.data();
            console.log(localData)
            hymnals.forEach(hymnal => {
                const interpName = getMappingBetweenHymnals(hymnal.title);
                localData[interpName] = true;
            })
            console.log(localData)
            await setDoc(doc(firestore, "users", user.email.toString(), "userData", "hymnalAccess"), localData);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }
}

export async function lockSelectedHymnals(hymnals: HymnalType[], user: User | null, ) {
    /* aquire user id */
    if (user?.email != null) {

        const docRef = doc(firestore, "users", "alex@taylorspot.com", "userData", "hymnalAccess");
        const docSnap = await getDoc(docRef);
        let localData: DocumentData;

        if (docSnap.exists()) {
            localData = docSnap.data();
            hymnals.forEach(hymnal => {
                const interpName = getMappingBetweenHymnals(hymnal.title);
                localData[interpName] = false;
            })
            await setDoc(doc(firestore, "users", user.email.toString(), "userData", "hymnalAccess"), localData);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }
}

/* Helper Functions */

function getMappingBetweenHymnals(hymnalName: string) {
    switch (hymnalName) {
        case hymnalNames[0]:
            return "SOZ";
        case hymnalNames[1]:
            return "ECS";
        case hymnalNames[2]:
            return "OSH12";
        case hymnalNames[3]:
            return "OSH100";
        case hymnalNames[4]:
            return "WTK";
        case hymnalNames[5]:
            return "PBH";
        default:
            return "-1";
    }
}