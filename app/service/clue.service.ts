///<reference path="../../node_modules/zone.js/dist/zone.js.d.ts"/>

import {Injectable} from "@angular/core";
import {AuthHttp} from "angular2-jwt";
import {Observable} from "rxjs/Observable";
import {Clue} from "../model/clue";
import {UserService} from "./user.service";
import {tokenNotExpired} from 'angular2-jwt';


import "../rxjs-operators"
import "../urls"

// Operators

@Injectable()
export class ClueService {

    constructor(private authHttp:AuthHttp,
                private userService:UserService) {
    }

    getLatest():Observable<Clue> {
        return this.authHttp.get(CLUE_URL + "current")
            .map(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        error = {message: error.json().message, status: error.json().status} || error;

        console.error('An error occurred', error);
        return Observable.throw(error);
    }
}
