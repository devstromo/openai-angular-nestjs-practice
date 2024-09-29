import { Injectable } from '@angular/core';
import { orthographyUserCase, prosConsDiscusserUseCase } from '@use-cases/index';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OpenAiService {
    checkOrthography(prompt: string) {
        return from(orthographyUserCase(prompt));
    }

    prosConsDiscusser(prompt: string) {
        return from(prosConsDiscusserUseCase(prompt));
    }
}