import {Component, OnInit} from "@angular/core";
import {RouteParams, Router, CanActivate} from "@angular/router-deprecated";
import {ClueService} from "../../service/clue.service";
import {Clue} from "../../model/clue";
import {UserService} from "../../service/user.service";
import {ProgressionStatus} from "../../model/progressionStatus";
import {tokenNotExpired} from "angular2-jwt";

@Component({
    selector: 'clue',
    templateUrl: 'app/route/clue/clue.component.html'
})
@CanActivate(() => tokenNotExpired())
export class ClueComponent implements OnInit {
    progressionStatus:ProgressionStatus;
    clue:Clue;

    constructor(private clueService:ClueService,
                private userService:UserService,
                private router:Router,
                private routeParams:RouteParams) {
    }

    ngOnInit() {
        this.clueService.getLatest().subscribe(clue => this.clue = clue);
        this.userService.getProgressionStatus().subscribe(
            progressionStatus => {
                this.progressionStatus = progressionStatus;

                if (progressionStatus.nextName == "SCAN") {
                    console.debug("Haven't scanned anything yet.");
                    this.router.navigate(['/Dashboard']);
                }

                if (progressionStatus.nextName == "TASK") {
                    console.debug("Clue solved. Redirecting to task.");
                    this.router.navigate(['/Task']);
                }
            }
        )

    }

}