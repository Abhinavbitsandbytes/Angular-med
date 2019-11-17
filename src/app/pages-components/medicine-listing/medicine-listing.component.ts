import { Component, OnInit, } from '@angular/core';
import { MedicineDataService } from '../../service/medicine-data.service';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-medicine-listing',
  templateUrl: './medicine-listing.component.html',
  styleUrls: ['./medicine-listing.component.css']
})
export class MedicineListingComponent implements OnInit {
  medicineList = []
  event_data: any;
  private _searchTerm: string
  public filteredEvents: any
  public startServerMessage: boolean
  medicineForm: FormGroup;
  listToShow: any
  filterMed: any
  editForm: FormGroup;
  quickAddQuantityForm: FormGroup;
  public isEdited: boolean
  editId: any
  editIndex: any
  openModal: boolean
  isquicklyAdded: boolean
  quickaddData: any
  medicineToBeadded = []

  constructor(public medicine_service: MedicineDataService, private _router: Router, private _formBuilder: FormBuilder, ) {
    this.medicine_service.getMedicineList().subscribe(data => {
      this.event_data = data;
      this.filteredEvents = data
    })

    this.medicineForm = this._formBuilder.group({
      medName: [''],
      medDescription: [''],
      quantity: [''],
      price: [''],

    });
  }

  get searchTerm(): string {
    return this._searchTerm;

  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEvents = this.filterEvents(value)
  }
  filterEvents(searchString: string) {
    if (this.event_data) {
      return this.event_data.filter(data =>
        data.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1)

    }
  }

  ngOnInit() {
    setTimeout(() => {
      this.startServerMessage = true
    }, 2000);
    this.getListOfMedicineToShow()

  }
  addMedicine() {
    for (const field in this.medicineForm.controls) {
      const control = this.medicineForm.get(field);
      control.markAsTouched();
    }
    const commonData = {
      name: this.medicineForm.get('medName').value,
      // id:Date.now(),
      description: this.medicineForm.get('medDescription').value,
      quantity: this.medicineForm.get('quantity').value,
      price: this.medicineForm.get('price').value,

    };
    this.medicineList.push(commonData)
    if(this.medicineForm.valid){
    this.medicine_service.postMedicineList(commonData).subscribe(data => {
      if (data) {
        this.getListOfMedicineToShow()
      }
    })
  }
}

  getListOfMedicineToShow() {
    this.medicine_service.getMedicineList().subscribe(data => {
      this.listToShow = data
      this.filterMed = this.listToShow.filter(list => {

        return list['id'] > 20

      }

      )
    }
    )
  }
  editMedicine(id: any, index: any) {
    this.isEdited = true
    this.openModal = true
    let medicineToBeEdited = this.filterMed.filter(med => {
      return med.id == id
    })
    this.editForm = this._formBuilder.group({
      medName: [medicineToBeEdited[0].name],
      medDescription: [medicineToBeEdited[0].description],
      quantity: [medicineToBeEdited[0].quantity],
      price: [medicineToBeEdited[0].price],
    });
    this.editId = id;
    this.editIndex = index
  }

  save() {
    for (const field in this.editForm.controls) {
      const control = this.editForm.get(field);
      control.markAsTouched();
      
    }
    if(!this.editForm.valid)
      return
    this.openModal = false
    this.isEdited = false
    const editdData = {
      name: this.editForm.get('medName').value,
      id: this.editId,
      description: this.editForm.get('medDescription').value,
      quantity: this.editForm.get('quantity').value,
      price: this.editForm.get('price').value,
    };
if(this.editForm.valid){
    this.medicine_service.putMedicineList(this.editId, editdData).subscribe(data => {
      if (data) {
        this.filterMed[this.editIndex] = editdData
      }
    })
  }
}
  deleteMedicine(id: any) {
    this.medicine_service.deleteMedicineList(id).subscribe(data => {

      if (data) {
        this.getListOfMedicineToShow()

      }
    })
  }
  quickAdd(id: any) {
    this.openModal = true
    this.isquicklyAdded = true
    this.isEdited = false
    this.quickAddQuantityForm = this._formBuilder.group({
      quantity: [""],

    });
     this.medicineToBeadded = this.filteredEvents.filter(med => {
      return med.id == id
    })
    this.quickaddData = {
      name: this.medicineToBeadded[0].name,
      // id:Date.now(),
      description: this.medicineToBeadded[0].description,
      quantity: this.medicineToBeadded[0].quantity,
      price: this.medicineToBeadded[0].price,

    };

  }
  saveQuantity() {
    for (const field in this.quickAddQuantityForm.controls) {
      const control = this.quickAddQuantityForm.get(field);
      control.markAsTouched();
      
    }
    if(!this.quickAddQuantityForm.valid)
      return
    this.openModal = false
    this.isquicklyAdded = false;
    this.isEdited = false
    this.quickaddData["quantity"] = this.quickAddQuantityForm.get("quantity").value
    if(this.quickAddQuantityForm.valid){
    this.medicine_service.postMedicineList(this.quickaddData).subscribe(data => {
      if (data) {
        this.getListOfMedicineToShow()
      }
    })
  }
}
  discard() {
    this.openModal = false
    this.isquicklyAdded = false;
  }
  cloneMedicine(id: any) {
    let medicineToBeCloned = this.filterMed.filter(med => {
      return med.id == id
    })
    const clonedData = {
      name: medicineToBeCloned[0].name,
      description: medicineToBeCloned[0].description,
      quantity: medicineToBeCloned[0].quantity,
      price: medicineToBeCloned[0].price,

    };
    this.medicine_service.postMedicineList(clonedData).subscribe(data => {
      if (data) {

        this.getListOfMedicineToShow()
      }
    })

  }

  getErrrorMessage(fieldName) {

    if (fieldName == 'medName') {

      return "Please enter your name"

    }
    else if (fieldName == 'medDescription') {

      return "Please enter Description"

    }
    else if (fieldName == 'quantity') {

      return "Please enter Qantity"

    }
    else if (fieldName == 'price') {

      return "Please enter Price"

    }

  }
}
