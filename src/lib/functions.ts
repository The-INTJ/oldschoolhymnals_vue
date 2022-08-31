import { getDocs, collection } from 'firebase/firestore';
import { firestore } from './firebase';
import { HymnalType } from '@/definitions/types';
import { User } from 'firebase/auth';

export async function unlockSelectedHymnals(hymnals: HymnalType[], user: User) {
    /* aquire hymnals to unlock */
    
}