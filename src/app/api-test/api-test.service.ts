import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiTestService {
  myMethod$: Observable<any>
  private myMethodSubject = new Subject<any>()

  constructor() {
    this.myMethod$ = this.myMethodSubject.asObservable()
  }

  myMethod(data: any){
    console.log(data)
    this.myMethodSubject.next(data)
  }
}
