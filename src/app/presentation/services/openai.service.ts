import { Injectable } from '@angular/core';
import { orthographyUserCase, prosConsDiscusserUseCase, prosConsStreamUseCase } from '@use-cases/index';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OpenAiService {
    checkOrthography(prompt: string) {
        return from(orthographyUserCase(prompt));
    }

    prosConsDiscusser(prompt: string) {
        return from(prosConsDiscusserUseCase(prompt));
    }
    prosConsStream(prompt: string) {
        return prosConsStreamUseCase(prompt);
    }
}