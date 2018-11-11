import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManageChildService {
  public selectedChild;
  public selectedChildID;
  constructor() { }
}
