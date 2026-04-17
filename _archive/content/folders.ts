import type { FolderId, NotecardFormat } from './types';

export interface FolderDefinition {
  id: FolderId;
  label: string;
  shortLabel: string;
  tabColor: string; // hex, from the calendar category palette
  tabColorClass: string; // Tailwind bg class
  projectType: 'type1-build' | 'type2-learning' | 'type3-practice' | null;
  projectTypeLabel: string | null;
  slotNumber: number | null;
  isProject: boolean;
}

export const FOLDER_DEFINITIONS: FolderDefinition[] = [
  {
    id: 'portfolio',
    label: 'Portfolio',
    shortLabel: 'portfolio',
    tabColor: '#3F51B5',
    tabColorClass: 'bg-[#3F51B5]',
    projectType: 'type1-build',
    projectTypeLabel: 'type 1 — build',
    slotNumber: 1,
    isProject: true,
  },
  {
    id: 'field-guide',
    label: 'Field Guide',
    shortLabel: 'field guide',
    tabColor: '#0B8043',
    tabColorClass: 'bg-[#0B8043]',
    projectType: 'type1-build',
    projectTypeLabel: 'type 1 — build',
    slotNumber: 2,
    isProject: true,
  },
  {
    id: 'curriculum',
    label: 'Curriculum Tracker',
    shortLabel: 'curriculum',
    tabColor: '#33B679',
    tabColorClass: 'bg-[#33B679]',
    projectType: 'type1-build',
    projectTypeLabel: 'type 1 — build',
    slotNumber: 3,
    isProject: true,
  },
  {
    id: 'capture',
    label: 'Capture Stack',
    shortLabel: 'capture',
    tabColor: '#616161',
    tabColorClass: 'bg-[#616161]',
    projectType: null,
    projectTypeLabel: null,
    slotNumber: null,
    isProject: false,
  },
  {
    id: 'archive',
    label: 'Archive',
    shortLabel: 'archive',
    tabColor: '#ACACAC',
    tabColorClass: 'bg-[#ACACAC]',
    projectType: null,
    projectTypeLabel: null,
    slotNumber: null,
    isProject: false,
  },
];

export const PROJECT_FOLDERS = FOLDER_DEFINITIONS.filter((f) => f.isProject);
export const MAX_ACTIVE_SLOTS = 3;

export const FORMAT_COLORS: Record<NotecardFormat, string> = {
  fragment: '#616161',  // graphite — neutral, unprocessed
  question: '#039BE5',  // peacock — exploratory, open
  reference: '#8E24AA', // grape — curated, intentional
  map: '#0B8043',       // basil — structural, grounding
  research: '#3F51B5',  // blueberry — deep work
};

export const FORMAT_LABELS: Record<NotecardFormat, string> = {
  fragment: 'fragment',
  question: 'question',
  reference: 'reference',
  map: 'map',
  research: 'research',
};

export const FORMAT_DESCRIPTIONS: Record<NotecardFormat, string> = {
  fragment: 'observation, image, half-formed thought',
  question: 'something to investigate or return to',
  reference: 'something to cite or return to',
  map: 'spatial or structural representation',
  research: 'specific research for an active project',
};

export function getFolderById(id: FolderId): FolderDefinition | undefined {
  return FOLDER_DEFINITIONS.find((f) => f.id === id);
}
