import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-message-bar',
  templateUrl: './message-bar.component.html',
  styleUrls: ['./message-bar.component.scss']
})
export class MessageBarComponent implements OnInit {

  type_message: string = 'message-bar-success'

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { message: string, action: string, type: number },
    public ref: MatSnackBarRef<MessageBarComponent>
    
  ) { }

  ngOnInit(): void {

    this.loadType()
    
  }

  loadType() {

    if (this.data.type >= 200 && this.data.type < 300) {

      this.type_message = 'message-bar-success'

    } else if (this.data.type >= 400 && this.data.type < 500) {

      this.type_message = 'message-bar-error'
    
    }else if(this.data.type >= 500 && this.data.type <= 599){

      this.type_message = 'message-bar-warnig'

    }
  }

  close(){

    this.ref.dismiss()
  }

}
