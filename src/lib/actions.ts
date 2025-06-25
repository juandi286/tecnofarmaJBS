'use server';
import type { SugerirReposicionInput, SugerirReposicionOutput } from '@/lib/types';

export async function obtenerSugerenciaReposicion(input: SugerirReposicionInput): Promise<SugerirReposicionOutput> {
  try {
    // Añadir un pequeño retraso para simular la latencia y mejorar la experiencia de usuario
    await new Promise(resolve => setTimeout(resolve, 500));

    // Lógica de cálculo simple para la sugerencia
    const { stockActual, stockMinimo, ventasDiariasPromedio, cicloReposicionDias } = input;
    
    // Calcula el stock de seguridad (lo que necesitas tener mientras llega el nuevo pedido)
    const stockDeSeguridad = ventasDiariasPromedio * cicloReposicionDias;
    
    // Calcula cuánto necesitas en total para estar cubierto
    const stockObjetivo = stockMinimo + stockDeSeguridad;
    
    // La cantidad a pedir es la diferencia entre lo que necesitas y lo que tienes
    let cantidadAPedir = stockObjetivo - stockActual;

    // Si el cálculo es negativo (tienes stock de más), no sugieras pedir nada.
    if (cantidadAPedir < 0) {
      cantidadAPedir = 0;
    }
    
    const cantidadSugerida = Math.ceil(cantidadAPedir); // Redondea hacia arriba para no quedarte corto.

    const razonamiento = `Se necesitan ${stockMinimo} unidades como mínimo y ${stockDeSeguridad} para cubrir ${cicloReposicionDias} días de venta. Total objetivo: ${stockObjetivo}. Con ${stockActual} unidades actuales, se sugiere pedir ${cantidadSugerida}.`;

    const suggestion: SugerirReposicionOutput = {
      cantidadSugerida,
      razonamiento,
    };
    
    return suggestion;

  } catch (error) {
    console.error("Error al obtener la sugerencia de reposición:", error);
    if (error instanceof Error) {
        throw new Error(`Falló la obtención de sugerencia de reposición: ${error.message}`);
    }
    throw new Error("Ocurrió un error desconocido al obtener la sugerencia de reposición.");
  }
}
