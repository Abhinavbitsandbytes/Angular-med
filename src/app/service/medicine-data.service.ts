import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
const baseUrl = 'http://localhost:3000/medicineList/'
@Injectable({
  providedIn: 'root'
})
export class MedicineDataService {

  constructor(private http: HttpClient) { }
  

  getMedicineList()   {
 return this.http.get(baseUrl)

}
postMedicineList(data){
 return this.http.post(baseUrl, data)
}
putMedicineList(id,data){
  return this.http.put(baseUrl + id, data)
 }
 deleteMedicineList(id){
  return this.http.delete(baseUrl + id)
 }


}
