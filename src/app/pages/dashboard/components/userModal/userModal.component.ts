import {Component,Input,EventEmitter,Output,ViewChild} from '@angular/core';

import { Router } from '@angular/router';
import { urlSafeBase64Encoding } from '../../../../helpers';
import { AlertService, RequestService } from '../../../../service/index';
import * as models from '../../../../model/index';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'user-modal',
  templateUrl: './userModal.html',
  styleUrls: ['../../../../directives/alert.scss',
          './userModal.scss']
})
export class UserModal {
  public _statusOpen: boolean = false;
  public userOptions = [{title: 'Admin', identifier: 'admin'}, {title: 'Default', identifier: 'default'}];
  public message: string = '';
  public loading: boolean = false;
  public disabled: boolean = true;
  public newDataUser: models.User = undefined ;
  public dataUser: models.User;
  @Input() selectedUser: string | undefined;
  @Input()
  set statusOpen(data: boolean) {
    this._statusOpen = data;
    if(data){
      this.show();
      if(this.selectedUser){
        this.loadData();
      }else{
        this.newDataUser = { first_name: '', last_name: '', email: '', phone_number: '', type: 'default', password: '' }
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
    this.message = '';
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
        this.message = error.message;
      }
      if(data){
        this.dataUser = data.data;
      }else{
        this.dataUser = undefined;
      }
      this.loading = false;
    })
  }
  editOldData(attribute, value){
    this.dataUser[attribute] = value;
  }
  editData(){
    if(this.disabled){
      this.disabled = false;
      this.message = '';
    }else{
      this.loading = true;
      let newUpdateUser = {uid: this.dataUser.uid, first_name: this.dataUser.first_name, last_name: this.dataUser.last_name, email: this.dataUser.email, phone_number: this.dataUser.phone_number};
      this.requestService.editUser(newUpdateUser.uid, newUpdateUser, (data, error) => {
        if(error){
          console.log(error);
          this.message = error.message;
        }
        if(data){
          this.message = data.message;
          this.disabled = true;
        }
        this.loading = false;
      });
    }
  }
  editNewData(attribute, value){
    this.newDataUser[attribute] = value;
  }
  onSave(){
    this.loading = true;
    let newUser = Object.assign({}, this.newDataUser);
    newUser['password'] = urlSafeBase64Encoding(newUser.password);
    this.requestService.createUser(newUser, (data, error) => {
      if(error){
        console.log(error);
        this.message = error.message;
      }
      if(data){
        this.message = data.message;
        this.onSelectClose(data);
      }
      this.loading = false;
    });
  }
}
