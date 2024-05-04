import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Song from 'src/song.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: Firestore) { }

  createSong(song: Song) {
    const placeRef = collection(this.firestore, 'songList');
    return addDoc(placeRef, song)
  }

  getSongList(): Observable<Song[]> {
    const placeRef = collection(this.firestore, 'songList');
    return collectionData(placeRef, {idField: 'id'}) as Observable<Song[]>
  }

  getSongDetail(songId: string) {
    const placeDocRef = doc(this.firestore, `songList/${songId}`)
    return getDoc(placeDocRef)
  }

  deleteSong(song: Song) {
    const placeDocRef = doc(this.firestore, `songList/${song.id}`)
    return deleteDoc(placeDocRef)
  }
}
