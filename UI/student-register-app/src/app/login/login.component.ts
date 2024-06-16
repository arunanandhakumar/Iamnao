import { Component } from '@angular/core';
import { StudentService } from '../service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,HttpClientModule, MatToolbarModule,
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {student = { email: '', password: '' };

constructor(private studentService: StudentService, private router: Router) {}

login() {
  this.studentService.login(this.student).subscribe(
    response => {
      console.log('Login successful', response);
      // Optionally, you can store the token or user data in localStorage here if needed
      this.router.navigate(['/dashboard']);
    },
    error => {
      console.error('Login failed, attempting local storage fallback', error);
      // Attempt to find user in localStorage
      const tempUsers = JSON.parse(localStorage.getItem('tempUsers') || '[]');
      const user = tempUsers.find((user: any) => user.email === this.student.email && user.password === this.student.password);

      if (user) {
        // User found in local storage, consider login successful
        this.router.navigate(['/dashboard']);
      } else {
        // Handle invalid login or display appropriate error message
        alert('Invalid login credentials');
      }
    }
  );
}
}