import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketManagerService } from './socket-manager.service';
import debug from 'debug';

const log = debug('dojo:SocketManagerModule');

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [SocketManagerService]
})
export class SocketManagerModule {

  constructor(@Optional() @SkipSelf() parentModule: SocketManagerModule) {
    if (parentModule) {
      log('Error');
      throw new Error(
        'GreetingModule is already loaded. Import it in the AppModule only');
    } else {
      log('good');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SocketManagerModule,
    };
  }
}

