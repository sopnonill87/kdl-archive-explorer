import type { ArchiveListProps } from '../types/archive';


export function ArchiveList({ items, isLoading = false, error = null }: ArchiveListProps) {
    if (error) {
        return (
            <div role="alert" className="archive-error">
                <h2>Error loading archive</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <section aria-labelledby="archive-heading" className="archive-list">
            <h2 id="archive-heading">Heritage Archive Collection</h2>

            {/* Live region announces loading state to screen readers */}
            <div aria-live="polite" aria-atomic="true" className="archive-status">
                {isLoading && <p>Loading archive items...</p>}
                {!isLoading && items.length === 0 && <p>No archive items found.</p>}
                {!isLoading && items.length > 0 && (
                    <p>Displaying {items.length} archive {items.length === 1 ? 'item' : 'items'}.</p>
                )}
            </div>

            {!isLoading && items.length > 0 && (
                <ul className="archive-items" role="list">
                    {items.map((item) => (
                        <li key={item.id}>
                            <article className="archive-item" aria-labelledby={`item-title-${item.id}`}>
                                <h3 id={`item-title-${item.id}`}>{item.title}</h3>

                                <dl className="archive-metadata">
                                    {item.creator && (
                                        <>
                                            <dt>Creator</dt>
                                            <dd>{item.creator}</dd>
                                        </>
                                    )}

                                    <dt>Date Created</dt>
                                    <dd>
                                        <time dateTime={item.dateCreated}>
                                            {new Date(item.dateCreated).toLocaleDateString('en-GB', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </time>
                                    </dd>

                                    {item.subjectTags.length > 0 && (
                                        <>
                                            <dt>Subjects</dt>
                                            <dd>
                                                <ul className="tag-list" role="list">
                                                    {item.subjectTags.map((tag) => (
                                                        <li key={tag} className="tag">{tag}</li>
                                                    ))}
                                                </ul>
                                            </dd>
                                        </>
                                    )}
                                </dl>

                                {item.isRestricted ? (
                                    <p className="rights-notice" role="status">
                                        <strong>Restricted Access:</strong> {item.rightsStatement}
                                    </p>
                                ) : (
                                    <p className="rights-notice">
                                        <strong>Rights:</strong> {item.rightsStatement}
                                    </p>
                                )}
                            </article>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}