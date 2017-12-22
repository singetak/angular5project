import {Component, Input, EventEmitter, Output, ViewChild} from '@angular/core';

import { Router } from '@angular/router';
import { AlertService, RequestService } from '../../../../service';
import * as models from '../../../../model/index';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'article-modal',
  templateUrl: './articleModal.html',
  styleUrls: ['../../../../directives/alert.scss',
          './articleModal.scss']
})
export class ArticleModal {
  public _statusOpen: boolean = false;
  public message: string = '';
  public loading: boolean = false;
  public disabled: boolean = true;
  public newDataArticle: models.Article = undefined;
  public dataArticle: models.Article;
  @Input() selectedArticle: string | undefined;
  @Input()
  set statusOpen(data: boolean) {
    this._statusOpen = data;
    if (data) {
      this.show();
      if (this.selectedArticle) {
        this.loadData();
      }else {
        this.newDataArticle = {name: '', textBody: ''};
        this.disabled = false;
      }
    }
  }
  get statusOpen(): boolean { return this._statusOpen; }
  // Export variable to parent
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('articleModal') _modal: ModalDirective;
  constructor(private alertService: AlertService, private requestService: RequestService) {
  }
  ngOnInit() {

  }
  show() {
      this._modal.show();
  }
  hide() {
    this.loading = false;
    this.newDataArticle = undefined;
    this.dataArticle = undefined;
    this.disabled = true;
    this.message = '';
    this._modal.hide();
  }
  onSelectClose(event): void {
    this.hide();
    this.onClose.emit(true);
  }
  loadData() {
    this.loading = true;
    this.requestService.getArticle(this.selectedArticle, (data, error) => {
      if (error) {
        console.log(error);
        this.message = error.message;
      }
      if (data) {
        this.dataArticle = data.data;
      }else {
        this.dataArticle = undefined;
      }
      this.loading = false;
    });
  }
  editOldData(attribute, value) {
    this.dataArticle[attribute] = value;
  }
  editData() {
    if (this.disabled) {
      this.disabled = false;
      this.message = '';
    } else {
      this.loading = true;
      let newUpdateArticle: models.Article = {uid: this.dataArticle.uid, name: this.dataArticle.name, textBody: this.dataArticle.textBody};
      this.requestService.editArticle(newUpdateArticle.uid, newUpdateArticle, (data, error) => {
        if (error) {
          this.message = error.message;
        }
        if (data) {
          this.message = data.message;
          this.disabled = true;
        }
        this.loading = false;
      });
    }
  }
  editNewData(attribute, value) {
    this.newDataArticle[attribute] = value;
  }
  onSave() {
    this.loading = true;
    this.requestService.createArticle(this.newDataArticle, (data, error) => {
      if (error) {
        console.log(error);
        this.message = error.message;
      }
      if (data) {
        this.message = data.message;
        this.onSelectClose(data);
      }
      this.loading = false;
    });
  }
}
