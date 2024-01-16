import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StaffService } from 'src/app/admin/staff/all-staff/staff.service';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-thank-you-wall',
  templateUrl: './thank-you-wall.component.html',
  styleUrls: ['./thank-you-wall.component.sass']
})
export class ThankYouWallComponent implements OnInit {
  messages: any[] = []
  thankYouForm : FormGroup;
  submitted = false;
  photoFile: File;
  colors = [
    '#e6ee9c', // Light Green
    '#c5e1a5', // Lighter Green
    '#e1bee7', // Light Purple
    '#f8bbd0', // Light Pink
    '#b3e5fc', // Light Blue
    '#d1c4e9', // Light Lavender
    '#fff59d', // Light Yellow
    '#ffd699', // Light Orange
    '#a7ffeb', // Light Turquoise
    '#ffccbc', // Light Coral
    '#dcedc8', // Light Mint
    '#ffe0b2', // Light Sand
    '#b2ebf2', // Light Sky Blue
    '#f1f8e9', // Pale Green
    '#ffb3ba', // Light Red
    '#d5f4e6', // Light Sea Green
    '#e6beff', // Light Orchid
    '#ffdfba', // Light Peach
    '#b2dfdb', // Light Teal
  ];
  

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private staffService: StaffService) { }

  ngOnInit(): void {
    this.thankYouForm = this.formBuilder.group({
      name : ['', Validators.required],
      message:['', [Validators.required, Validators.minLength(50), Validators.maxLength(250)]],
      urlFile:[''],
      uploadFile:['']
    });
   
    
    //console.log("messages", this.messages)
    this.loadMessages();
    
  }
  loadMessages() {
    this.authService.getMessages().subscribe( res =>{
      this.messages = res.objModel;
      
    })
  }

  get f(){
    return this.thankYouForm.controls;
  }


  onSubmit(){
    console.log("file", this.photoFile)
    //return;
    if(this.photoFile == undefined){
      return;
    }
    this.submitted = true;
    if(this.thankYouForm.invalid){
      return;
    }else {
      let message : message = {
        id: 0,
        name: this.thankYouForm.value.name,
        message: this.thankYouForm.value.message,
        urlFile: ''
      }
      this.authService.insertMessage(message, this.photoFile).subscribe( res =>{
        //console.log('IP info:', res);
        this.loadMessages();
      })      
      this.thankYouForm.reset();
      Object.keys(this.thankYouForm.controls).forEach(key => {
        this.thankYouForm.controls[key].setErrors(null);
      });
      this.submitted = false;
    }
  }

  onNameInputChange(event: any) {
    const inputValue = event.target.value;
    this.thankYouForm.controls['name'].setValue(inputValue.toUpperCase(), { emitEvent: false });
  }
  capturarFile(event: any){
    if (event.target.files && event.target.files.length > 0) {
      this.photoFile = event.target.files[0];
      console.log("file", this.photoFile)
    }

  }
}
export interface message {
  id: number;
  name: string;
  message: string;
  urlFile:string
}
