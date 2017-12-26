import { Component } from '@angular/core';
import { RequestService, AlertService } from '../../service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {
  public title = 'Dashboard';
  public message = '';
  public selectedArticle: string | undefined = undefined;
  public selectedUser: string | undefined = undefined;
  public articlesList: any[] = <any>[];
  public userArticlesList: any[] = <any>[];
  public usersList: any[] = <any>[];
  public articleloading: boolean = false;
  public userArticleloading: boolean = false;
  public userloading: boolean = false;
  public openArticleModal: boolean = false;
  public openUserModal: boolean = false;
  public fireMessages: any[] | undefined = undefined;
  public fireloading: boolean = false;
  constructor(public requestService: RequestService, private alertService: AlertService) {

  }
  ngOnInit() {
    this.loadArticlesData();
    this.loadUserArticlesData();
    this.loadUsersData();
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
  private loadUserArticlesData() {
    this.userArticleloading = true;
    this.requestService.getArticlesList({filter: {user_id: this.requestService.getUserId()}}, (data, error) => {
      if (error) {
        console.log(error);
      }
      if (data) {
        this.userArticlesList = data.data;
      }else {
        this.userArticlesList = <any>[];
      }
      this.userArticleloading = false;
    });
  }
  private loadUsersData() {
    this.userloading = true;
    this.requestService.getUsersList({term: ''}, (data, error) => {
      if (error) {
        console.log(error);
      }
      if (data) {
        this.usersList = data.data;
      }else {
        this.usersList = <any>[];
      }
      this.userloading = false;
    });
  }
  public addData(type) {
    if (type === 'article') {
      this.selectedArticle = undefined;
      this.openArticleModal = true;
    }else if (type === 'user') {
      this.selectedUser = undefined;
      this.openUserModal = true;
    }
  }
  public deleteUser(userId) {
    this.userloading = true;
    this.requestService.deleteUser(userId, (data, error) => {
      if (error) {
        console.log(error);
      }
      if (data) {
        this.loadUsersData();
      }else {
        this.userloading = false;
      }
    });
  }
  public deleteArticle(articleId) {
    this.articleloading = true;
    this.requestService.deleteArticle(articleId, (data, error) => {
      if (error) {
        console.log(error);
      }
      if (data) {
        this.loadArticlesData();
      }else {
        this.articleloading = false;
      }
    });
  }
  public openData(type, dataId) {
    if (type === 'article') {
      this.selectedArticle = dataId;
      this.openArticleModal = true;
    } else if (type === 'user') {
      this.selectedUser = dataId;
      this.openUserModal = true;
    }
  }
  public closeModal(event) {
    if (event === true) {
      this.openArticleModal = false;
      this.openUserModal = false;
    }
  }

  private loadFireMsgData() {
    this.fireloading = true;
    this.requestService.getFireMessagesList('', (data, error) => {
      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
        this.fireMessages = data;
      }else {
        this.fireMessages = <any>[];
      }
      this.fireloading = false;
    });
  }
}
