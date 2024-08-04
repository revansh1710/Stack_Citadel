import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private storage: AngularFireStorage, private afs: AngularFirestore,private router:Router) { }
  uploadImage(selectedImage: any, postData: any,formStatus:string,id:string) {
    const filePath = `postImg/${Date.now()}`;
    console.log(filePath);
    this.storage.upload(filePath, selectedImage).then(() => {
      console.log('post Image Uploaded Successfully');
      this.storage.ref(filePath).getDownloadURL().subscribe(URL => {
        postData.postImgPath = URL;
        if(formStatus=='Edit'){
          this.updateData(id,postData);
        }
        else{
        this.saveData(postData);
        }
      })
    })
  }
  saveData(postData: any) {
    this.afs.collection('posts').add(postData).then(docRef => {
      Swal.fire({
        icon: 'success',
        text: 'Data Inserted Successfully'
      })
      this.router.navigate(['/posts']);
    })
  }
  loadData(){
    return this.afs.collection('posts').snapshotChanges().pipe(
      map(actions=>{
       return actions.map(a=>{
          const data=a.payload.doc.data();
          const id=a.payload.doc.id;
          return {id,data}
        })
      })
    )
  }
  loadOneData(id:string){
   return this.afs.collection('posts').doc(id).valueChanges();
  }
  updateData(id:string,postData:any){
    this.afs.collection('posts').doc(id).update(postData).then(()=>{
      Swal.fire({
        icon:'success',
        text:'Data Updated Successfully'
      })
      this.router.navigate(['/posts']);
    })
  }
  deleteImage(postImgPath:any,id:string){
    this.storage.storage.refFromURL(postImgPath).delete().then(()=>{
      this.deleteData(id)
    })
  }
  deleteData(id:string){
    this.afs.collection('posts').doc(id).delete().then(()=>{
      Swal.fire({
        icon:'success',
        text:'Data Deleted Successfully'
      })
    })
  }
  markFeatured(id:string,featuredData:any){
    this.afs.collection('posts').doc(id).update(featuredData).then(()=>{
      Swal.fire({
        icon:'info',
        text:'Feature status Updated'
      })
    })
  }
}
