import { ImageToTextResponse } from "@interfaces/image-to-text.response";
import { environment } from "environments/environment.development";

export const imageToTextUseCase = async (imageFile: File, prompt?: string) => {

    try {
        const formData = new FormData();
        formData.append('file', imageFile);
        if (prompt) {
            formData.append('prompt', prompt);
        }
        const resp = await fetch(`${environment.backendApi}/extract-text-from-image`, {
            method: 'POST',
            body: formData,
        })

        if (!resp.ok) {
            throw new Error('No se pudo generar la descripción de la imagen');
        }
        const { msg } = await resp.json() as ImageToTextResponse;
        return msg;
    } catch (error) {
        console.log(error);
        return null;
    }
};