import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export interface DiscoveryManifestItem {
  id: string;
  slug: string;
  route: string;
  url: string;
  title: string;
  contentKind: string;
  canonicalState: string;
  lifecycleStatus: string;
  visibility: string;
  claimState: string;
  researchRole: string;
  evidenceLevel: string;
  indexable: boolean;
  scopeLabel: string;
  topics?: string[];
  dek?: string;
}

export const GET: APIRoute = async () => {
  const [journalEntries, researchEntries, goliafEntries] = await Promise.all([
    getCollection('journal', ({ data }) =>
      data.indexable === true &&
      data.visibility === 'public' &&
      data.lifecycleStatus === 'published'
    ),
    getCollection('research', ({ data }) =>
      data.indexable === true &&
      data.visibility === 'public' &&
      data.lifecycleStatus !== 'paused' &&
      data.lifecycleStatus !== 'draft' &&
      data.lifecycleStatus !== 'in_review' &&
      data.lifecycleStatus !== 'archived'
    ),
    getCollection('goliaf', ({ data }) =>
      data.indexable === true &&
      data.visibility === 'public' &&
      data.lifecycleStatus !== 'paused' &&
      data.lifecycleStatus !== 'draft' &&
      data.lifecycleStatus !== 'in_review' &&
      data.lifecycleStatus !== 'archived'
    ),
  ]);

  const formatScopeLabel = (kind: string, state: string, role: string) => {
    if (kind === 'canonical_reference') return 'Canonical reference';
    if (kind === 'canonical_module') return 'Canonical module';
    if (kind === 'research_spec') return 'Research specification';
    if (kind === 'goliaf_artifact') return 'GOLIAF stress-test artifact';
    if (kind === 'editorial_preview') return 'Editorial preview';
    if (kind === 'editorial_article') return 'Journal essay';
    return role.replace(/_/g, ' ');
  };

  const manifest: DiscoveryManifestItem[] = [
    ...journalEntries.map(e => ({
      id: e.id,
      slug: e.id,
      route: `/journal/${e.id}`,
      url: `/journal/${e.id}`,
      title: e.data.title,
      dek: e.data.dek,
      topics: e.data.topics,
      contentKind: e.data.contentKind,
      canonicalState: e.data.canonicalState,
      lifecycleStatus: e.data.lifecycleStatus,
      visibility: e.data.visibility,
      claimState: e.data.claimState,
      researchRole: e.data.researchRole,
      evidenceLevel: e.data.evidenceLevel,
      indexable: e.data.indexable,
      scopeLabel: formatScopeLabel(e.data.contentKind, e.data.canonicalState, e.data.researchRole),
    })),
    ...researchEntries.map(e => ({
      id: e.id,
      slug: e.id,
      route: `/research/${e.id}`,
      url: `/research/${e.id}`,
      title: e.data.title,
      dek: e.data.scope,
      contentKind: e.data.contentKind,
      canonicalState: e.data.canonicalState,
      lifecycleStatus: e.data.lifecycleStatus,
      visibility: e.data.visibility,
      claimState: e.data.claimState,
      researchRole: e.data.researchRole,
      evidenceLevel: e.data.evidenceLevel,
      indexable: e.data.indexable,
      scopeLabel: formatScopeLabel(e.data.contentKind, e.data.canonicalState, e.data.researchRole),
    })),
    ...goliafEntries.map(e => ({
      id: e.id,
      slug: e.id,
      route: `/goliaf/${e.id}`,
      url: `/goliaf/${e.id}`,
      title: e.data.title,
      dek: e.data.scope,
      contentKind: e.data.contentKind,
      canonicalState: e.data.canonicalState,
      lifecycleStatus: e.data.lifecycleStatus,
      visibility: e.data.visibility,
      claimState: e.data.claimState,
      researchRole: e.data.researchRole,
      evidenceLevel: e.data.evidenceLevel,
      indexable: e.data.indexable,
      scopeLabel: formatScopeLabel(e.data.contentKind, e.data.canonicalState, e.data.researchRole),
    })),
  ];

  return new Response(JSON.stringify(manifest), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
