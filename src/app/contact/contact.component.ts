import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

// interface ErrorObject{
//   [key:string]:any,
// };

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective:any;
  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;

  formErrors:{[key:string]:any}={
    firstname:'',
    lastname:'',
    email:'',
    telnum:''
  };
  validationMessages:{[key:string]:any}={
    firstname:{
      required:'First Name is required',
      minlength:'First Name cannot be less than 2 characters',
      maxlength:'First Name cannot be more than 25 characters'
      },
    lastname:{
      required:'Last Name is required',
      minlength:'Last Name cannot be less than 2 characters',
      maxlength:'Last Name cannot be more than 25 characters'
      },
    email:{
      required:'Email is required',
      email:'Email is not valid',
    },
    telnum:{
      required:'Tel. Num is required',
      pattern : 'Tel. Num can only contain numbers'
    }
  };

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(25)] ],
      lastname: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(25)] ],
      telnum: ['', [Validators.required,Validators.pattern] ],
      email: ['', [Validators.required,Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges.subscribe((data:any)=>{this.onValueChanged(data)});

    //this will (re)set any messages
    this.onValueChanged();
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackFormDirective.resetForm();
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

get firstname() : any {
  return this.feedbackForm.get('firstname');
}
get lastname() : any {
  return this.feedbackForm.get('lastname');
}
get telnum() : any {
  return this.feedbackForm.get('telnum');
}
get email() : any {
  return this.feedbackForm.get('email');
}


}
