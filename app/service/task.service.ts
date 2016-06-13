///<reference path="../../node_modules/zone.js/dist/zone.js.d.ts"/>

import {Headers, Http} from '@angular/http';
import {Injectable}    from '@angular/core';
import {AuthHttp, AuthConfig, AUTH_PROVIDERS} from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import {Task} from '../model/task'

import {Observable} from 'rxjs/Observable'
import "../rxjs-operators"

import {TaskResponse} from "../model/taskResponse";
import {Clue} from "../model/clue";
import {UserService} from "./user.service";
import {tokenNotExpired} from 'angular2-jwt';

import {Router} from "@angular/router-deprecated";

@Injectable()
export class TaskService{

    constructor(private authHttp:AuthHttp,
                private userService:UserService){
    }

    getLatest():Observable<Task> {
        return this.authHttp.get(TASK_URL + "current")
            .map(response => response.json())
            .catch(this.handleError);
    }

    answer(taskId:number, taskResponse:TaskResponse):Observable<Clue> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.authHttp
            .post(TASK_URL + taskId + "/answer", JSON.stringify(taskResponse), {headers: headers})
            .map(res => res.json() || {})
            .catch(this.handleError);
    }

    private handleError(error: any) {
        if(!tokenNotExpired()) {
            console.debug("NOT LOGGED IN");
            return Observable.throw(error);
        }
        error = {message: error.json().message, status: error.json().status} || error;

        console.error('An error occurred', error);
        return Observable.throw(error);
    }


}
