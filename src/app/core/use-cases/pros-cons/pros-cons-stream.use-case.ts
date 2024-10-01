import { environment } from "environments/environment.development";

export async function* prosConsStreamUseCase(prompt: string) {
    try {
        const resp = await fetch(
            `${environment.backendApi}/pros-cons-discusser-stream`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            }
        );
        if (!resp.ok) {
            throw new Error('No se pudo realizar la comparación');
        }

        const reader = resp.body?.getReader();
        if (!reader) {
            throw new Error('No se pudo generar el reader');
        }

        const decoder = new TextDecoder();
        let text = '';
        while (true) {
            const { value, done } = await reader.read();

            if (done) {
                break;
            }

            const decodeChunk = decoder.decode(value, { stream: true });

            text += decodeChunk;

            yield text;
        }

        return text;
    } catch (error) {
        return null;
    }
}