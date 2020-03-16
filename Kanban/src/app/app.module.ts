import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { OverlayService } from './services/overlay.service';
import { LoadingModule } from './components/loading/loading.module';
import { CodeDialogModule } from './components/code-dialog/code-dialog.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    LoadingModule,
    CodeDialogModule
  ],
  providers: [OverlayService],
  bootstrap: [AppComponent]
})
export class AppModule { }
