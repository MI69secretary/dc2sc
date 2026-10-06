import fs from 'node:fs';
import path from 'node:path';

export interface EditorialCalendarEvent {
  eventId: string;
  title: string;
  eventType: 'canonical_milestone' | 'editorial_review' | 'site_publication' | 'media_republication' | 'revision_audit';
  scheduledDate: string;
  targetArtifactId?: string;
  channel: 'dc2sc_site' | 'medium' | 'substack' | 'linkedin' | 'x' | 'internal_archive';
  status: 'scheduled' | 'in_progress' | 'completed' | 'postponed' | 'cancelled';
  description?: string;
  isFixture?: boolean;
  visibility?: 'public' | 'internal' | 'unlisted' | 'public_preview';
  indexable?: boolean;
  publicationAuthority?: 'none' | 'internal_review' | 'release_approved' | 'canonical_seal';
}

export function getAllCalendarEvents(baseDir: string = process.cwd()): EditorialCalendarEvent[] {
  const calDir = path.resolve(baseDir, 'src/data/calendar');
  if (!fs.existsSync(calDir)) return [];

  const files = fs.readdirSync(calDir).filter(f => f.endsWith('.json'));
  const events: EditorialCalendarEvent[] = [];

  for (const f of files) {
    try {
      const raw = fs.readFileSync(path.join(calDir, f), 'utf8');
      const data = JSON.parse(raw) as EditorialCalendarEvent;
      events.push(data);
    } catch (e) {
      console.error(`Failed to read calendar event file ${f}:`, e);
    }
  }

  return events.sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());
}

export function generateICalendarFeed(events: EditorialCalendarEvent[], domain: string = 'https://dc2sc.org'): string {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//DC2SC Research Program//Editorial Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:DC2SC Editorial & Publication Schedule',
    'X-WR-TIMEZONE:UTC',
    'X-WR-CALDESC:DC2SC research canonical milestones, media republications, and revision audits.',
  ];

  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  for (const evt of events) {
    if (evt.visibility === 'internal') continue; // only expose public/preview in public feed

    const cleanDate = evt.scheduledDate.replace(/-/g, '');
    const uid = `${evt.eventId}@dc2sc.org`;
    const summary = `[DC2SC ${evt.channel.toUpperCase()}] ${evt.title}`;
    const description = `${evt.description || ''}\\nType: ${evt.eventType}\\nTarget: ${evt.targetArtifactId || 'N/A'}\\nStatus: ${evt.status}`;

    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${uid}`);
    lines.push(`DTSTAMP:${now}`);
    lines.push(`DTSTART;VALUE=DATE:${cleanDate}`);
    lines.push(`DTEND;VALUE=DATE:${cleanDate}`);
    lines.push(`SUMMARY:${summary.replace(/\n/g, ' ')}`);
    lines.push(`DESCRIPTION:${description.replace(/\n/g, '\\n')}`);
    lines.push(`STATUS:${evt.status === 'completed' ? 'CONFIRMED' : evt.status === 'cancelled' ? 'CANCELLED' : 'TENTATIVE'}`);
    lines.push(`CATEGORIES:${evt.eventType.toUpperCase()}`);
    lines.push(`URL:${domain}/editorial-calendar`);
    lines.push('END:VEVENT');
  }

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}
