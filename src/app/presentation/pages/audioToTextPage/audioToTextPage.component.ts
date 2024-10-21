import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageEvent } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';
import { TextMessageBoxFileComponent } from "../../components/text-boxes/textMessageBoxFile/textMessageBoxFile.component";
import { AudioToTextResponse } from '@interfaces/audio-to-text.response';
import { Segment } from '../../../interfaces/audio-to-text.response';

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
  public openAiService = inject(OpenAiService);

  handleMessage(prompt: string) {
    console.log({ prompt });

  }
  handleMessageWithFile({ prompt, file }: TextMessageEvent) {
    const text = prompt ?? file.name ?? 'Traduce el audio';
    this.isLoading.set(true);

    this.messages.update(prev => [...prev, { isGpt: false, text }])
    this.openAiService.audioToText(file, text)
      .subscribe(resp => this.handleResponse(resp));
  }

  handleResponse(response: AudioToTextResponse | null) {
    this.isLoading.set(false)
    if (!response) return;
    const text = `## Transcipción:
    __Duración:__ ${Math.round(response.duration)} segundos
    ## El texto es:
    ${response.text}
    `;
    this.messages.update(prev => [...prev, { isGpt: true, text: text }])

    for (const segment of response.segments) {
      const segmentMessage = `
__De ${Math.round(segment.start)} a ${Math.round(segment.end)} segundos.__
${segment.text}
      `
      this.messages.update(prev => [...prev, { isGpt: true, text: segmentMessage }])
    }
  }
}
