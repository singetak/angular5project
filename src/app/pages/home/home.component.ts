import { Component } from '@angular/core';
import { RequestService, AlertService } from 'app/service';

@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {
  public title = 'Home';
  public message = '';
  public selectedArticle: string | undefined = undefined;
  public articlesList: any[] = <any>[];
  public usersList: any[] = <any>[];
  public articleloading: boolean = false;
  public fireMessages: any[] | undefined = undefined;
  public fireloading: boolean = false;
  public percentComplete1 = 15;
  public percentComplete2 = 45;
  public percentComplete3 = 80;
  constructor(public requestService: RequestService, private alertService: AlertService) {

  }
  ngOnInit() {
    this.loadArticlesData();
    this.loadFireMsgData();
  }
  private loadArticlesData() {
    this.articleloading = true;
    this.requestService.getArticlesList({term: ''}, (data, error) => {
      if (error) {
        console.log(error);
      }
      if (data) {
        this.articlesList = data.data;
      }else {
        this.articlesList = <any>[];
      }
      this.articleloading = false;
    });
  }
  private loadFireMsgData() {
    this.fireloading = true;
    this.requestService.getFireMessagesList('', (data, error) => {
      if (error) {
        console.log(error);
      }
      if (data) {
        this.fireMessages = data;
      }else {
        this.fireMessages = <any>[];
      }
      this.fireloading = false;
    });
  }
}
