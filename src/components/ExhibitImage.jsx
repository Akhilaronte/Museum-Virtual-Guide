import { useEffect, useState } from 'react'

// Renders an exhibit's local SVG image with a graceful fallback placeholder.
// All assets are local (no network required), and an onError handler swaps
// to a shared placeholder if a file is ever missing.
const PLACEHOLDER = `${import.meta.env.BASE_URL}assets/exhibits/placeholder.svg`

export default function ExhibitImage({ exhibit, alt, className, loading = 'lazy' }) {
  const initialSrc = `${import.meta.env.BASE_URL}assets/exhibits/${exhibit.image}.svg`
  const [src, setSrc] = useState(initialSrc)

  // Reset to the correct image when navigating between different exhibits.
  useEffect(() => {
    setSrc(initialSrc)
  }, [initialSrc])

  function handleError() {
    // Swap to the placeholder once; avoid an infinite loop if it is also missing.
    setSrc((current) => (current !== PLACEHOLDER ? PLACEHOLDER : current))
  }

  return (
    <img
      src={src}
      alt={alt || exhibit.name}
      className={className}
      loading={loading}
      decoding="async"
      onError={handleError}
    />
  )
}
