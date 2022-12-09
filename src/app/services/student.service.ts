import { Injectable } from '@angular/core';
import { Student } from "../models/student";
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students: Student[];

  constructor(private firestore: AngularFirestore) {
    this.getStudents().subscribe(res => {
      this.students = res
    })
  }

  public getStudents(): Observable<Student[]> {
    return this.firestore.collection('students').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Student
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }

  public getStudent(id: string): Observable<Student> {
    return this.firestore.collection('students').doc(id).snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as Student
        const id = a.payload.id;
        return { id, ...data };
      })
    )
  }

  public updateStudent(id: string, student: Student): Observable<Student[]> {
    this.firestore.doc('students/' + id).update(student)
    return this.getStudents();
  }

  public removeStudent(id: string): Observable<Student[]> {
    this.firestore.doc('students/' + id).delete()
    return this.getStudents();
  }

  public newStudent(student: Student): Observable<Student[]> {
    this.firestore.collection('students').add(student);
    return this.getStudents();
  }

  

}
