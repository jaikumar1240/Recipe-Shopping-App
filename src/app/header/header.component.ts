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
    constructor(private dataStorgae: DataStorageService,
                private authService: AuthService){}
    isAuthenticated: boolean = false; 
    private userSub : Subscription;

    ngOnInit(){
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;
            console.log(!user);
            console.log(!!user);
            console.log('hiiiiiiiiiii');
            
        });
    }

    saveData(){
        this.dataStorgae.storeRecipe()
    }

    fetchRecipe(){
        this.dataStorgae.fetchRecipe().subscribe();
    }

    ngOnDestroy(){
        this.userSub.unsubscribe();
    }
}
