import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TrainingService} from '../training.service';
import {Training} from '../training.model';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
    trainings: Training[] = [];

    constructor(private trainingService: TrainingService) {
    }

    ngOnInit() {
        this.trainings = this.trainingService.availableExercises.slice();
    }

    onStartTraining(form: NgForm) {
        this.trainingService.startExercise(form.value.exercise);
    }

}
