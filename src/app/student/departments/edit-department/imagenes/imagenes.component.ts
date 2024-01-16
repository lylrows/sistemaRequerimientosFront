import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.sass']
})
export class ImagenesComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<ImagenesComponent>) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  descargarArchivo() {
    // Crea un enlace temporal
    const link = document.createElement('a');
    link.href = this.data.urlArchivo;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.download = this.data.nombreArchivo;
  
    // Simula el click en el enlace para descargar el archivo
    link.click();
  }
  
}
