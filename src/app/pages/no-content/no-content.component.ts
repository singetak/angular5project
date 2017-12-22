import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'no-content',
  template: `
    <div class="container">
      <h1>404: page missing</h1>
    </div>
  `
})
export class NoContentComponent {
  public titlePage = 'Page Not Found';
  constructor() {

  }
}
