import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
    isAuthenticated: boolean = false; 
    private userSub : Subscription;
    constructor(private dataStorgae: DataStorageService,
                private authService: AuthService){}

    ngOnInit(){
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;            
        });
    }

    saveData(){
        this.dataStorgae.storeRecipe()
    }

    fetchRecipe(){
        this.dataStorgae.fetchRecipe().subscribe();
    }

    onLogout(){
        this.authService.logout();
    }

    ngOnDestroy(){
        this.userSub.unsubscribe();
    }
}
