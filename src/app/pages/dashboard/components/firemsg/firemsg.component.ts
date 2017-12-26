import {Component, Input, EventEmitter, Output, ViewChild} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'fire-message',
  templateUrl: './firemsg.html',
  styleUrls: ['./firemsg.scss']
})
export class FiremsgComponent {
  @Input() selectedFireMsg: any[] | undefined;
  constructor() {
  }
  ngOnInit() {

  }
}
