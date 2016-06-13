///<reference path="../../node_modules/zone.js/dist/zone.js.d.ts"/>

import {Injectable} from "@angular/core";
import {AuthHttp, JwtHelper} from "angular2-jwt";
import {ProgressionStatus} from "../model/progressionStatus";
import {User} from "../model/user";
import {Observable} from "rxjs/Observable";
import "../rxjs-operators";
import {tokenNotExpired} from 'angular2-jwt';


@Injectable()
export class UserService {

    constructor(private authHttp:AuthHttp,
                private jwtHelper:JwtHelper) {
    }

    whoami():Observable<User> {
        return this.authHttp.get(USER_URL + "whoami")
            .map((res) => res.json() || {})
            .catch(this.handleError);
    }

    register():Observable<User> {
        return this.authHttp.get(USER_URL + "register")
            .map((res) => res.json() || {})
            .catch(this.handleError);
    }

    getProgressionStatus():Observable<ProgressionStatus> {
        return this.authHttp.get(USER_URL + "progressionStatus")
            .map(response => response.json() || {})
            .catch(this.handleError);
    }

    private handleError(error:any) {
        if(!tokenNotExpired()) {
            console.debug("NOT LOGGED IN")
	    return Observable.throw(error);
        }
        error = error.json() ? {message: error.json().message, status: error.json().status} : error;

        console.error('An error occurred', error);
        return Observable.throw(error);
    }
}
