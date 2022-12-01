import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateStudentPageRoutingModule } from './update-student-routing.module';

import { UpdateStudentPage } from './update-student.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UpdateStudentPageRoutingModule
  ],
  declarations: [UpdateStudentPage]
})
export class UpdateStudentPageModule {}
