import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from '../training.service';
import {NgForm} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, ObservableInput, Subscription} from 'rxjs';
import {Training} from '../training.model';
import {UiService} from '../../shared/ui.service';
import * as fromRoot from '../../app.reducer';
import {Store} from '@ngrx/store';

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
    trainings: Training[] = [];
    private exerciseSubscription: Subscription;
    private loadingSubs: Subscription;
    isLoading$: Observable<boolean>;

    constructor(private store: Store<fromRoot.State>, private trainingService: TrainingService, private db: AngularFirestore, private uiService: UiService) {
    }

    ngOnInit() {
        // this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => this.isLoading = isLoading);
        this.isLoading$ = this.store.select(fromRoot.getIsLoading);
        this.exerciseSubscription = this.trainingService.trainingsChanged.subscribe(
            exercises => {
                this.trainings = exercises;
            }
        )
        ;
        this.trainingService.fetchExercises();
        // this.exerciseSubscription = this.trainingService.trainingsChanged.subscribe(exercises => this.trainings = exercises);
        // this.trainingService.fetchExercises();
        // this.db.collection('availableExcercises').valueChanges().subscribe(result => console.log(result));
        // this.trainings = this.db.collection('availableExcercises').valueChanges();  valueChanges drawback: don't include ID

    }

    onStartTraining(form: NgForm) {
        this.trainingService.startExercise(form.value.exercise);
    }

    onClickFetch() {
        this.trainingService.fetchExercises();
    }

    // ngOnDestroy() {
    //     if (this.exerciseSubscription) {
    //         this.exerciseSubscription.unsubscribe();
    //     }
    //     if (this.loadingSubs) {
    //         this.loadingSubs.unsubscribe();
    //     }
    // }

}
