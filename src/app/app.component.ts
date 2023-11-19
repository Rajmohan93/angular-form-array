import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  appTitle = 'Angular Reactive Form';

  userName = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    address: new FormGroup({
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
    }),
  });

  userProfile = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    presentAddress: this.fb.group({
      livingState: ['', Validators.required],
      livingCountry: ['', Validators.required],
    }),
  });

  ngOnInit(): void {
    this.userName.patchValue({
      firstName: 'MS',
      lastName: 'Dhoni',
    });

    this.userProfile.patchValue({
      name: 'Sachin',
      presentAddress: {
        livingState: 'Tamil Nadu',
      },
    });
  }

  onSubmit(e: any) {
    e.preventDefault();
    console.log(this.userName.value);
  }

  onProfileSubmit(e: any) {
    e.preventDefault();
    console.log(this.userProfile.value);
  }

  personalInfo = this.fb.group({
    phoneNumbers: this.fb.array([this.initData(1)]),
  });

  initData(ord: number) {
    return this.fb.group({
      listid: [0],
      number: [''],
      order: [ord],
      listtype: [3],
      delete: [0],
    });
  }

  get formArr() {
    return this.personalInfo.get('phoneNumbers') as FormArray;
  }

  addNewData() {
    let length: any = this.personalInfo.controls.phoneNumbers.value.length + 1;
    this.formArr.push(this.initData(length));
  }

  onSubmitInfo(e: any) {
    e.preventDefault();
    /* console.log(this.personalInfo.controls.phoneNumbers);
    console.log(this.personalInfo.controls.phoneNumbers.value.length); */
    console.log(this.personalInfo.value);
  }
}
