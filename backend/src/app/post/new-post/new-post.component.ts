import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit{
  imgSrc: any = './assets/img/image_placeholder.avif';
  selectedImage: any;
  categories!: Array<any>;
  postForm!: FormGroup;
  isdisabled:boolean=false;
  category: any;
  post:any;
  formStatus:string='Add New';
  docId:string='';
  constructor(private categoryService: CategoriesService, private formBuilder: FormBuilder,private postService:PostService,private route:ActivatedRoute) {
    this.route.queryParams.subscribe(val=>{
      this.docId=val['id']
      if(this.docId){
        this.postService.loadOneData(val['id']).subscribe(post=>{
          this.post=post
          this.postForm = this.formBuilder.group({
            title: [this.post.title, [Validators.required, Validators.minLength(10)]],
            permalink: [{value:this.post.permalink,disabled:true},Validators.required],
            excerpt: [this.post.excerpt, [Validators.required, Validators.minLength(50)]],
            category: [`${this.post.category.categoryId}-${this.post.category.category}`, Validators.required],
            postImg: ['', Validators.required],
            content: [this.post.content, Validators.required],
          });
          this.imgSrc=this.post.postImgPath;
          this.formStatus='Edit'
        });
      }
      else{
        this.postForm = this.formBuilder.group({
          title: ['', [Validators.required, Validators.minLength(10)]],
          permalink: [{value:'',disabled:true},Validators.required],
          excerpt: ['', [Validators.required, Validators.minLength(50)]],
          category: ['', Validators.required],
          postImg: ['', Validators.required],
          content: ['', Validators.required],
        });
      }
    })
    
  }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(val => {
      this.categories = val;
    });
  }

  get fc() {
    return this.postForm.controls;
  }

  onTitleChange($event: any) {
    const title = $event.target.value; // Enable the permalink field
    this.postForm.patchValue({ permalink: title.replace(/\s/g, '-') });
  }

  showPreview($event: any) {
    const reader = new FileReader(); 
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    };
    reader.readAsDataURL($event?.target.files[0]);
    this.selectedImage = $event.target.files[0];
  }
  onSubmit(){
    let split= this.postForm.value.category.split('-');
    const postData:Post={
      title:this.postForm.value.title,
      permalink:this.postForm.getRawValue().permalink,
      category:{
        categoryId: split[0],
        category:split[1]
      },
      postImgPath:'',
      excerpt:this.postForm.value.excerpt,
      content:this.removeHtmlTags(this.postForm.value['content']),
      isFeatured:false,
      views:0,
      status:'new',
      createdAt:new Date()
    }
     this.postService.uploadImage(this.selectedImage,postData,this.formStatus,this.docId);
     this.postForm.reset();
     this.imgSrc='./assets/img/image_placeholder.avif';
  }
  removeHtmlTags(text: string): string {
    return text.replace(/<[^>]*>/g, '');
  }
}
