import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxFileComponent, TextMessageEvent } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-image-to-text-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxFileComponent
  ],
  templateUrl: './imageToTextPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageToTextPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  handleMessageWithFile({ prompt, file }: TextMessageEvent) {
    if (!file) return;
    const text = prompt ?? file.name ?? 'Traduce la imagen';
    this.isLoading.set(true);

    this.messages.update(prev => [...prev, { isGpt: false, text }])
    this.openAiService.imageToText(file, text).subscribe(message => {
      this.isLoading.set(false);
      this.messages.update(prev => [...prev, { isGpt: true, text: message! }])
    });

  }
}
