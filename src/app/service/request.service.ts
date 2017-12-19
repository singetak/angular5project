import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import { Dictionary } from '../interface';
import { ContentType } from './enums';
@Injectable()
export class RequestService {
  private authURL = 'http://localhost:8080/v1/';
  private token = '';
  private userType = 'default';
  public currentUserSubject: BehaviorSubject<any | undefined> = new BehaviorSubject<any | undefined>(undefined);
  public _currentUser: any | undefined = undefined;
  set currentUser(currentUser: any | undefined){
    if(currentUser){
      this._currentUser = currentUser;
      this.currentUserSubject.next(this._currentUser);
      this.token = currentUser.token || '';
      this.userType = currentUser.type || 'default';
    }else{
      this._currentUser = undefined;
      this.currentUserSubject.next(this._currentUser);
      this.token = '';
      this.userType = 'default';
    }
  }
  get currentUser(): any | undefined {
    return this._currentUser;
  }
  constructor(private http: Http) {
  }
  public validUser(){
    if(this.userType === 'admin'){
      return true;
    }else{
      return false;
    }
  }
  public getUserId(){
    if(this.currentUser && this.currentUser.hasOwnProperty('uid')){
      return this.currentUser['uid'];
    }else{
      return '';
    }
  }
  public setToken(token){
    this.token = token;
  }
  public addLanguageToURL(url: string, lang?: string): string {
    if (url){
      let langEnd = lang;
      if (langEnd === undefined) {
          langEnd = 'en';
      }
      if (~url.indexOf('?')){
        url += '&locale=' + langEnd;
      }else{
        url += '?locale=' + langEnd;
      }
      return url;
    } else{
      return '';
    }
  }
  public requestLogin(username: string, password: string, callback: (dataResponse: any | undefined, requestError: any | undefined) => void, lang?: string) {
      let urlStr = this.authURL + 'user/login?username=' + username + '&password=' + password ;
      urlStr = this.addLanguageToURL(urlStr, lang);
      this.jsonGetRequest(urlStr, (jsonObj, error) => {
          if (error !== undefined){
              callback(undefined, error);
              return;
          }
          if (jsonObj) {
            if(jsonObj.status){
              callback(jsonObj.data, undefined);
            }else{
              callback(undefined, jsonObj.message);
            }
          } else {
            callback(undefined, 'Data error from server ');
          }
      });


  }
  public getArticlesList(conf: any, callback: (dataResponse: any | undefined, requestError: any | undefined) => void, lang?: string) {
    let urlStr = this.authURL + 'article/search/summary';
    urlStr = this.addLanguageToURL(urlStr, lang);
    this.jsonRequest(urlStr, (jsonObj, error) => {
        if (error !== undefined){
            callback(undefined, error);
            return;
        }
        if (jsonObj) {
          callback(jsonObj, undefined);
        } else {
            callback(undefined, error);
        }
    }, RequestMethod.Post, conf);
  }
  public getArticle(articleId: string, callback: (dataResponse: any | undefined, requestError: any | undefined) => void, lang?: string) {
    let urlStr = this.authURL + 'article/' + articleId;
    urlStr = this.addLanguageToURL(urlStr, lang);
    this.jsonGetRequest(urlStr, (jsonObj, error) => {
        if (error !== undefined){
            callback(undefined, error);
            return;
        }
        if (jsonObj) {
          callback(jsonObj, undefined);
        } else {
            callback(undefined, error);
        }
    });
  }
  public createArticle(article: any, callback: (dataResponse: any | undefined, requestError: any | undefined) => void, lang?: string) {
    let urlStr = this.authURL + 'article';
    urlStr = this.addLanguageToURL(urlStr, lang);
    this.jsonRequest(urlStr, (jsonObj, error) => {
        if (error !== undefined){
            callback(undefined, error);
            return;
        }
        if (jsonObj) {
          callback(jsonObj, undefined);
        } else {
            callback(undefined, error);
        }
    }, RequestMethod.Post, article);
  }
  public editArticle(articleId: string, article: any, callback: (dataResponse: any | undefined, requestError: any | undefined) => void, lang?: string) {
    let urlStr = this.authURL + 'article/' + articleId;
    urlStr = this.addLanguageToURL(urlStr, lang);
    this.jsonRequest(urlStr, (jsonObj, error) => {
        if (error !== undefined){
            callback(undefined, error);
            return;
        }
        if (jsonObj) {
          callback(jsonObj, undefined);
        } else {
            callback(undefined, error);
        }
    }, RequestMethod.Post, article);
  }
  public deleteArticle(articleId: string, callback: (dataResponse: any | undefined, requestError: any | undefined) => void, lang?: string) {
    let urlStr = this.authURL + 'article/' + articleId + '/delete';
    urlStr = this.addLanguageToURL(urlStr, lang);
    this.jsonRequest(urlStr, (jsonObj, error) => {
        if (error !== undefined){
            callback(undefined, error);
            return;
        }
        if (jsonObj) {
          callback(jsonObj, undefined);
        } else {
            callback(undefined, error);
        }
    }, RequestMethod.Post);
  }
  public getUsersList(conf: any, callback: (dataResponse: any | undefined, requestError: any | undefined) => void, lang?: string) {
    let urlStr = this.authURL + 'user/search/summary';
    urlStr = this.addLanguageToURL(urlStr, lang);
    this.jsonRequest(urlStr, (jsonObj, error) => {
        if (error !== undefined){
            callback(undefined, error);
            return;
        }
        if (jsonObj) {
          callback(jsonObj, undefined);
        } else {
            callback(undefined, error);
        }
    }, RequestMethod.Post, conf);
  }
  public getUser(userId: string, callback: (dataResponse: any | undefined, requestError: any | undefined) => void, lang?: string) {
    let urlStr = this.authURL + 'user/' + userId;
    urlStr = this.addLanguageToURL(urlStr, lang);
    this.jsonGetRequest(urlStr, (jsonObj, error) => {
        if (error !== undefined){
            callback(undefined, error);
            return;
        }
        if (jsonObj) {
          callback(jsonObj, undefined);
        } else {
            callback(undefined, error);
        }
    });
  }
  public createUser(user: any, callback: (dataResponse: any | undefined, requestError: any | undefined) => void, lang?: string) {
    let urlStr = this.authURL + 'user';
    urlStr = this.addLanguageToURL(urlStr, lang);
    this.jsonRequest(urlStr, (jsonObj, error) => {
        if (error !== undefined){
            callback(undefined, error);
            return;
        }
        if (jsonObj) {
          callback(jsonObj, undefined);
        } else {
            callback(undefined, error);
        }
    }, RequestMethod.Post, user);
  }
  public editUser(userId: any, user: any, callback: (dataResponse: any | undefined, requestError: any | undefined) => void, lang?: string) {
    let urlStr = this.authURL + 'user/' + userId;
    urlStr = this.addLanguageToURL(urlStr, lang);
    this.jsonRequest(urlStr, (jsonObj, error) => {
        if (error !== undefined){
            callback(undefined, error);
            return;
        }
        if (jsonObj) {
          callback(jsonObj, undefined);
        } else {
            callback(undefined, error);
        }
    }, RequestMethod.Post, user);
  }
  public deleteUser(userId: string, callback: (dataResponse: any | undefined, requestError: any | undefined) => void, lang?: string) {
    let urlStr = this.authURL + 'user/' + userId + '/delete';
    urlStr = this.addLanguageToURL(urlStr, lang);
    this.jsonRequest(urlStr, (jsonObj, error) => {
        if (error !== undefined){
            callback(undefined, error);
            return;
        }
        if (jsonObj) {
          callback(jsonObj, undefined);
        } else {
            callback(undefined, error);
        }
    }, RequestMethod.Post);
  }
  private urlEncode(str: string): string {
      return encodeURI(str);
  }
  private jsonRequestSimple(urlString: string, callback: (json?: any, error?: any) => void, params: Dictionary, timeout: number = 60.0) {
    let body ;
    if (params){
      body = params;
    } else {
      // we need to recheck this
      console.log('Parameters sent to jsonRequestSimple are not serializable into JSON');
    }
    this.jsonRequest(urlString, (json, error) => {
      callback(json, error);
    }, RequestMethod.Post, body, ContentType.JSON, timeout);
  }
  private jsonGetRequest(urlString: string, callback: (json?: any, error?: any) => void, params?: Dictionary) {
      if (urlString){
        let urlComps = urlString;
        if (params){
          for (let urlItem of Object.keys(params)) {
            urlComps += '&' + urlItem + '=' + params[urlItem];
          }
        }
        this.jsonRequest(urlComps, callback, RequestMethod.Get);
      } else {
        return;
      }
  }
  private jsonRequest(urlString: string,
                      callback: (json: any, error: any) => void,
                      method: RequestMethod = RequestMethod.Get,
                      postBody: any = undefined,
                      contentType: string = ContentType.JSON,
                      timeout: number = 10.0,
                      retry: boolean = false,
                      retryFactor: number = 1.5,
                      maxTimeout: number = 60.0)
  {
      if ( urlString ) {
        let url: string = urlString || '';
        // this.logger.log(url, method, postBody, contentType, timeout, retry, retryFactor, maxTimeout);
        // console.log(url, method, postBody, contentType, timeout, retry, retryFactor, maxTimeout);
        let headers = new Headers();
        if (this.token && urlString.startsWith(this.authURL)) {
          headers.append('Content-Type', contentType );
          headers.append('Accept' , 'application/json');
            headers.append('X-Token', this.token);
        }
        let options = new RequestOptions({ headers: headers });
        let bodyString = postBody;
        if (method === RequestMethod.Post){
           bodyString = JSON.stringify(postBody);
           options.body = bodyString;
        }
        let request = new Request({method: method, url: url, body: bodyString, headers: headers});
        this.http.request(request, options)
                          .map((res: Response) => {
                            if (res.status >= 400) {
                              callback(undefined, 'server');
                              return;
                            }
                            return res.json();
                          })
                          .subscribe(
                            (data) => {
                              callback(data, undefined);
                              // console.log(url, data);
                            },
                            (err) => {
                              if (retry) {
                                  let timeInterval = Math.min(maxTimeout, retryFactor * timeout);
                                  this.jsonRequest(urlString, callback, method, postBody, contentType, timeInterval, true, retryFactor, maxTimeout );
                              }
                              else {
                                  callback(undefined, err);
                              }
                            });

      } else {
        // this.logger.log('Failed to create URL');
        console.log('Failed to create URL');
      }
  }
}
