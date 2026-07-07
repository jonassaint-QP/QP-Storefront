'use client';

import { useState } from 'react';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'] as const;
type Size = (typeof SIZES)[number];

export default function SizeSelector({
  onSelect,
}: {
  onSelect: (size: Size | null) => void;
}) {
  const [selected, setSelected] = useState<Size | null>(null);

  function pick(size: Size) {
    const next = selected === size ? null : size;
    setSelected(next);
    onSelect(next);
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-mono uppercase tracking-widest text-zinc-600">
        Size{selected ? <span className="text-zinc-300 ml-2 normal-case tracking-normal">— {selected}</span> : null}
      </p>
      <div className="flex flex-wrap gap-2">
        {SIZES.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => pick(size)}
            aria-label={`Size ${size}${selected === size ? ', selected' : ''}`}
            className={[
              'h-9 px-4 text-xs font-mono font-bold uppercase tracking-widest border transition-colors',
              selected === size
                ? 'border-white bg-white text-black'
                : 'border-zinc-800 text-zinc-500 hover:border-zinc-500 hover:text-zinc-200',
            ].join(' ')}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
