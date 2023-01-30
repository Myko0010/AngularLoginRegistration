import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent {
  constructor(private http: HttpClient) {}
  repeatPass: string = 'none';

  registerForm = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z].*'),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z].*'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]*'),
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    gender: new FormControl('', [Validators.required]),
    pwd: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
    rpwd: new FormControl(''),
  });

  registerSubmitted() {
    if (this.PWD.value == this.RPWD.value) {
      this.repeatPass = 'none';
      console.log('submitted');
    } else {
      this.repeatPass = 'inline';
    }
  }

  get FirstName(): FormControl {
    return this.registerForm.get('firstname') as FormControl;
  }
  get LastName(): FormControl {
    return this.registerForm.get('lastname') as FormControl;
  }
  get Email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }
  get Mobile(): FormControl {
    return this.registerForm.get('mobile') as FormControl;
  }
  get Gender(): FormControl {
    return this.registerForm.get('gender') as FormControl;
  }
  get PWD(): FormControl {
    return this.registerForm.get('pwd') as FormControl;
  }
  get RPWD(): FormControl {
    return this.registerForm.get('rpwd') as FormControl;
  }



  addUser() {
    let data = {
      fname: this.FirstName.value,
      lname: this.LastName.value,

      email: this.Email.value,
      phone_number: this.Mobile.value,
      password: this.PWD.value,
      gender: this.Gender.value,
    };
    this.http.post('http://localhost:3000/addUser', data).subscribe(
      (response) => {
        if ((response as any).message === 'User added successfully') {

          this.registerForm.reset();
          alert('user added sucessfully');
        } else {
          alert('something is wrong');
        }
      },
      (error) => {
        console.error('Error: ', error);
      }
    );
  }

  checkUser() {
    if (this.PWD.value == this.RPWD.value) {
      this.repeatPass = 'none';

      let data1 = {
        email: this.Email.value,
        phone_number: this.Mobile.value,
      };
      this.http
        .get(`http://localhost:3000/checkUser/${this.Email.value}`)
        .subscribe(
          (response) => {
            if ((response as any).message == 'User already exists') {
              alert('User already exists');
            } else {
              this.addUser();
              // alert('still working');
            }
          },
          (error) => {
            //this.dataAdded = false;
            console.error('Error: ', error);
          }
        );

    } else {
      this.repeatPass = 'inline';
    }


  }
}
