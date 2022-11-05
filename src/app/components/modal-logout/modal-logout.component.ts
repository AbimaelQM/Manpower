import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-modal-logout',
  templateUrl: './modal-logout.component.html',
  styleUrls: ['./modal-logout.component.scss']
})
export class ModalLogoutComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private service:LoginService,
    public dialogRef: MatDialogRef<ModalLogoutComponent>,
  ) { }

  ngOnInit(): void {
    
  }

  logout(){

    this.service.logout()
    this.dialogRef.close();
  }

  cancel(){

    this.dialogRef.close();
  }

}
