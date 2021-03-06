import {Training} from './training.model';
import {Subject, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {UiService} from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as fromRoot from '../app.reducer';
import {Store} from '@ngrx/store';

@Injectable()
export class TrainingService {
    availableExercises: Training[] = [];
    private userId = sessionStorage.getItem('userId');
    // private exercises: Training[] = [];  // finished exercises

    private runningExercise: Training;
    trainingChanged = new Subject<Training>();
    trainingsChanged = new Subject<Training[]>();
    finishedExercisesCHanged = new Subject<Training[]>();
    private fbSubs: Subscription[] = [];


    constructor(private store: Store<fromRoot.State>, private db: AngularFirestore, private uiservice: UiService) {
    }

    startExercise(selectedId: string) {
        this.db.doc('availableExcercises/' + selectedId).update({lastSelected: new Date()});
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.trainingChanged.next({...this.runningExercise});  // return NOT the same object but copy
    }

    getRunningExercise() {
        return {...this.runningExercise};
    }

    completeExcerise() {
        console.log(this.userId);
        this.addDataToDatabase({...this.runningExercise, date: new Date(), state: 'completed', userId: this.userId});
        this.runningExercise = null;
        this.trainingChanged.next(null);
    }

    cancelExcercise(progress: number) {
        console.log(this.userId);
        this.addDataToDatabase({
            ...this.runningExercise,
            date: new Date(),
            state: 'cancelled',
            userId: this.userId,
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100)
        });
        this.runningExercise = null;
        this.trainingChanged.next(null);
    }

    fetchCompletedOrCancelledExercises() {
        // this.fbSubs.push(this.db.collection('finishedExercises').valueChanges()
        //     .subscribe((exercises: Training[]) => {
        //         console.log(exercises);
        //         this.finishedExercisesCHanged.next(exercises);
        //     }
        //     // , error => {
        //     //     console.log(error);
        //     // } error handler here if needed
        //     ));
        this.fbSubs.push(this.db.collection('finishedExercises').snapshotChanges()  // with shapshot we get both id and values (via payload)
            .pipe(map(docArray => { // allow us to get server data in format we expect
                return docArray.map(doc => {
                    // return doc.payload.doc.data()['userId'] = this.userId;
                    return {
                        state: doc.payload.doc.data()['state'],
                        userId: this.userId,
                        date: doc.payload.doc.data()['date'],
                        id: doc.payload.doc.id,
                        name: doc.payload.doc.data()['name'],
                        duration: doc.payload.doc.data()['duration'],
                        calories: doc.payload.doc.data()['calories']
                    };
                });

            }))
            .subscribe((userExercises) => {
                    this.finishedExercisesCHanged.next(userExercises);
                }
            ));
    }


    fetchExercises() {
        this.store.dispatch(new UI.StartLoading());
        // this.uiservice.loadingStateChanged.next(true);
        this.fbSubs.push(this.db.collection('availableExcercises').snapshotChanges()  // with shapshot we get both id and values (via payload)
            .pipe(map(docArray => { // allow us to get server data in format we expect
                return docArray.map(doc => {
                    return {
                        id: doc.payload.doc.id,
                        name: doc.payload.doc.data()['name'],
                        duration: doc.payload.doc.data()['duration'],
                        calories: doc.payload.doc.data()['calories']
                    };
                });

            }))
            .subscribe((availableExercises: Training[]) => {
                    // this.uiservice.loadingStateChanged.next(false);
                    this.store.dispatch(new UI.StopLoading());
                    this.availableExercises = availableExercises;
                    this.trainingsChanged.next([...this.availableExercises]);  // ... as a copy of array
                }
                , error => {
                    // this.uiservice.loadingStateChanged.next(false);
                    this.store.dispatch(new UI.StopLoading());
                    this.uiservice.showSnackBar('Fetching failed, please try later...');
                    this.trainingsChanged.next(null);
                }
            ));
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    private addDataToDatabase(exercise: Training) {
        this.db.collection('finishedExercises').add(exercise);
    }
}
