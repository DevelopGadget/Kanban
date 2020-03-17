import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Dialog from '../../models/dialog';

@Component({
  selector: 'app-code-dialog',
  templateUrl: './code-dialog.component.html'
})
export class CodeDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Dialog) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  IsEmpty(): boolean {
    if (this.data.User.Code)
      return !this.data || this.data.User.Code === '' || this.data.User.Code.includes(' ');
    return true;
  }

}
