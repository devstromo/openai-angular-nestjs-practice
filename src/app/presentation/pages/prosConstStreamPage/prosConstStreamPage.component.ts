import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pros-const-stream-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './prosConstStreamPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProsConstStreamPageComponent { }
