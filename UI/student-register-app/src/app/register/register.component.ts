import { Component } from '@angular/core';
import { StudentService } from '../service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,HttpClientModule,MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule],
    animations: [
      trigger('fadeInOut', [
        state('void', style({
          opacity: 0
        })),
        transition('void <=> *', animate(500)),
      ])
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  student = { name: '', email: '', password: '' };

  constructor(private studentService: StudentService, private router: Router) { }

  register() {
    this.studentService.register(this.student).subscribe(
      response => {
        console.log('Registration successful', response);
        // Optionally, navigate to the login page here if registration via API is successful
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Registration failed, storing data locally', error);
        // Store user data in localStorage
        const tempUsers = JSON.parse(localStorage.getItem('tempUsers') || '[]');
        tempUsers.push(this.student);
        localStorage.setItem('tempUsers', JSON.stringify(tempUsers));
        
        // Navigate to the login page
        this.router.navigate(['/login']);
      }
    );
  }
}
