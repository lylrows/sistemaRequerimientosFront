import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-editors',
  templateUrl: './editors.component.html',
  styleUrls: ['./editors.component.scss'],
})
export class EditorsComponent implements OnInit {
  public Editor = ClassicEditor;

  breadscrums = [
    {
      title: 'Editors',
      items: ['Forms'],
      active: 'Editors',
    },
  ];
  EditorForm: FormGroup;
  constructor(private fb: FormBuilder,
    private router: Router,) {
    this.EditorForm = this.createContactForm();
  }
  createContactForm(): FormGroup<any> {
    return this.fb.group({
      editor:['']
    })
  }
  ngOnInit() {}
  submit(){

  }
  confirmAdd(){
   let editor = this.EditorForm.getRawValue();
   ////////////console.log("editor", editor)
  }
  onNoClick(){
    this.router.navigate(['/admin/incidencias/agregar-incidencia']);
    
  }
}
