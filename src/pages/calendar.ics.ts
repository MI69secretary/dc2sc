import type { APIRoute } from 'astro';
import { getAllCalendarEvents, generateICalendarFeed } from '../data/calendar';

export const prerender = true;

export const GET: APIRoute = async () => {
  const events = getAllCalendarEvents();
  const icsContent = generateICalendarFeed(events, 'https://dc2sc.org');

  return new Response(icsContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'inline; filename="dc2sc-editorial-calendar.ics"',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
