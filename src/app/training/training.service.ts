import {Training} from './training.model';
import {Subject} from 'rxjs';

export class TrainingService {
    availableExercises: Training[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ];

    private runningExercise: Training;
    trainingChanged = new Subject<Training>();

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.trainingChanged.next({...this.runningExercise});  // return NOT the same object but copy
    }
    getRunningExercise() {
        return {...this.runningExercise};
    }
}
