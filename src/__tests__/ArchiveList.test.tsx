/// <reference types="vitest/globals" />

import { render, screen } from '@testing-library/react';
import { ArchiveList } from '../components/ArchiveList';
import type { ArchiveItem } from '../types/archive';

const mockItems: ArchiveItem[] = [
    { id: '1', title: 'Test', dateCreated: '2020-01-01', subjectTags: [], metadata: {}, rightsStatement: 'Public', isRestricted: false },
    { id: '2', title: 'Restricted', dateCreated: '2020-01-02', subjectTags: [], metadata: {}, rightsStatement: 'Embargoed', isRestricted: true }
];

describe('ArchiveList Component', () => {
    it('should render the item count', () => {
        render(<ArchiveList items={mockItems} />);
        expect(screen.getByText(/displaying 2 archive items/i)).toBeTruthy();
    });

    it('should display restricted notice', () => {
        render(<ArchiveList items={mockItems} />);
        expect(screen.getByText(/restricted access:/i)).toBeTruthy();
    });

    it('should display error in alert role', () => {
        render(<ArchiveList items={[]} error="Network failure" />);
        expect(screen.getByRole('alert')).toBeTruthy();
    });
});