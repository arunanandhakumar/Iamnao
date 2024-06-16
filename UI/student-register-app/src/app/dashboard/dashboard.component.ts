import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatToolbarModule,MatButtonModule,MatCardModule,MatFormFieldModule,MatInputModule,MatTableModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent  implements OnInit {
  students: any[] = [];
  images: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Mock data for students, replace with actual API call
    this.students = [
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Smith', email: 'jane@example.com' },
      { name: 'Mike Johnson', email: 'mike@example.com' }
    ];

    
     this.students.forEach((_, index) => {
      this.images[index] = `https://picsum.photos/200?random=${index}`;
    });
  }
 
}