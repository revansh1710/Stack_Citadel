import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private afs:AngularFirestore) { }
  loadData(){
    return this.afs.collection('subscribers').snapshotChanges().pipe(
      map(actions=>{
       return actions.map(a=>{
          const data=a.payload.doc.data();
          const id=a.payload.doc.id;
          return {id,data}
        })
      })
    )
  }
  deleteData(id:string){
    this.afs.collection('subscribers').doc(id).delete().then(docRef=>{
      Swal.fire({
        icon:'success',
        text:'Data Deleted Suceessfully',
      })
    })
  }
}
