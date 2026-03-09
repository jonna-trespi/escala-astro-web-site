import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.escala24x7.com',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'pt'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [sitemap()],
  redirects: {
    // Redirecciones 301 según matriz SEO Escala 24x7 (Key Message + legacy)
    // Soluciones - Adopción de Nube
    '/cloud-foundations-onboarding': '/soluciones/cloud-migration',
    '/cloud-emx': '/soluciones/managed-services',
    '/ibm-on-net-con-aws': '/soluciones/cloud-migration',
    '/aws-app-centric': '/soluciones/managed-services',
    '/automatizacion-de-operaciones-en-aws': '/soluciones/managed-services',
    // Soluciones - Migración, Seguridad, Datos, IA, DevOps, etc.
    '/servicios-de-migracion-y-modernizacion': '/soluciones/cloud-migration',
    '/soluciones-de-seguridad': '/soluciones/cloud-security',
    '/soluciones-de-analisis-de-datos': '/soluciones/data-management',
    '/soluciones-de-inteligencia-artificial': '/soluciones/ai-solutions',
    '/herramientas-devops': '/soluciones/cloud-migration',
    '/well-architected-reviews': '/soluciones/cloud-migration',
    '/optimizacion-de-licenciamiento': '/soluciones/cloud-migration',
    '/orbis-action': '/soluciones/managed-services',
    '/finops-consultancy': '/industrias/finanzas',
    // Industrias
    '/finanzas': '/industrias/finanzas',
    '/energia': '/industrias/energia',
    '/manufactura': '/industrias/manufactura',
    '/hospitalidad': '/industrias/viajes-hosteleria',
    // Quiénes somos
    '/nuestro-equipo': '/sobre-nosotros',
    '/nuestra-experiencia': '/aws-especializaciones',
    '/nuestras-alianzas': '/partnerships',
    '/isg-provider-lens': '/sobre-nosotros',
    '/nuestro-compromiso-con-el-medio-ambiente': '/sobre-nosotros',
    // Especializaciones AWS (destino: aws-especializaciones)
    '/migraciones': '/aws-especializaciones',
    '/digital-workplaces': '/aws-especializaciones',
    '/sap-on-aws': '/aws-especializaciones',
    '/devops': '/aws-especializaciones',
    '/security': '/aws-especializaciones',
    '/public-safety-and-disaster-response': '/aws-especializaciones',
    '/monitoreo': '/aws-especializaciones',
    '/data-analysis-competition': '/aws-especializaciones',
    '/aws-cloud-operations': '/aws-especializaciones',
    '/resiliencia': '/aws-especializaciones',
    '/smb': '/aws-especializaciones',
    '/ia-generativa': '/aws-especializaciones',
    // Legacy adicionales (mantenidos para URLs ya configuradas)
    '/assessments-de-seguridad': '/soluciones/cloud-security',
    '/aws-cloud-operation': '/aws-especializaciones',
    '/aws-cloud-operations-en': '/en/aws-especializaciones',
    '/consultoria-de-optimizacion-de-costos': '/soluciones/managed-services',
    '/devops-competency': '/aws-especializaciones',
    '/ingenieria-de-datos': '/soluciones/data-management',
    '/monitoring': '/soluciones/managed-services',
    '/security-competency': '/soluciones/cloud-security',
  },
});

