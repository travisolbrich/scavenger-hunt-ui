import {Component, enableProdMode, OnInit} from "@angular/core";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from "@angular/router-deprecated";
import {ScanComponent} from "./route/scan/scan.component";
import {DashboardComponent} from "./route/dashboard/dashboard.component";
import {TaskComponent} from "./route/task/task.component";
import {ClueComponent} from "./route/clue/clue.component";

import {AuthService} from "./service/auth.service";
import {UserService} from "./service/user.service";
import {User} from "./model/user";

enableProdMode();

@Component({
    selector: 'scavenger-hunt',
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS
    ]
})

@RouteConfig([
    {path: '/dashboard', name: 'Dashboard', useAsDefault: true, component: DashboardComponent},
    {path: '/scan/:id/code/:code', name: 'Scan', component: ScanComponent},
    {path: '/task', name: 'Task', component: TaskComponent},
    {path: '/clue', name: 'Clue', component: ClueComponent},
])

export class AppComponent implements OnInit{
    showLoginError:boolean = true;
    user: User;

    constructor(
        private auth:AuthService,
        private userService:UserService
    ) {}

    ngOnInit() {
	if(this.auth.authenticated()) {
        this.userService.whoami().subscribe(user => this.user = user);
	}
    }
}
