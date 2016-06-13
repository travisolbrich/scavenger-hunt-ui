import { Clue } from './clue'
import { Task } from './task'

export class ProgressionStatus {
    lastClue: Clue;
    lastTask: Task;

    lastName: string;
    nextName: string;
}