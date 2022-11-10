import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditModalComponent } from 'app/edit-modal/edit-modal.component';
import { Contract } from 'app/models/contract-model';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, getFirestore } from "firebase/firestore";

const document = "contrato";

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  
  public contracts: Contract[]=[];

public db: Firestore;

  async ngOnInit() {

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

    // await this.createContract(db, data);
    await this.readContract(this.db);

  }

  async readContract(db: Firestore) {
    this.contracts = [];
    const querySnapshot = await getDocs(collection(db, document));
    querySnapshot.forEach((doc) => {
      this.contracts.push({
        id: doc.id,
        ...doc.data(),
      } as Contract)
    });
    console.log(this.contracts);
    
  
  }
  
  async removeContract(contract: Contract){
    console.log(contract);
    const docRef = doc(this.db, document, contract.id);
    
    await deleteDoc(docRef);
    await this.readContract(this.db);
  }

  editContract(contract: Contract) {
    console.log("TESTE: ", contract);
    
    let dialogRef = this. dialog.open(EditModalComponent, {
      height: '100vh',
      width: '130vh',
      data:contract,
    });

    dialogRef.afterClosed().subscribe(async () => {
      await this.readContract(this.db);
    });

  }

}
