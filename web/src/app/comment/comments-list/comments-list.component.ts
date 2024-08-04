import { Component, OnInit } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
    selector: 'app-comments-list',
    templateUrl: './comments-list.component.html',
    styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {
    commentArray!: Array<any>
    constructor(private commentsService: CommentsService) { }
    ngOnInit(): void {
        this.commentsService.loadData().subscribe(val => {
            this.commentArray = val
            console.log(val)
        })
    }

}
