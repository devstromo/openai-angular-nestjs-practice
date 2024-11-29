import { environment } from "environments/environment.development";

export const createThreadUseCase = async (prompt: string) => {
    try {
        const resp = await fetch(
            `${environment.assistantApi}/create-thread`,
            {
                method: 'POST',
            }
        );
        if (!resp.ok) {
            throw new Error('No se pudo crear el hilo');
        }

        const { id } = await resp.json() as { id: string };
        return id;

    } catch (error) {
        console.log(error);
        throw new Error('No se pudo crear el hilo');
    }
}  