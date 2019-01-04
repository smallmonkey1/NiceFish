import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CommentService } from './comment.service';

@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  @Input()
  public hasLogin: boolean = false;
  @Input()
  public postId: string;
  public comment: any = {};

  public comments: Array<any>;
  public rows: number = 5;
  public totalElements: number = 0;
  public currentPage: number = 1;
  public offset: number = 0;
  public end: number = 0;

  constructor(
    public commentService: CommentService,
    public router: Router,
    public activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      (res) => {
        this.getCommentList();
      });
  }

  public getCommentList() {
    this.offset = (this.currentPage - 1) * this.rows;
    this.end = (this.currentPage) * this.rows;
    this.commentService.getCommentList(this.postId, this.currentPage)
      .subscribe(
        (res) => {
          console.log(res);
          this.comments = res.content;
          this.totalElements = res.totalElements;
        },
        error => console.error(error)
      );
  }

  public doWriteComment() {
    let currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    this.comment.userId = currentUser.id;
    this.comment.postId = this.postId;
    this.commentService.writeComment(this.comment).subscribe(
      (res) => {
        this.currentPage = 1;
        this.getCommentList();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public pageChanged(event: any): void {
    this.currentPage = parseInt(event.page) + 1;
    this.getCommentList();
  }
}