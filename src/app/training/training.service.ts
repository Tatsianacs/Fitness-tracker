import {Training} from './training.model';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable()
export class TrainingService {
    availableExercises: Training[] = [

    ];
    // private exercises: Training[] = [];  // finished exercises

    private runningExercise: Training;
    trainingChanged = new Subject<Training>();
    trainingsChanged = new Subject<Training[]>();
    finishedExercisesCHanged = new Subject<Training[]>();

    constructor(private db: AngularFirestore) {}

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.trainingChanged.next({...this.runningExercise});  // return NOT the same object but copy
    }
    getRunningExercise() {
        return {...this.runningExercise};
    }

    completeExcerise() {
        this.addDataToDatabase({...this.runningExercise, date: new Date(), state: 'completed'});
        this.runningExercise = null;
        this.trainingChanged.next(null);
    }

    cancelExcercise(progress: number) {
       this.addDataToDatabase({...this.runningExercise, date: new Date(), state: 'cancelled', duration: this.runningExercise.duration * (progress / 100), calories: this.runningExercise.calories * (progress / 100) });
        this.runningExercise = null;
        this.trainingChanged.next(null);
    }

    fetchCompletedOrCancelledExercises() {
        this.db.collection('finishedExercises').valueChanges()
            .subscribe((exercises: Training[]) => {
                this.finishedExercisesCHanged.next(exercises);
            });
    }


    fetchExercises() {
        this.db.collection('availableExcercises').snapshotChanges()  // with shapshot we get both id and values (via payload)
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
                this.availableExercises = availableExercises;
                this.trainingsChanged.next([...this.availableExercises]);  // ... as a copy of array
        });
    }

    private addDataToDatabase(exercise: Training) {
        this.db.collection('finishedExercises').add(exercise);
    }
}
