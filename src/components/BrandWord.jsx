export function BrandWord({ className = "", isDark = true }) {
    const letters = ["U", "s", "e", "H", "u", "b"];

    return (
        <span className={`usehub-brand-word ${isDark ? "usehub-brand-word--dark" : "usehub-brand-word--light"} ${className}`} aria-label="UseHub">
            {letters.map((letter, index) => (
                <span
                    key={`${letter}-${index}`}
                    className="usehub-brand-word__letter"
                    style={{ "--letter-index": index }}
                    aria-hidden="true"
                >
                    {letter}
                </span>
            ))}
        </span>
    );
}
