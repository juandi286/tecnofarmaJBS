'use server';
import { sugerirReposicion as flujoSugerirReposicion, type SugerirReposicionInput, type SugerirReposicionOutput } from '@/ai/flows/sugerir-reposicion';

export async function obtenerSugerenciaReposicion(input: SugerirReposicionInput): Promise<SugerirReposicionOutput> {
  try {
    // Añadir un pequeño retraso para simular la latencia de red y mejorar la experiencia de usuario
    await new Promise(resolve => setTimeout(resolve, 1000));
    const suggestion = await flujoSugerirReposicion(input);
    return suggestion;
  } catch (error) {
    console.error("Error al obtener la sugerencia de reposición:", error);
    if (error instanceof Error) {
        throw new Error(`Falló la obtención de sugerencia de reposición: ${error.message}`);
    }
    throw new Error("Ocurrió un error desconocido al obtener la sugerencia de reposición.");
  }
}
