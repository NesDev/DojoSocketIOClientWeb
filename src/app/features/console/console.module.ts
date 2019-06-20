import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoleComponent } from './console.component';
import { ColorizeLogPipe } from './pipes/colorize-log.pipe';
import { ColorizeCustomLogPipe } from './pipes/colorize-custom-log.pipe';

@NgModule({
  declarations: [
    ConsoleComponent,
    ColorizeLogPipe,
    ColorizeCustomLogPipe],
  imports: [
    CommonModule
  ]
})
export class ConsoleModule {
}
