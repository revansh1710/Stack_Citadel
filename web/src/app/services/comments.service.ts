import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private afs: AngularFirestore) { }
  addComments(commentData: any) {
    this.afs.collection('comments').add(commentData).then(() => {
      console.log('Comment Data added successfully')
    })
  }

  loadData() {
    return this.afs.collection('comments').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    )
  }
}
