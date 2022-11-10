import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contract } from 'app/models/contract-model';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, doc, Firestore, getDocs, getFirestore, updateDoc } from "firebase/firestore";

const document = "contrato";

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contract) { }
    
    db: Firestore
    formContract:FormGroup;
    contract:Contract;
    
    ngOnInit() {
      const firebaseConfig = {
        apiKey: "AIzaSyCem-XMaVOiiQakEvhpO1Y-3RE03yxT7Os",
        authDomain: "wisetech-be6a4.firebaseapp.com",
        projectId: "wisetech-be6a4",
        storageBucket: "wisetech-be6a4.appspot.com",
        messagingSenderId: "749448077635",
        appId: "1:749448077635:web:556646b304f02979bf8ff6",
        measurementId: "G-PYWSQREHF7"
      };
      
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // Initialize Cloud Firestore and get a reference to the service
    this.db = getFirestore(app);

    this.contract=this.data;
    this.createForm(this.contract);
  }
  
  createForm(contract: Contract) {
    this.formContract = this.formBuilder.group({
      id: contract.id,
      company: contract.company,
      client: contract.client,
      dataInsert: contract.dataInsert,
      dataExpiration: contract.dataExpiration,
      descricao: contract.descricao,
      email: contract.email,
      sale: contract.sale,
      seller: contract.seller,
    });

    console.log(this.formContract.value);
  }

  getFormData(): Contract {
    //Pegar dados so form
    return {
      client: this.formContract.controls['client'].value,
      company: this.formContract.controls['company'].value,
      dataInsert: this.formContract.controls['dataInsert'].value,
      dataExpiration: this.formContract.controls['dataExpiration'].value,
      descricao: this.formContract.controls['descricao'].value,
      email: this.formContract.controls['email'].value,
      sale: this.formContract.controls['sale'].value,
      seller: this.formContract.controls['seller'].value,
      id: this.formContract.controls['id'].value
    }
  }
  
  async onSubmit() {
    const contract = this.getFormData();
    const docRef = doc(this.db, document, contract.id);
    await updateDoc(docRef, contract);
    this.dialogRef.close();
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
