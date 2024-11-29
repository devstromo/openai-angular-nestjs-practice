import { QuestionResponse } from "@interfaces/question.response";
import { environment } from "environments/environment";


export const postQuestionUseCase = async (threadId: string, question: string) => {
    try {
        const resp = await fetch(
            `${environment.assistantApi}/user-question`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    threadId,
                    question,
                }),
            }
        );
        if (!resp.ok) {
            throw new Error('No se pudo obtener la respuesta');
        }

        const replies = await resp.json() as QuestionResponse[];
        console.log({ replies });
        return replies;
    } catch (error) {
        console.log(error);
        throw new Error('No se pudo obtener la respuesta');
    }
}  