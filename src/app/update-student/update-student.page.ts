import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.page.html',
  styleUrls: ['./update-student.page.scss'],
})
export class UpdateStudentPage implements OnInit {

  public myForm: FormGroup;
  public validationMessages: Object;
  public searched: Boolean = false;
  public activeStudent: Student;

  constructor(private studentService: StudentService, private fb: FormBuilder, private tc: ToastController, private aR: ActivatedRoute,private router: Router) {
    this.activeStudent = {
      name: "",
      age: 0,
      career: "",
      email: "",
      photo: "",
      nip: 0,
      curp: "",
      id: "",
      controlnumber: ""
    }

    this.aR.queryParams.subscribe((params) => {
      this.studentService.getStudent(params.id).subscribe(res => {
        this.activeStudent = res
      })
    });
  }

  async updateStudent() {
    if (this.myForm.valid) {
      let newStudent = {
        controlnumber: this.myForm.get('controlnumber').value,
        name: this.myForm.get('name').value,
        curp: this.myForm.get('curp').value,
        age: this.myForm.get('edad').value,
        nip: this.myForm.get('nip').value,
        email: this.myForm.get('email').value,
        career: this.myForm.get('career').value,
        photo: this.myForm.get('photo').value
      }
      this.studentService.updateStudent(this.activeStudent.id, newStudent)
      this.myForm.reset();
      let toast = await this.tc.create({
        message: 'Estudiante actualizado',
        duration: 2000
      });
      toast.present();
      this.router.navigate(['/home']);
    } else {
      let toast = await this.tc.create({
        message: 'Verifique que todos los campos estén correctos',
        duration: 2000
      });
      toast.present();
    }
  }

  ngOnInit() {
    this.myForm = this.fb.group(
      {
        controlnumber: ["", Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]+$')])],
        name: ["", Validators.compose([Validators.required])],
        curp: ["", Validators.compose([Validators.required, Validators.minLength(18), Validators.maxLength(18), Validators.pattern(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/)])],
        edad: ["", Validators.compose([Validators.required, Validators.min(18)])],
        nip: ["", Validators.compose([Validators.required, Validators.min(9), Validators.max(9999)])],
        email: ["", Validators.compose([Validators.required, Validators.pattern('^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$')])],
        career: ["", Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(3)])],
        photo: ["", Validators.compose([Validators.required, Validators.pattern(/https?:\/\/[\w\-\.]+\.\w{2,5}\/?\S*/)])]

      }
    );

    this.validationMessages = {
      'controlnumber': [
        { type: 'required', message: "Número de control obligatorio" },
        { type: 'minLength', message: "El número de control debe de ser de 8 dígitos" },
        { type: 'maxLength', message: "El número de control debe de ser de 8 dígitos" },
        { type: 'pattern', message: "El número de control está mal formado" }
      ],
      'name': [
        { type: 'required', message: "Nombre obligatorio" }
      ],
      'curp': [
        { type: 'required', message: "La curp es obligatoria" },
        { type: 'minLength', message: "La curp debe ser de 18 digitos" },
        { type: 'maxLength', message: "La curp debe ser de 18 digitos" },
        { type: 'pattern', message: "La curp está mal formada" }
      ],
      'edad': [
        { type: 'required', message: "La edad es obligatoria" },
        { type: 'min', message: "La edad debe ser mayor a 17" },
      ],
      'nip': [
        { type: 'required', message: "El nip es obligatorio" },
        { type: 'min', message: "El nip debe ser mayor a 9" },
        { type: 'max', message: "El nip debe ser menor a 9999" }
      ],
      'email': [
        { type: 'required', message: "Correo obligatorio" },
        { type: 'pattern', message: "El correo está mal formado" }
      ],
      'career': [
        { type: 'required', message: "Elige una carrera" },
        { type: 'minLength', message: "Elige una carrera" },
        { type: 'maxLength', message: "Elige una carrera" }
      ],
      'photo': [
        { type: 'required', message: "foto obligatoria" },
        { type: 'pattern', message: "El url está mal formado" }
      ]
    }
    this.myForm.controls['controlnumber'].disable();
  }

}
