import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }
    canActivate() {
        const auth = getAuth();
        
        if (auth.currentUser) {
            return true;
        } else {
            this.router.navigate(['']);
             return false;            
        }
    }
}