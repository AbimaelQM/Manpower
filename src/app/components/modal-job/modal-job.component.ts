import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Job } from 'src/app/models/job';

@Component({
  selector: 'app-modal-job',
  templateUrl: './modal-job.component.html',
  styleUrls: ['./modal-job.component.scss']
})
export class ModalJobComponent implements OnInit {

  public job: Job = <Job>{}
  constructor(
    private dialog: MatDialog,
    private modalJob: MatDialogRef<ModalJobComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { job: Job }
  ) { }

  ngOnInit(): void {
    if (this.data?.job) {
      this.job = this.data.job;
    }
    this.modalJob.backdropClick().subscribe(() => {
      this.closeModal();
    })
  }


  closeModal() {
    this.modalJob.close();
  }
}
