import { Component } from '@angular/core';
import { RequestService, AlertService } from '../../service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.html',
  // styleUrls: ['./app.component.css']
})
export class DashboardComponent {
  private title = 'Dashboard';
  private message = '';
  private selectedArticle: string | undefined = undefined;
  private selectedUser: string | undefined = undefined;
  private articlesList: any[] = <any>[];
  private usersList: any[] = <any>[];
  private articleloading: boolean = false;
  private userloading: boolean = false;
  private openArticleModal: boolean = false;
  private openUserModal: boolean = false;
  constructor(private requestService: RequestService, private alertService: AlertService){

  }
  ngOnInit() {
    this.loadArticlesData();
    this.loadUsersData();
  }
  private loadArticlesData(){
    this.articleloading = true;
    this.requestService.getArticlesList('', (data, error) => {
      if(error){
        console.log(error);
      }
      if(data){
        this.articlesList = data.data;
      }else{
        this.articlesList = <any>[];
      }
      this.articleloading = false;
    });
  }
  private loadUsersData(){
    this.userloading = true;
    this.requestService.getUsersList('', (data, error) => {
      if(error){
        console.log(error);
      }
      if(data){
        this.usersList = data.data;
      }else{
        this.usersList = <any>[];
      }
      this.userloading = false;
    });
  }
  private addData(type){
    if(type === 'article'){
      this.selectedArticle = undefined;
      this.openArticleModal = true;
    }else if (type === 'user'){
      this.selectedUser = undefined;
      this.openUserModal = true;
    }
  }
  private deleteUser(userId){
    this.userloading = true;
    this.requestService.deleteUser(userId, (data, error) => {
      if(error){
        console.log(error);
      }
      if(data){
        this.loadUsersData();
      }else{
        this.userloading = false;
      }
    });
  }
  private deleteArticle(articleId){
    this.articleloading = true;
    this.requestService.deleteArticle(articleId, (data, error) => {
      if(error){
        console.log(error);
      }
      if(data){
        this.loadArticlesData();
      }else{
        this.articleloading = false;
      }
    })
  }
  private openData(type, dataId){
    if(type === 'article'){
      this.selectedArticle = dataId;
      this.openArticleModal = true;
    }else if (type === 'user'){
      this.selectedUser = dataId;
      this.openUserModal = true;
    }
  }
  private closeModal(event){
    if(event === true){
      this.openArticleModal = false;
      this.openUserModal = false;
    }
  }
}
