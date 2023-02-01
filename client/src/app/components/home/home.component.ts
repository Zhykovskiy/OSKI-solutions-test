import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/shared/test.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tests : any[] = [];
  openedTest: any;
  modalReference: any;
  isAgreed = false;

  constructor(private _service:TestService, 
    private _modalService: NgbModal,
    private _router: Router) { }

  ngOnInit(): void {
    this._service.getTests().subscribe(
      (tests:any) => {
        this.tests = tests;
    })
  }


  openModal(targetModal: any, test:any) {
    this.modalReference = this._modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    this.openedTest = test;

  }

  proceed(id: number) {
    this.modalReference.close();
    this._router.navigateByUrl('/test', { state: {id: this.openedTest.id}});
  }
}
