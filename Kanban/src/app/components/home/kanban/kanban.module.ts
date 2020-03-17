import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban-routing.module';
import { KanbanComponent } from './kanban.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [KanbanComponent],
  imports: [
    CommonModule,
    KanbanRoutingModule,
    MaterialModule
  ]
})
export class KanbanModule { }
