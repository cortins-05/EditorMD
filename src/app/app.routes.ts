import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'file',
    loadChildren: ()=>import("./file/file.routes").then(m=>m.fileRoutes),
    title:'File'
  }
];
