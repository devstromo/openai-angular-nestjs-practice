import { Injectable } from '@angular/core';
import { orthographyUserCase, prosConsDiscusserUseCase, prosConsStreamUseCase, textToAudioUseCase, translateTextUseCase } from '@use-cases/index';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OpenAiService {
    checkOrthography(prompt: string) {
        return from(orthographyUserCase(prompt));
    }

    prosConsDiscusser(prompt: string) {
        return from(prosConsDiscusserUseCase(prompt));
    }
    prosConsStream(prompt: string, abortSignal: AbortSignal) {
        return prosConsStreamUseCase(prompt, abortSignal);
    }

    translateText(prompt: string, lang: string) {
        return from(translateTextUseCase(prompt, lang));
    }

    textToAudio(prompt: string, voice: string) {
        return from(textToAudioUseCase(prompt, voice));
    }
}