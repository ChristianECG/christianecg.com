import { apiResponse, SITE } from './_json';

const ENDPOINTS = [
  { path: '/api/profile.json', description: 'Who I am: role, location, links, CVs in three languages.' },
  { path: '/api/timeline.json', description: 'Career milestones from 2018 to today, curated and trilingual.' },
  { path: '/api/talks.json', description: 'Talks, keynotes, mentorships, and media appearances.' },
  { path: '/api/papers.json', description: 'Published academic papers (IEEE Xplore, REINGTEC).' },
  { path: '/api/projects.json', description: 'Side projects and products, with stack tags and case studies.' },
  { path: '/api/articles.json', description: 'Blog articles: local archive plus the octa.page feed.' },
  { path: '/api/press.json', description: 'Press kits, downloadable assets, and media mentions.' },
];

export function GET() {
  return apiResponse(
    '/api/index.json',
    ENDPOINTS.map((e) => ({ ...e, url: `${SITE}${e.path}` }))
  );
}
