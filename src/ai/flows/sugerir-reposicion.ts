'use server';

/**
 * @fileOverview Un agente de IA para sugerir la reposición de productos.
 *
 * - sugerirReposicion - Una función que sugiere cantidades de reposición para productos.
 * - SugerirReposicionInput - El tipo de entrada para la función sugerirReposicion.
 * - SugerirReposicionOutput - El tipo de retorno para la función sugerirReposicion.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SugerirReposicionInputSchema = z.object({
  nombreProducto: z.string().describe('El nombre del producto.'),
  stockActual: z.number().describe('El nivel de stock actual del producto.'),
  stockMinimo: z.number().describe('El nivel de stock mínimo del producto.'),
  ventasDiariasPromedio: z.number().describe('Las ventas diarias promedio del producto.'),
  cicloReposicionDias: z.number().describe('El ciclo de reposición en días.'),
});
export type SugerirReposicionInput = z.infer<typeof SugerirReposicionInputSchema>;

const SugerirReposicionOutputSchema = z.object({
  cantidadSugerida: z.number().describe('La cantidad de reposición sugerida para el producto.'),
  razonamiento: z.string().describe('El razonamiento detrás de la cantidad de reposición sugerida.'),
});
export type SugerirReposicionOutput = z.infer<typeof SugerirReposicionOutputSchema>;

export async function sugerirReposicion(input: SugerirReposicionInput): Promise<SugerirReposicionOutput> {
  return flujoSugerirReposicion(input);
}

const promptSugerirReposicion = ai.definePrompt({
  name: 'promptSugerirReposicion',
  input: {schema: SugerirReposicionInputSchema},
  output: {schema: SugerirReposicionOutputSchema},
  prompt: `Eres un experto en gestión de inventario de farmacia.

Analizarás los niveles de stock del producto y sugerirás cantidades óptimas de reposición para evitar roturas de stock y minimizar el exceso de inventario.

Considera los siguientes factores:
- Nivel de stock actual: {{{stockActual}}}
- Nivel de stock mínimo: {{{stockMinimo}}}
- Ventas diarias promedio: {{{ventasDiariasPromedio}}}
- Ciclo de reposición (en días): {{{cicloReposicionDias}}}
- Nombre del producto: {{{nombreProducto}}}

Sugiere una cantidad de reposición y explica tu razonamiento.
`,
});

const flujoSugerirReposicion = ai.defineFlow(
  {
    name: 'flujoSugerirReposicion',
    inputSchema: SugerirReposicionInputSchema,
    outputSchema: SugerirReposicionOutputSchema,
  },
  async input => {
    const {output} = await promptSugerirReposicion(input);
    return output!;
  }
);
