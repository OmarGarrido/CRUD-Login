import { Component, OnInit } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../servicios/firebase.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'
  ]
})
export class CrudComponent implements OnInit {

  closeResult = '';

  estudianteForm: FormGroup;
  idFirebaseUpdate: string;
  updSave:boolean;

  constructor(
    public fb: FormBuilder,
    private modalService: NgbModal,
    private firebaseService: FirebaseService) { }

  config: any;
  collection = { count: 4, data: [] }

  ngOnInit(): void {
    this.idFirebaseUpdate = "";

    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.data.length
    };

    this.estudianteForm = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required]

    });

    this.firebaseService.getEstudiantes().subscribe(
      resp => {
        this.collection.data = resp.map((e: any) => {
          return {
            id: e.payload.doc.data().id,
            nombre: e.payload.doc.data().nombre,
            apellido: e.payload.doc.data().apellido,
            idFirebase: e.payload.doc.id
          }
        })
      },
      error => {
        console.error(error);
      }
    );

    /* for (var i=0; i<this.collection.count; i++){
      this.collection.data.push({
        id:i,
        nombre: "nombre"+i,
        apellido: "apellido"+i
      })
    } */

    console.log(this.collection.data);


  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  eliminar(item: any): void {
    this.firebaseService.eliminarEstudiante(item.idFirebase)
/*   this.collection.data.pop(item);
 */};

  guardar(): void {

    this.firebaseService.createEstudiante(this.estudianteForm.value).
      then(resp => {
        this.estudianteForm.reset();
        this.modalService.dismissAll();
      })
      .catch(error => {
        console.error(error);

      })

  };

  actualizar() {
    if (!isNullOrUndefined(this.idFirebaseUpdate)) {
      this.firebaseService.updateEstudainte(this.idFirebaseUpdate, this.estudianteForm.value).then(resp => {
      this.estudianteForm.reset();
      this.modalService.dismissAll();
      })
        .catch(error => {
          console.error(error);

        });
    }
  }

  //esto es codigo del modal
  editarEstudiante(content, item: any) {
    this.updSave=true;
    //llenando formulario con los datos a editar
    this.estudianteForm.setValue({
      id: item.id,
      nombre: item.nombre,
      apellido: item.apellido
    });
    this.idFirebaseUpdate=item.idFirebase;

    //**//
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  nuevoEstudiante(content) {
    this.updSave=false;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
