import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConstantesComponent } from './constantes/constantes.component';
import { ParametrosComponent } from './parametros/parametros.component'
import { PerfilesComponent } from './perfiles/perfiles.component';


const routes: Routes =[
    {
        path:'parametros',
        component:ParametrosComponent,
    },
    {
        path:'perfiles',
        component:PerfilesComponent,
    },
    {
        path:'constantes',
        component:ConstantesComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
export class SeguridadRoutingModule {}