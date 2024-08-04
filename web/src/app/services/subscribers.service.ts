import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {
  loadData() {
    throw new Error('Method not implemented.');
  }

  constructor(private afs:AngularFirestore) { }
  addSubs(subData:any){
    this.afs.collection('subscribers').add(subData).then(()=>{
      console.log('subscriber saved successfully')
    })
  }
  checkSubs(subEmail:any){
    return this.afs.collection('subscribers',ref=>ref.where('email','==',subEmail)).get()
  }
}
