import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule} from '@angular/material/dialog';
import { CodeDialogComponent } from './code-dialog.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
    declarations: [CodeDialogComponent],
    imports: [CommonModule, MatDialogModule, MaterialModule],
    entryComponents: [CodeDialogComponent],
    exports: [CodeDialogComponent],
})
export class CodeDialogModule { }