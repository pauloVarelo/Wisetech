import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Contract } from 'app/models/contract-model';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, Firestore, getDocs, getFirestore } from "firebase/firestore";

const document = "contrato";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  public db: Firestore = null;
  formContract:FormGroup;
  contract: Contract;

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

    this.createForm(this.contract);
  }

  async createContract(db: Firestore, contract: Contract) {
    try {
      const docRef = await addDoc(collection(db, document), contract);
      console.log("Documento adicionado com o ID: ", docRef.id);
    } catch (e) {
      console.error("Erro ao adicionar documento: ", e);
    }
  }

  async getFormData() {
    //Pegar dados so form
    const contract: Contract = {
      client: this.formContract.controls['client'].value,
      company: this.formContract.controls['company'].value,
      dataInsert: this.formContract.controls['dataInsert'].value,
      dataExpiration: this.formContract.controls['dataExpiration'].value,
      descricao: this.formContract.controls['descricao'].value,
      email: this.formContract.controls['email'].value,
      sale: this.formContract.controls['sale'].value,
      seller: this.formContract.controls['seller'].value,
      id: ''
    }
    await this.createContract(this.db, contract);
  }

  createForm(contract: Contract) {
    this.formContract = this.formBuilder.group({
      company: '',
      client: '',
      dataInsert: null,
      dataExpiration: null,
      descricao: '',
      email: '',
      sale: '',
      seller: '',
    });

    console.log(this.formContract.value);
  }

  onSubmit(){
    this.getFormData();
    const contractClear: Contract = {
      id: null,
      company: '',
      client: '',
      dataInsert: null,
      dataExpiration: null,
      descricao: '',
      email: '',
      sale: null,
      seller: ''
    };
    this.formContract.reset(contractClear)
    console.log(this.formContract.value);
    
  }

}
