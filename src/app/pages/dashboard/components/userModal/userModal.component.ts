import {Component,Input,EventEmitter,Output,ViewChild} from '@angular/core';

import { Router } from '@angular/router';
import { AlertService, RequestService } from '../../../../service/index';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'user-modal',
  templateUrl: './userModal.html',
  styleUrls: ['../../../../directives/alert.scss',
          './userModal.scss']
})
export class UserModal {
  public _statusOpen: boolean = false;
  public loading: boolean = false;
  public disabled: boolean = true;
  public dataUser: any | undefined;
  @Input() selectedUser: string | undefined;
  @Input()
  set statusOpen(data: boolean) {
    this._statusOpen = data;
    if(data){
      this.loadData();
      this.show();
    }
  }
  get statusOpen(): boolean { return this._statusOpen; }
  //Export variable to parent
  @Output() onClose : EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('userModal') _modal: ModalDirective;
  constructor(private alertService: AlertService, private requestService: RequestService) {
  }
  ngOnInit() {

  }
  show() {
      this._modal.show();
  }
  hide() {
    this.loading = false;
    this._modal.hide();
  }
  onSelectClose(event): void {
    this.hide();
    this.onClose.emit(true);
  }
  loadData(){
    this.loading = true;
    this.requestService.getUser(this.selectedUser, (data, error) => {
      if(error){
        console.log(error);
      }
      if(data){
        this.dataUser = data.data;
      }else{
        this.dataUser = undefined;
      }
      this.loading = false;
    })
  }
  saveData(){
    this.loading = true;

    // this.request.getProcedureInstanceUpdate(this.selectedProcedure.uid, newProcedure)
    //   .subscribe(
    //       (data) => {
    //         if(data){
    //             this.alertService.success('Update successful','modal', true);
    //             this.onSelectClose(true);
    //         }else{
    //             this.alertService.error('Update unsuccessful','modal');
    //             this.onSelectClose(true);
    //         }
    //       }
    //     );
  }
}
