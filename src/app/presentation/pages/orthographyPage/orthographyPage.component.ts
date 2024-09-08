import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatMessageComponent, MyMessageComponent, TextMessageBoxComponent, TypingLoaderComponent } from '@components/index';
import { TextMessageBoxFileComponent } from "../../components/text-boxes/textMessageBoxFile/textMessageBoxFile.component";


@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TextMessageBoxComponent,
    TypingLoaderComponent,
    TextMessageBoxFileComponent,
],
  templateUrl: './orthographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {


  handleMessage(prompt: string) {
    console.log({prompt});
    
  }
}
