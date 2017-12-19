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
  public newDataUser: any = undefined ;
  public dataUser: any;
  @Input() selectedUser: string | undefined;
  @Input()
  set statusOpen(data: boolean) {
    this._statusOpen = data;
    if(data){
      this.show();
      if(this.selectedUser){
        this.loadData();
      }else{
        this.newDataUser = {firstName: '', lastName: '', email: '', phoneNumber: '', password: ''}
        this.disabled = false;
      }
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
    this.newDataUser = undefined;
    this.dataUser = undefined;
    this.disabled = true;
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
  editData(attribute, value){
    this.newDataUser[attribute] = value;
  }
  onSave(){
    this.loading = true;
    this.requestService.createUser(this.newDataUser, (data, error) => {
      if(error){
        console.log(error);
      }
      if(data){
        console.log(data);
        this.onSelectClose(data);
      }
      this.loading = false;
    });
  }
}
