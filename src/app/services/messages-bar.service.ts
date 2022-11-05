import { Inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarRef, MatSnackBarVerticalPosition, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MessageBarComponent } from '../components/message-bar/message-bar.component';

@Injectable({
  providedIn: 'root'
})
export class MessagesBarService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  private methods: Array<string> = ["GET", "POST", "PUT", "DELETE"];
  private messagesSuccess: Array<string> = ['Data loaded successfully!', 'Saved successfully!', 'Successfully updated!', 'Successfully deleted!'];
  private messagesError: Array<string> = ['Error loading data!', 'Could not save!', 'Cannot be updated!', 'Cannot be deleted!']

  constructor(

    private message_bar: MatSnackBar,
  ) { }


  public sendMessage(message: string, type: number) {


    this.message_bar.openFromComponent(MessageBarComponent, {

      duration: 5 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      data: {
        message: message,
        type: type
      }

    })
  }

  public sendMessageResponseSuccess(method: string, type: number) {

    let indiceMethod = this.methods.indexOf(method);


    this.message_bar.openFromComponent(MessageBarComponent, {

      duration: 5 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      data: {
        message: this.messagesSuccess[indiceMethod],
        type: type
      }

    })


  }

  public sendMessageResponseError(method: string, type: number) {

    let indiceMethod = this.methods.indexOf(method);

    let message = this.messagesError[indiceMethod]
    if(type == 409){
      message = "This team has reached the job limit."
    }
      
    

    this.message_bar.openFromComponent(MessageBarComponent, {

      duration: 5 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      data: {
        message: message,
        type: type
      }

    })
  }
}
