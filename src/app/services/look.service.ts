import { effect, Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LookService {

  preview: WritableSignal<boolean> = signal(
    localStorage.getItem("preview") !== null
      ? localStorage.getItem("preview") === "true"
      : true
  );

  constructor() {
    effect(()=>{
      localStorage.setItem("preview",String(this.preview()));
    })
  }

  togglePreview(){
    this.preview.set(!this.preview());
  }

}
