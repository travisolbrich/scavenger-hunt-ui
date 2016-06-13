import {Component, OnInit} from "@angular/core";
import {Router, CanActivate} from "@angular/router-deprecated";
import {TaskService} from "../../service/task.service";
import {UserService} from "../../service/user.service";
import {TaskResponse} from "../../model/taskResponse";
import {Task} from "../../model/task";
import {Clue} from "../../model/clue";
import {ProgressionStatus} from "../../model/progressionStatus";
import {tokenNotExpired} from 'angular2-jwt';

@Component({
    selector: 'scan',
    templateUrl: 'app/route/task/task.component.html'
})
@CanActivate(() => tokenNotExpired())
export class TaskComponent implements OnInit {
    task:Task;
    clue:Clue;
    progressionStatus:ProgressionStatus;
    wrongAnswer:boolean;

    constructor(private taskService:TaskService,
                private userService:UserService,
                private router:Router) {
    }

    ngOnInit() {
        this.taskService.getLatest().subscribe(latestTask => this.task = latestTask);
        this.userService.getProgressionStatus().subscribe(
            progressionStatus => {
                this.progressionStatus = progressionStatus;

                if (progressionStatus.nextName == "SCAN") {
                    console.debug("Haven't scanned anything yet.");
                    this.router.navigate(['/Dashboard']);
                }

                if (progressionStatus.nextName == "CLUE") {
                    console.debug("Task solved. Redirecting to clue.");
                    this.router.navigate(['/Clue']);
                }
            }
        )
    }

    checkAnswer(answer:string) {
        let token:string;
        let taskResponse:TaskResponse = {response: answer};

        this.taskService
            .answer(this.task.taskId, taskResponse)
            .subscribe(
                clue => this.router.navigate(['/Clue']),
                error => {
                    console.log(error);
                    this.wrongAnswer = true
                });

    }
}