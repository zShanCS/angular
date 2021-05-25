import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { expand, flyInOut } from '../animations/app.animate';
import { FeedbackService } from '../services/feedback.service';
import { Feedback, ContactType } from '../shared/feedback';

// interface ErrorObject{
//   [key:string]:any,
// };

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display:block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})

export class ContactComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective: any;
  feedbackForm: FormGroup;
  feedback: Feedback;
  feedbackCopy: Feedback;
  contactType = ContactType;
  feedbackError: string;
  formErrors: { [key: string]: any } = {
    firstname: '',
    lastname: '',
    email: '',
    telnum: ''
  };
  validationMessages: { [key: string]: any } = {
    firstname: {
      required: 'First Name is required',
      minlength: 'First Name cannot be less than 2 characters',
      maxlength: 'First Name cannot be more than 25 characters'
    },
    lastname: {
      required: 'Last Name is required',
      minlength: 'Last Name cannot be less than 2 characters',
      maxlength: 'Last Name cannot be more than 25 characters'
    },
    email: {
      required: 'Email is required',
      email: 'Email is not valid',
    },
    telnum: {
      required: 'Tel. Num is required',
      pattern: 'Tel. Num can only contain numbers'
    }
  };
  showLoading: boolean;
  showFormCopy: boolean;
  showError: boolean;
  errorOccured: boolean;

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.showLoading = false;
    this.showFormCopy = false;
    this.showError = false;
    this.errorOccured = false;
  }

  createForm() {
    console.log('form created again');

    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: ['', [Validators.required, Validators.pattern('^[0-9]*')]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges.subscribe((data: any) => { this.onValueChanged(data) });

    //this will (re)set any messages
    this.onValueChanged();
  }

  onSubmit() {
    this.showLoading = true;
    this.feedback = this.feedbackForm.value;
    this.feedbackCopy = this.feedbackForm.value;
    this.feedbackService.submitFeedback(this.feedbackCopy)
      .subscribe(
        data => {
          console.log('Feedback Form Submitted Successfully', data);
          this.feedback = data;
          this.feedbackCopy = data;
          this.showLoading = false;
          this.showFormCopy = true;
          this.errorOccured = false;
          setTimeout(() => { this.showFormCopy = false; }, 5000);
        },
        err => {
          console.log('error has Occured');
          this.feedbackForm.setValue(this.feedbackCopy);
          this.errorOccured = true;
          this.feedbackError = <any>err;
          this.showError = true;
          this.showLoading = false;
          setTimeout(() => { this.showError = false; }, 5000);
        }
      )
    console.log(this.feedback);

    this.feedbackFormDirective.resetForm();
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });





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

  get firstname(): any {
    return this.feedbackForm.get('firstname');
  }
  get lastname(): any {
    return this.feedbackForm.get('lastname');
  }
  get telnum(): any {
    return this.feedbackForm.get('telnum');
  }
  get email(): any {
    return this.feedbackForm.get('email');
  }


}
