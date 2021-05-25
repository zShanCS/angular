import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dish } from "../shared/dish";
import { DishService } from '../services/dish.service';
import { Location } from '@angular/common';
import { switchMap } from "rxjs/operators";
import { Comment } from '../shared/comment';

@Component({
    selector: 'app-dishdetail',
    templateUrl: './dishdetail.component.html',
    styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
    @ViewChild('fform') commentFormDirective: any;

    dish: Dish;
    dishCopy: Dish;
    dishIds: string[];
    prev: string;
    next: string;
    errMess: string;

    commentForm: FormGroup;
    comment: Comment;
    formErrors: {
        [key: string]: any
    } = {
            author: '',
            comment: ''
        };
    validationMessages: {
        [key: string]: any
    } = {
            author: {
                required: 'Author Name is Required.',
                minlength: 'Author Name cant be less than 2 characters.',
            },
            comment: {
                required: 'Comment is required.',
            }
        };
    constructor(
        private dishService: DishService,
        private route: ActivatedRoute,
        private location: Location,
        private fb: FormBuilder,
        @Inject('BaseURL') public BaseURL: string
    ) { this.createForm(); }


    ngOnInit() {

        this.route.params.pipe(
            switchMap((params: Params) =>
                this.dishService.getDish(params['id'])))
            .subscribe(dish => {

                console.log('Dish Recieved', dish, 'calling setPrevNext now');
                this.dish = dish;
                this.dishCopy = dish;
                this.setPrevNext(dish.id)
            },
                errMess => this.errMess = <any>errMess
            );

        this.dishService.getDishIds().subscribe(dishIds => {
            this.dishIds = dishIds;
            console.log('new DishIds recived', dishIds);
        });

    }

    goBack(): void {
        this.location.back();
    }
    setPrevNext(id: string) {
        const index = this.dishIds.indexOf(id);
        const length = this.dishIds.length;
        this.prev = this.dishIds[(length + index - 1) % length];
        this.next = this.dishIds[(length + index + 1) % length];
    }

    createForm() {
        this.commentForm = this.fb.group({
            author: ['', [Validators.required, Validators.minLength(2)]],
            comment: ['', [Validators.required]],
            rating: ['5']
        });
 
        this.commentForm.valueChanges.subscribe((data: any) => {
            this.comment = data;
            this.onValueChanged(data);
        });

        //this will (re)set any messages
        this.onValueChanged();
    }
    onValueChanged(data?: any) {
        if (!this.commentForm) { return; }
        const form = this.commentForm;
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
    onSubmit() {
        this.comment = this.commentForm.value;
        this.comment.date = Date();
        this.dishCopy.comments.push(this.comment);
        this.dishService.putDish(this.dishCopy)
            .subscribe(
                dish => {
                    this.dish = dish;
                    this.dishCopy = dish;
                },
                errMess => this.errMess = <any>errMess
            )
        this.commentFormDirective.reset();
        this.commentForm.reset({
            author: '',
            comment: '',
            rating: '5'
        });
    }


    get author() {

        return this.commentForm.get('author');
    }
    get userComment() {
        return this.commentForm.get('comment');
    }
}