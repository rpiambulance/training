import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Checklist } from '../models/checklist';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  constructor(private http: HttpClient) { }

  createChecklist(checklist: Checklist) {
    return this.http.post('http://localhost:3000/checklist/create', checklist);
  }

  getUserChecklist(userToken: string, credentialAbbr: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/checklist/user', {token: userToken, credential: credentialAbbr});
  }
}