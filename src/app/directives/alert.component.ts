import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { AlertService } from '../service/index';

@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['./alert.scss']
})

export class AlertComponent {
    message: any;
    @ViewChild('alertDirectiveModal') _modal: ModalDirective;
    show() {
        this._modal.show();
    }
    /**
     *
     */
    hide() {
        this._modal.hide();
    }
    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => {
          this.message = message;
          if(typeof message !== 'undefined')
            if(message.designType == 'modal')
              this._modal.show();

        });
    }

}
