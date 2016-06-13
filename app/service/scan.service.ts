///<reference path="../../node_modules/zone.js/dist/zone.js.d.ts"/>

import { Headers, Http } from '@angular/http';
import { Injectable }    from '@angular/core';
import {AuthHttp, AuthConfig, AUTH_PROVIDERS} from 'angular2-jwt';
import {Task} from '../model/task'
import {tokenNotExpired} from 'angular2-jwt';

import {Observable} from "rxjs/Observable";
import "../rxjs-operators"


@Injectable()
export class ScanService {

    constructor(private authHttp: AuthHttp) { }
    
    scan(codeTagId: number, unlockCode: string): Observable<Task[]> {
        return this.authHttp.get(CODE_TAG_URL  + codeTagId + "/scan/" + unlockCode)
            .map(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        error = {message: error.json().message, status: error.json().status} || error;

        console.error('An error occurred', error);
        return Observable.throw(error);
    }
}
