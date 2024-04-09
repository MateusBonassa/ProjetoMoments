import { Component, OnInit } from '@angular/core';

import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/Moment';
import { Comment } from 'src/app/Comment';
import { CommentService } from 'src/app/services/comment.service';
import { FormGroup ,FormControl,Validators,FormGroupDirective} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from 'src/app/services/messages.service';
import { environment } from 'src/environments/environment';
import{faTimes,faEdit}  from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;
  faTimes = faTimes;
  faEdit = faEdit;
  commentForm! : FormGroup;
  constructor(private momentService:MomentService,private route :ActivatedRoute,
    private messageService:MessagesService, private router:Router,private commentService:CommentService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot);
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.momentService.getMoment(id).subscribe(item => this.moment = item.data);
    this.commentForm = new FormGroup({
      text:new FormControl("",[Validators.required]),
      username:new FormControl("",[Validators.required])
    });
  }

get text(){
  return this.commentForm.get( "text" ) !;
}
get username(){
  return this.commentForm.get("username")!;
}
  async removeHandler(id:number){
    await this.momentService.removeMoment(id).subscribe();

    this.messageService.add("Momento excluido com sucesso");
    setTimeout(()=>{
      this.router.navigate(['/']);
    },500);

  }


  async onSubmit(formDirective : FormGroupDirective){
    if(this.commentForm.invalid){
      return
    }

    const data:Comment = this.commentForm.value;
    data.momentId = Number(this.moment!.id);
    await this.commentService.createComment(data).subscribe((comment)=>this.moment!.comments!.push(comment.data))
    this.messageService.add("Comentario adicionado!");
    //resetar o formulario
    this.commentForm.reset();
    formDirective.resetForm( );
  }
}



