import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageEvent } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';
import { TextMessageBoxFileComponent } from "../../components/text-boxes/textMessageBoxFile/textMessageBoxFile.component";

@Component({
  selector: 'app-audio-to-text-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxFileComponent
],
  templateUrl: './audioToTextPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioToTextPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public OpenAiService = inject(OpenAiService);

  handleMessage(prompt: string) {
    console.log({ prompt });

  }
  handleMessageWithFile({ prompt, file }: TextMessageEvent) {
    console.log({ prompt, file });
  }

}
