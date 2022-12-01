import { Component } from '@angular/core';

import { Student } from "../models/student";
import { StudentService } from "../services/student.service";
import { AlertController } from "@ionic/angular";
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],  
})
export class HomePage {

  public students: Student[];

  constructor(private studentService: StudentService, private alertController: AlertController, private router: Router) {
    this.studentService.getStudents().subscribe(res => {
      this.students = res
    });
  }

  public async removeStudent(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      subHeader: '¿Estás seguro que deseas eliminar?',
      message: 'Esto es una confirmación',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.studentService.removeStudent(id).subscribe(res => {
              this.students = res
            })
          }
        }
      ]
    });
    await alert.present();
  }

  public getStudentByControlNumber(id: string): void {
    this.router.navigate(['/view-student'], {
      queryParams: { id: id },
    });
  }

  public goToNewStudent(): void {
    this.router.navigate(['/new-student']);
  }

  public goToUpdateStudent(id: string): void {
    this.router.navigate(['/update-student'], {
      queryParams: { id: id }
    });
  }

}
