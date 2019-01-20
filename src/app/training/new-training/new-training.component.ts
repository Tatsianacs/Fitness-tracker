import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from '../training.service';
import {NgForm} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {Training} from '../training.model';

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
    trainings: Training[] = [];
    exerciseSubscription: Subscription;

        constructor(private trainingService: TrainingService, private db: AngularFirestore) {
    }

    ngOnInit() {
        this.exerciseSubscription = this.trainingService.trainingsChanged.subscribe(
            exercises => (this.trainings = exercises)
        );
        this.trainingService.fetchExercises();
        // this.exerciseSubscription = this.trainingService.trainingsChanged.subscribe(exercises => this.trainings = exercises);
        // this.trainingService.fetchExercises();
        // this.db.collection('availableExcercises').valueChanges().subscribe(result => console.log(result));
        // this.trainings = this.db.collection('availableExcercises').valueChanges();  valueChanges drawback: don't include ID

    }

    onStartTraining(form: NgForm) {
        this.trainingService.startExercise(form.value.exercise);
    }

    ngOnDestroy() {
        this.exerciseSubscription.unsubscribe();
    }

}
