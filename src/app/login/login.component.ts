import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private dataService: ApiService,
    private router: Router,
    public dialog: MatDialog,
    private http:HttpClient,
    private authService:AuthService
  ) {
  }
  ngOnInit() {}

  loginForm=new FormGroup({
    email:new FormControl("",[Validators.required,Validators.email]),
    pwd:new FormControl("",[Validators.required,Validators.minLength(6),Validators.maxLength(15)])
  });

  get Email():FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get PWD() :FormControl{
    return this.loginForm.get('pwd') as FormControl;
  }

  LoginSubmitted(){

    this.http
        .get(`http://localhost:3000/loginCheck/${this.Email.value}/${this.PWD.value}`)
        .subscribe(
          (response) => {
            if ((response as any).message == 'User exists') {
this.authService.login(this.Email.value);
              this.router.navigate(['/Home']);
              alert('User is a valid user ');
            } else {

              alert('User is not a valid user ');
            }
          },
          (error) => {
            //this.dataAdded = false;
            console.error('Error: ', error);
          }
        );
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
     if(result) {
       alert("It is Working Properly");
     }
    });
 }
}
