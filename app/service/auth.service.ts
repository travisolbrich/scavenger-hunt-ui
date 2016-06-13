import {Injectable, Inject, NgZone} from '@angular/core';
import {AuthHttp, tokenNotExpired} from 'angular2-jwt';
import {UserService} from "./user.service";

import {Router, CanActivate} from "@angular/router-deprecated";
// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class AuthService {
    lock = new Auth0Lock('2HJwlbnUaV8niUj9uyL6LEsxOWhR1TFG', 'travisolbrich.auth0.com');
    refreshSubscription: any;
    user: Object;
    zoneImpl: NgZone;
    userService:UserService;
    router:Router;

    constructor(private authHttp: AuthHttp, @Inject(UserService) userService:UserService, zone: NgZone, router:Router) {
        this.zoneImpl = zone;
        this.user = JSON.parse(localStorage.getItem('profile'));
        this.userService = userService;
        this.router = router;
    }

    public authenticated() {
        // Check if there's an unexpired JWT
        return tokenNotExpired();

    }

    public login() {
        // Show the Auth0 Lock widget
        this.lock.show({authParams: {scope: 'openid given_name family_name email roles'}}, (err, profile, token) => {
            if (err) {
                alert(err);
                return;
            }
            // If authentication is successful, save the items
            // in local storage
            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('id_token', token);

            this.userService.register().subscribe(res => {
                this.zoneImpl.run(() => {
                    this.user = profile;
                    location.reload();
                    
                });
            });
        });
    }

    public logout() {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
        this.zoneImpl.run(() => this.user = null);
    }
}
