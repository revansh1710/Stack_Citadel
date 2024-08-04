import { Component, OnInit } from '@angular/core';
import { Com } from 'src/app/models/com';


import { CommentsService } from 'src/app/services/comments.service';

@Component({
    selector: 'app-comment-form',
    templateUrl: './comment-form.component.html',
    styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
    constructor(private commentsService: CommentsService) { }

    ngOnInit(): void { }

    onSubmit(formVal: any) {
        const comData: Com = {
            name: formVal.name,
            comments: formVal.comment
        };

        this.commentsService.addComments(comData);
    }
}
