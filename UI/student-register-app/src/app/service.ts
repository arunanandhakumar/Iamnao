// src/app/student.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'https://localhost:5241/api/students';

  constructor(private http: HttpClient) { }

  register(student: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, student);
  }

  login(student: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, student);
  }
}
