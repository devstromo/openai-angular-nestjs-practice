import { environment } from "environments/environment.development";

type GenerateImage = Image | null;

interface Image {
    url: string,
    alt: string,
}


export const imageGenerationUseCase = async (
    prompt: string,
    originalImage?: string,
    maskImage?: string,
): Promise<GenerateImage> => {
    try {
        const response = await fetch(`${environment.backendApi}/image-generation`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                prompt,
                originalImage,
                maskImage,
            }),
        });
        const { url, revised_response: alt } = await response.json();
        return { url, alt };

    } catch (error) {
        console.log(error);
        return null;

    }
}