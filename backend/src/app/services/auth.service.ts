import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  isLoggedInGuard:boolean=false;
  constructor(private afAuth: AngularFireAuth,private router:Router) { }

  login(email: any, password: any) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(logRef => {
        Swal.fire({
          icon: 'success',
          text: 'Logged in Successfully'
        });
        this.loadUser();
        this.loggedIn.next(true);
        this.isLoggedInGuard=true;
        this.router.navigate(['/']);
      })
      .catch(error => {
         console.log(error.message)
      });
  }
  loadUser(){
    this.afAuth.authState.subscribe(user=>{
      localStorage.setItem('user',JSON.stringify(user))
    })
  }
  logout(){
    this.afAuth.signOut().then(()=>{
      Swal.fire({
        icon:'success',
        text:'User Logged Out Successfully'
      })
      localStorage.removeItem('user');
      this.loggedIn.next(false);
      this.isLoggedInGuard=false
      this.router.navigate(['/login']);
    })
  }
  isLoggedIn(){
    return this.loggedIn.asObservable();
  }
}
