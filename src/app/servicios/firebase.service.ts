import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private firestore:AngularFirestore
  ) { }


  /**
   * metodo para listar estudiantes
   * CRUD de firebase
  */
  getEstudiantes(){
    return this.firestore.collection("estudiantes").snapshotChanges();
  }

  createEstudiante(estudiante:any){
    return this.firestore.collection("estudiantes").add(estudiante);
  }

  updateEstudainte(id:any, estudainte:any){
    return this.firestore.collection("estudiantes").doc(id).update(estudainte);
  }

  eliminarEstudiante(id:any){
    return this.firestore.collection("estudiantes").doc(id).delete();
  }





}
