import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
    isExpanded = false;
    
    get user(): User | null {
        return this.userService.user;
    }

    constructor(
        private router: Router,
        private userService: UserService
    ) {
    }

    collapse() {
        this.isExpanded = false;
    }

    toggle() {
        this.isExpanded = !this.isExpanded;
    }

    loggedUser(): boolean {
        return this.userService.authenticated_user();
    }

    adminUser(): boolean | undefined {
        return this.userService.admin_user();
    }


    exit() {
        this.userService.user = null;
        this.userService.session_clear();
        this.router.navigate(['/']);
    }
}
