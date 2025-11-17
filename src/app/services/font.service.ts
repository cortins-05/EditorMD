import { effect, Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FontService {

  fontSize: WritableSignal<number> = signal(
    localStorage.getItem("fontSize") !== null
      ? Number(localStorage.getItem("fontSize"))
      : 24
  );


  constructor() {
    effect(()=>{
      localStorage.setItem("fontSize", this.fontSize().toString());
    })
  }

  upFont(){
    if(this.fontSize()==40) return;
    this.fontSize.update((valor)=>valor+2);
  }

  downFont(){
    if(this.fontSize()==14) return;
    this.fontSize.update((valor)=>valor-2);
  }

}
