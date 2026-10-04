import { useState, useEffect } from 'react';
import { ArchiveList } from './components/ArchiveList';
import type { ArchiveItem } from './types/archive';

function App() {
  const [items, setItems] = useState<ArchiveItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArchiveData = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) throw new Error('Failed to fetch archive data');
        const data: ArchiveItem[] = await response.json();
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    fetchArchiveData();
  }, []);

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <ArchiveList items={items} isLoading={isLoading} error={error} />
    </main>
  );
}

export default App;
