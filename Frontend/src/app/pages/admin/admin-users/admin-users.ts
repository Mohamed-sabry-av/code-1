import { Component, signal } from '@angular/core';
import { AppUser, UserService } from '../../../services/user';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-admin-users',
  imports: [],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css',
})
export class AdminUsers {
  users = signal<AppUser[]>([]);

  constructor(private userService: UserService, public authService: AuthService) {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((response) => {
      this.users.set(response.users);
    });
  }

  onRoleChange(user: AppUser, event: Event): void {
    const role = (event.target as HTMLSelectElement).value as 'admin' | 'user';
    this.userService.updateUserRole(user._id, role).subscribe(() => {
      this.users.update((list) => list.map((u) => (u._id === user._id ? { ...u, role } : u)));
    });
  }

  onDelete(id: string): void {
    if (!confirm('Delete this user?')) return;

    this.userService.deleteUser(id).subscribe(() => {
      this.users.update((list) => list.filter((u) => u._id !== id));
    });
  }
}
