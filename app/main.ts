import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import {HTTP_PROVIDERS} from '@angular/http';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from "@angular/router-deprecated";


import {AuthHttp, AuthConfig, AUTH_PROVIDERS, JwtHelper} from 'angular2-jwt';

import {ScanService} from './service/scan.service'
import {TaskService} from './service/task.service'
import {UserService} from './service/user.service'
import {ClueService} from './service/clue.service'
import {AuthService} from "./service/auth.service";

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    AUTH_PROVIDERS,
    ROUTER_PROVIDERS,
    ScanService,
    TaskService,
    UserService,
    ClueService,
    AuthService,
    JwtHelper,
]);