import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.page.html',
  styleUrls: ['./view-student.page.scss'],
})
export class ViewStudentPage implements OnInit {

  public student: Student;

  constructor(private studentService: StudentService, private activatedRoute: ActivatedRoute) {
    this.student = {
      name: "",
      age: 0,
      career: "",
      email: "",
      photo: "",
      nip: 0,
      curp: "",
      id:"",
      controlnumber:""
      }
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.studentService.getStudent(params.id).subscribe(res => {
        this.student = res
        console.log(params.id)
        console.log(res)
      })
    });
  }
}
