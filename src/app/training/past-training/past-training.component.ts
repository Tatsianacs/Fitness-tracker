import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Training} from '../training.model';
import {TrainingService} from '../training.service';

@Component({
    selector: 'app-past-training',
    templateUrl: './past-training.component.html',
    styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
    displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
    dataSource = new MatTableDataSource<Training>();
    @ViewChild(MatSort) sort: MatSort;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private trainingService: TrainingService) {
    }

    ngOnInit() {
        this.dataSource.data = this.trainingService.getExercises();

    }

    ngAfterViewInit() {  // we cannot do in Init because of not ready data
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    doFilter(filteredValue: string) {
        this.dataSource.filter = filteredValue.trim().toLowerCase();
    }
}
