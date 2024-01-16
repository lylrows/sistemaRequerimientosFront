import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightSidebarService } from './service/rightsidebar.service';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './service/auth.service';
import { DynamicScriptLoaderService } from './service/dynamic-script-loader.service';
import { DirectionService } from './service/direction.service';
import { throwIfAlreadyLoaded } from './guard/module-import.guard';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {LoadingInterceptor} from '../core/interceptor/loading.interceptor'

@NgModule({
  declarations: [],
  imports: [CommonModule,     
    NgxSpinnerModule,],
  providers: [
    RightSidebarService,
    AuthGuard,
    AuthService,
    DynamicScriptLoaderService,
    DirectionService, 
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
