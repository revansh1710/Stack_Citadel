import { Injectable} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService{

  constructor(private afs:AngularFirestore) { }
  saveData(data: any){
    this.afs.collection('categories').add(data).then(docRef=>{
      console.log(docRef);
     Swal.fire({
      icon:'success',
      text:'Data Inserted Successfully'
     })
        })
        .catch((err: any)=>{
      console.log(err);
    })
  }
 //getting data 
 loadData(){
    return this.afs.collection('categories').snapshotChanges().pipe(
      map(actions=>{
       return actions.map(a=>{
          const data=a.payload.doc.data();
          const id=a.payload.doc.id;
          return {id,data}
        })
      })
    )
  }
  updateData(id:string,EditData:any){
    this.afs.collection('categories').doc(id).update(EditData).then(docRef=>{
      Swal.fire({
        icon:'success',
        text:'Data Updated Successfully'
      })
    })
  }
  deleteData(id:string){
    this.afs.collection('categories').doc(id).delete().then(docRef=>{
      Swal.fire({
        icon:'success',
        text:'Data Deleted Suceessfully',
      })
    })
  }
}
