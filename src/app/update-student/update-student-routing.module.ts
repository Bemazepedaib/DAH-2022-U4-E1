import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateStudentPage } from './update-student.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateStudentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateStudentPageRoutingModule {}
