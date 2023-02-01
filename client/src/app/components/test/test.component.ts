import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { TestService } from 'src/app/shared/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  test: any;
  progress: number;

  constructor(private _service: TestService, private _router:Router) { }

  ngOnInit(): void {
    this._service.getTestById(history.state.id).subscribe(
      (data:any) => {
        this.test = data;
      }
    );
    this.progress = 0;
  }

  Answer(choise){
    this.test.questions[this.progress].answer = choise;
    this.progress++;
    if(this.progress == this.test.questions.length) {
      const queryParams: any = {};
      const questions = this.test.questions;
      queryParams.questions = JSON.stringify(questions);
      const navigationExtras: NavigationExtras = { queryParams };
      this._router.navigate(['/result'],  navigationExtras );
    }
  }
}
