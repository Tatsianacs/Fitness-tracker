import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {TrainingService} from './training.service';

@Component({
    selector: 'app-training',
    templateUrl: './training.component.html',
    styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
    onGoingTraining = false;
    trainingSuscription: Subscription;

    constructor(private trainingService: TrainingService) {
    }

    ngOnInit() {
        this.trainingSuscription = this.trainingService.trainingChanged
            .subscribe(exercise => {
                if (exercise) {
                    this.onGoingTraining = true;
                } else {
                    this.onGoingTraining = false;
                }

            });

    }

}
