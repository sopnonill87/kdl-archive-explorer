/**
 * Represents a digital heritage archive item.
 * Modelled with flexibility for unpredictable research metadata
 * while enforcing strict typing for core discovery fields.
 */
export interface ArchiveItem {
    id: string;
    title: string;
    creator?: string;
    dateCreated: string; // ISO 8601 string
    subjectTags: string[];
    // Extensible schema for unknown/evolving research data
    metadata: Record<string, string | number | boolean>;
    rightsStatement: string;
    isRestricted: boolean;
}

/**
 * Props for the ArchiveList component
 */
export interface ArchiveListProps {
    items: ArchiveItem[];
    isLoading?: boolean;
    error?: string | null;
}