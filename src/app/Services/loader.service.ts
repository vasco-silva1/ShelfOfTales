import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
// BehaviorSubject to track loading state
private loadingSubject = new BehaviorSubject<boolean>(false);
loading$ = this.loadingSubject.asObservable();

// Show loader
show() {
  this.loadingSubject.next(true);
}

// Hide loader
hide() {
  this.loadingSubject.next(false);
}
}
