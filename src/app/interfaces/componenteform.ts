import { NgForm } from "@angular/forms";

export interface Componenteform <T>{

    registro: T;

    submit(form: NgForm):void;
}
