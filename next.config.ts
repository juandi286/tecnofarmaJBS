import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /**
   * Habilita la exportación estática para compatibilidad con GitHub Pages.
   * Esto genera archivos HTML/CSS/JS puros en la carpeta `out`.
   */
  output: 'export',
  
  /**
   * Define la ruta base del proyecto en GitHub Pages.
   * Debe coincidir con el nombre de tu repositorio.
   */
  basePath: '/tecnofarmaJBS',
  
  /**
   * Desactiva la optimización de imágenes de Next.js, ya que no está
   * disponible en un entorno de hosting estático como GitHub Pages.
   */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
