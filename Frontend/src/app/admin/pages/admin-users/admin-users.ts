import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../services/auth';
import { USER } from '../../../shared/models/user.model';

@Component({
  selector: 'app-admin-users',
  imports: [],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css',
})
export class AdminUsers implements OnInit {
  users = signal<USER[]>([]);

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.authService.getAllUsers().subscribe((response) => {
      this.users.set(response.data);
      console.log(response);
    });
  }
}
