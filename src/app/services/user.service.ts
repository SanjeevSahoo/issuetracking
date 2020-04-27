import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {User}  from '../models/user.model';

@Injectable()
export class UserService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    
    constructor(private http: HttpClient){
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    
    getAllUsers(){
        return this.http.get<any>('http://localhost:8080/user/users',{observe:'response'});
    }

    createUser(user:User){
        return this.http.put<any>('http://localhost:8080/user/user', user, {observe:'response'});
    }

    login(emailid:string, password:string){
        return this.http.post<any>('http://localhost:8080/user/auth',{emailid:emailid, password:password}, {observe:'response'})
        .pipe(map(result => {               
            localStorage.setItem('currentUser', JSON.stringify(result.body.user));
            this.currentUserSubject.next(result.body.user);
            return result;
        }));
    }

    logout(){
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

       
}