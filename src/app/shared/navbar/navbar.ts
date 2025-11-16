import { Component, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faEye, faFile,faGear,faL,faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import { Subnavbar } from './subnavbar/subnavbar';
import { NgClass } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [FontAwesomeModule, Subnavbar, RouterLink],
  templateUrl: './navbar.html',
  styleUrl:'./navbar.scss'
})
export class Navbar {
  faFile = faFile;
  faEdit = faPenToSquare;
  faView = faEye;
  faConfig = faGear;


  sublistaVisible = signal(false);

  mostrarSublista(lista:Subnavbar) {
    lista.visibleTrue();
  }

  ocultarSublista(listas:Subnavbar[]) {
    for(let lista of listas){
      lista.visibleFalse();
    }
  }
}
