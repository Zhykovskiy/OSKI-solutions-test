import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestService } from 'src/app/shared/test.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _service: TestService) { }

  questions: any[];
  correctAnswersCount: number = 0;

  ngOnInit(): void {
    this.questions = JSON.parse(this._route.snapshot.queryParamMap.get('questions'));
    this._service.getAnswers(this.questions.map(x => x.id)).subscribe(
      (data: any) => {
        this.questions.forEach((q, i) => {
          if(q.answer == data[i]) {
            this.correctAnswersCount++;
          }
        });
      }
    )
  }
}
