import {Component, OnInit} from '@angular/core';
import {RouteParams, Router, CanActivate} from '@angular/router-deprecated';

import {TaskService} from '../../service/task.service'
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";
import {ProgressionStatus} from "../../model/progressionStatus";
import {AuthService} from "../../service/auth.service";

import {tokenNotExpired} from "angular2-jwt";

@Component({
    selector: 'scan',
    templateUrl: 'app/route/dashboard/dashboard.component.html'
})
@CanActivate(() => tokenNotExpired())
export class DashboardComponent implements OnInit {
    user:User;
    progressionStatus:ProgressionStatus;
    mode = "test";

    constructor(private taskService:TaskService,
                private routeParams:RouteParams,
                private auth:AuthService,
                private router:Router,
                private userService:UserService) {
    }

    ngOnInit() {
        this.userService.getProgressionStatus().subscribe(progressionStatus => {
            this.progressionStatus = progressionStatus;

            if(this.progressionStatus.nextName == "CLUE") {
                this.router.navigate(['/Clue']);
            }

            if(this.progressionStatus.nextName == "TASK") {
                this.router.navigate(['/Task']);
            }
        });
    }
}
