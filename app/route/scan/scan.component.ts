import {Component, OnInit} from "@angular/core";
import {RouteParams, Router, CanActivate} from "@angular/router-deprecated";
import {ScanService} from "../../service/scan.service";
import {ProgressionStatus} from "../../model/progressionStatus";
import {tokenNotExpired} from 'angular2-jwt';

@Component({
    selector: 'scan',
    templateUrl: 'app/route/scan/scan.component.html'
})
@CanActivate(() => tokenNotExpired())
export class ScanComponent implements OnInit {
    progressionStatus:ProgressionStatus;
    hasError:boolean;

    constructor(private scanService:ScanService,
                private routeParams:RouteParams,
                private router:Router) {
    }

    ngOnInit() {
        let codeTagId = +this.routeParams.get('id');
        let unlockCode = this.routeParams.get('code');
        
        this.scanService.scan(codeTagId, unlockCode)
            .subscribe(
                task => this.router.navigate(["/Task"]),
                error => {
                    if(error.message == "ALREADY_UNLOCKED") {
                        this.router.navigate(["/Task"]);
                    }
                    this.hasError = true;
                }
            );
    }

}
