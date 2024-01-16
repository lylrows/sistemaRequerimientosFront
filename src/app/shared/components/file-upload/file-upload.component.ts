import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { StaffService } from 'src/app/admin/staff/all-staff/staff.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true,
    },
  ],
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements ControlValueAccessor {
  @Input() progress;
  onChange: Function;
  public file: File | null = null;
  imageSrc: string;

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
  }

  constructor(private host: ElementRef<HTMLInputElement>, private staffService: StaffService  ) {}

  writeValue(value: null) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {}
  onchangeFileUpload(event){
    
    const reader = new FileReader();
    const [file] = event.target.files;
      reader.readAsDataURL(file);
     
      reader.onload = () => {
    
        this.imageSrc = reader.result as string;
        //////////////console.log("imageSrc:", this.imageSrc)
        this.staffService.imgTemp = this.imageSrc;
      };
  }
}
