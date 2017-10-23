import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiPeopleProvider} from '../../providers/api-people/api-people'

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ApiPeopleProvider]
})

export class HomePage {

  //Constantes
  urlApi = 'https://randomuser.me/api/?results=25';


  usersArray : any ;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public apiService : ApiPeopleProvider) {

  }

  ionViewWillLoad(){
    console.log("//Programme test API et CSS design");

    this.loadPeopleInfos();
  }

  //load people service
  loadPeopleInfos(){

    let users = [];

    this.apiService.http.get(this.urlApi)
        .map(res => res.json())
        .subscribe(data =>{
            console.log(data);

            console.log(data.results[0]);

            for(let i= 0 ; i < data.results.length ; i++) {
              let oneUser = {
                title: data.results[i].name.title,
                name: data.results[i].name.first,
                surname: data.results[i].name.last,
                adress: {
                  street : data.results[i].location.street,
                  state : data.results[i].location.state,
                  postcode : data.results[i].location.postcode,
                  city : data.results[i].location.city
                },
                dob: data.results[i].dob,
                email: data.results[i].email,
                phone: data.results[i].cell,
                avatar: data.results[i].picture.large
              };

              users.push(oneUser);
            }

          this.usersArray = users;
          console.log(this.usersArray);

        }, error =>{
          console.log('error : ');
          console.log(error);
        });
  }


  doRefresh(refresher) {

    setTimeout(() => {
      this.loadPeopleInfos();
      refresher.complete();
    }, 1000);
  }



}
