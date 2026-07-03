import projectsData from '../../data/projects.json';
import { apiResponse, abs } from './_json';

export function GET() {
  return apiResponse(
    '/api/projects.json',
    projectsData.projects.map((p: any) => ({
      slug: p.slug,
      title: p.title,
      description: { es: p.description_es, en: p.description_en, lat: p.description_lat ?? p.description_es },
      tags: p.tags,
      status: p.status,
      url: p.url ?? null,
      github: p.github ?? null,
      case_study: p.caseStudy ? abs(`/es${p.caseStudy}`) : null,
    }))
  );
}
