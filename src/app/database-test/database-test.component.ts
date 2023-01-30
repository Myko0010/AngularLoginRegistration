import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-database-test',
  templateUrl: './database-test.component.html',
  styleUrls: ['./database-test.component.css']
})
export class DatabaseTestComponent {
  constructor(private http: HttpClient) { }
  users!: any;

  ngOnInit() {
    // this.http.get('http://localhost:3000/users').subscribe(data => {
    //   this.users = data;
    //   //console.log(this.users);
    // },
    //   error => {
    //     console.log(error);
    //   }
    // );
    }

    ShowData(){
      this.http.get('http://localhost:3000/users').subscribe(data => {
        this.users = data;
        //console.log(this.users);
      },
        error => {
          console.log(error);
        }
      );
    }
}
