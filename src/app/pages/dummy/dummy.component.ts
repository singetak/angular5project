import { Component } from '@angular/core';
import { RequestService, AlertService } from 'app/service';

@Component({
  selector: 'dummy',
  templateUrl: './dummy.html',
  styleUrls: ['./dummy.scss']
})
export class DummyComponent {
  public title = 'Dummy';
  public message = '';
  public dataObject: any | undefined = undefined;
  public loading: boolean = false;
  constructor(public requestService: RequestService, private alertService: AlertService) {

  }
  ngOnInit() {
    this.loadData();
  }
  private loadData() {
    // this.loading = true;
    // this.requestService.getServicessList({term: ''}, (data, error) => {
    //   if (error) {
    //     console.log(error);
    //   }
    //   if (data) {
    //     this.dataObject = data;
    //   }else {
    //     this.dataObject = undefined;
    //   }
    //   this.loading = false;
    // });
  }
  public openArticle(articleId) {
    console.log('openArticle', articleId);
  }
}
