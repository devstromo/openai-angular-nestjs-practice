import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent, GptMessageOrthographyComponent, MyMessageComponent, TextMessageBoxComponent, TextMessageBoxEvent, TextMessageBoxFileComponent, TextMessageBoxSelectComponent, TextMessageEvent, TypingLoaderComponent } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from '../../services/openai.service';



@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    GptMessageOrthographyComponent,
    MyMessageComponent,
    TextMessageBoxComponent,
    TypingLoaderComponent,
    TextMessageBoxFileComponent,
    TextMessageBoxSelectComponent
  ],
  templateUrl: './orthographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {

  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public OpenAiService = inject(OpenAiService);

  handleMessage(prompt: string) {
    this.isLoading.set(true);
    this.messages.update((prev) => [...prev, { text: prompt, isGpt: false }]);
    this.OpenAiService.checkOrthography(prompt)
      .subscribe(resp => {
        this.isLoading.set(false);
        this.messages.update((messages) => [...messages, { text: resp.message, isGpt: true, info: resp }]);
      })
  }

}
