import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingComponent } from './loading.component';
import { CodeDialogModule } from '../code-dialog/code-dialog.module';

@NgModule({
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
        CodeDialogModule
    ],
    declarations: [LoadingComponent],
    entryComponents: [LoadingComponent],
    exports: [LoadingComponent]
})
export class LoadingModule { }