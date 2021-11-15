import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  form: FormGroup;
  showForm: boolean = false;
  private formSubmitAttempt: boolean;
  representanLegalList = [];
  tipoDocumentoList = [];
  companyList ;
  constructor(private formBuilder: FormBuilder,
    private requestService: RequestService) { }

  ngOnInit(): void {
  this.getCompanyList();
  this.getRepresentanteLegalList();
  this.getTipoDocumentoList();
  
  this.form = this.formBuilder.group({
      id: [null],
      tipoDocumento: ['',Validators.required],
      numeroDocumento: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      departamento: ['', Validators.required],
      pais: ['', Validators.required],
      telefono: ['', Validators.required],
      representanteLegalId: ['', Validators.required],
    });
  }

  saveCompany( form){
    this.formSubmitAttempt = true;

    this.requestService.sendRequest("company/saveCompany",this.form.value, 'post').subscribe(
      data => {
        if( this.form.controls['id'].value != null){
          alert('Información actualizada con exito.')
        }else{
          alert('Empresa creada con exito.')
        }
        
        this.showForm = false;
        this.getCompanyList();
        this.clearForm();
      },
      error => {
       
      }
    );

  }

  isFieldInvalid(field: string) {
    console.log(!this.isFieldValid(this.form, field, this.formSubmitAttempt))
    return !this.isFieldValid(this.form, field, this.formSubmitAttempt)
  }

  isFieldValid(form: FormGroup, field:string, submited:boolean){
    if( !form.get(field) )
      return false;
    
    if( !submited )
      return true;

    return form.get(field).valid
  }


  getCompanyList(){

    this.requestService.sendRequest("company/getCompanyList", {}, 'get').subscribe(
      data => {
        this.companyList = data;

      },
      error => {
       
      }
    );
  }


  getRepresentanteLegalList(){

    this.requestService.sendRequest("representanteLegal/getList", {}, 'get').subscribe(
      data => {
        this.representanLegalList = <any[]> data;

      },
      error => {
       
      }
    );
  }


  getTipoDocumentoList(){

    this.requestService.sendRequest("company/getTipoDocumentoList", {}, 'get').subscribe(
      data => {
        this.tipoDocumentoList = <any[]> data;

      },
      error => {
       
      }
    );
  }


  clearForm(){
    this.form = this.formBuilder.group({
      id: [null],
      tipoDocumento: ['',Validators.required],
      numeroDocumento: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      departamento: ['', Validators.required],
      pais: ['', Validators.required],
      telefono: ['', Validators.required],
      representanteLegalId: ['', Validators.required],
    });
  }


  chargeForm( company){
  this.showForm =  true;
  this.form.controls['id'].setValue(company.id);
  this.form.controls['tipoDocumento'].setValue(company.tipoDocumento);
  this.form.controls['numeroDocumento'].setValue(company.numDocumento);
  this.form.controls['nombre'].setValue(company.nombre);
  this.form.controls['direccion'].setValue(company.direccion);
  this.form.controls['ciudad'].setValue(company.ciudad);
  this.form.controls['departamento'].setValue(company.departamento);
  this.form.controls['pais'].setValue(company.pais);
  this.form.controls['telefono'].setValue(company.telefono);
  this.form.controls['representanteLegalId'].setValue(company.representanteLegal.id);
  }

  
  
}
