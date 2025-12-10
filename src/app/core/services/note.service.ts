import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private readonly http = inject(HttpClient);
  token = localStorage.getItem('token');
 
  addNote(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}notes`, data);
  }
  getNotes(): Observable<any> {
    return this.http.get(`${environment.apiUrl}notes/allNotes`);
  }
  getUserNotes(): Observable<any> {
    return this.http.get(`${environment.apiUrl}notes`);
  }
  deleteNote(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}notes/${id}`);
  }
  updateNote(data: any,id: string): Observable<any> {
    return this.http.put(`${environment.apiUrl}notes/${id}`, data);
  }
}
