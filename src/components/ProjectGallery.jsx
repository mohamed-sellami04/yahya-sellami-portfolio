import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, Cpu, Image, PanelsTopLeft, Smartphone, X } from 'lucide-react';
import { bluebox } from '../data/portfolio';
import { assetUrl } from '../lib/utils';

function Screenshot({ shot, items, index, onOpen }) {
  const [failed, setFailed] = useState(false);

  return <figure className="screenshot-card">
    {failed
      ? <div className="image-error"><Image size={25} /><p>Image unavailable</p></div>
      : <button type="button" className="screenshot-open" onClick={event => onOpen(items, index, event)} aria-label={`Open screenshot: ${shot.caption}`}>
        <img src={assetUrl(shot.src)} alt={shot.alt} loading="lazy" width="1200" height="800" onError={() => setFailed(true)} />
      </button>}
    <figcaption>{shot.caption}</figcaption>
  </figure>;
}

export default function ProjectGallery() {
  const [showAlbum, setShowAlbum] = useState(false);
  const [showMobileAlbum, setShowMobileAlbum] = useState(false);
  const [viewer, setViewer] = useState(null);
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);
  const viewerIsOpen = Boolean(viewer);
  const architectureDiagrams = bluebox.architectureDiagrams || [];
  const embeddedScreenshots = bluebox.embeddedScreenshots || [];
  const mobileScreenshots = bluebox.mobileScreenshots || [];

  useEffect(() => {
    if (!viewerIsOpen) {
      triggerRef.current?.focus();
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setViewer(null);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setViewer(current => current && ({ ...current, index: (current.index - 1 + current.shots.length) % current.shots.length }));
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        setViewer(current => current && ({ ...current, index: (current.index + 1) % current.shots.length }));
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [viewerIsOpen]);

  function openViewer(items, index, event) {
    triggerRef.current = event.currentTarget;
    setViewer({ shots: items, index });
  }

  function moveViewer(offset) {
    setViewer(current => current && ({ ...current, index: (current.index + offset + current.shots.length) % current.shots.length }));
  }

  return <>
    {architectureDiagrams.length > 0 && <div className="gallery-subsection">
      <div className="gallery-subsection-heading"><h5>System flows and architecture</h5><p>Visual guides to Wi-Fi setup, controller synchronization, and firmware updates.</p></div>
      <div className="project-gallery architecture-gallery-grid">
        {architectureDiagrams.map((shot, index) => <Screenshot key={shot.src} shot={shot} items={architectureDiagrams} index={index} onOpen={openViewer} />)}
      </div>
    </div>}

    {bluebox.screenshots.length > 0 && <div className="gallery-subsection">
      <div className="gallery-subsection-heading"><h5>Product views</h5><p>Controller, mobile app, system overview, and irrigation hardware.</p></div>
      <div className="project-gallery">
        {bluebox.screenshots.map((shot, index) => <Screenshot key={shot.src} shot={shot} items={bluebox.screenshots} index={index} onOpen={openViewer} />)}
      </div>
    </div>}

    {mobileScreenshots.length > 0 && <div className="embedded-album mobile-album">
      <button type="button" className="album-toggle" aria-expanded={showMobileAlbum} aria-controls="bluebox-mobile-album" onClick={() => setShowMobileAlbum(open => !open)}>
        <span className="album-toggle-label"><Smartphone size={19} aria-hidden="true" /><span>{showMobileAlbum ? 'Hide mobile app screen album' : 'Browse mobile app screen album'}</span></span>
        <span className="album-count">{mobileScreenshots.length} screens</span>
      </button>
      <div id="bluebox-mobile-album" className="embedded-album-content" hidden={!showMobileAlbum}>
        {showMobileAlbum && <>
          <div className="embedded-album-heading"><h5>BlueBox mobile app screens</h5><p>Sign-in, account setup, password recovery, valve onboarding, and irrigation scheduling.</p></div>
          <div className="project-gallery mobile-album-grid">
            {mobileScreenshots.map((shot, index) => <Screenshot key={shot.src} shot={shot} items={mobileScreenshots} index={index} onOpen={openViewer} />)}
          </div>
        </>}
      </div>
    </div>}

    {embeddedScreenshots.length > 0 && <div className="embedded-album">
      <button type="button" className="album-toggle" aria-expanded={showAlbum} aria-controls="bluebox-embedded-album" onClick={() => setShowAlbum(open => !open)}>
        <span className="album-toggle-label"><Image size={19} aria-hidden="true" /><span>{showAlbum ? 'Hide embedded screen album' : 'Browse embedded screen album'}</span></span>
        <span className="album-count">{embeddedScreenshots.length} screens</span>
      </button>
      <div id="bluebox-embedded-album" className="embedded-album-content" hidden={!showAlbum}>
        {showAlbum && <>
          <div className="embedded-album-heading"><h5>Embedded controller screens</h5><p>Select any screen to view it larger. Use the arrow keys or buttons to browse.</p></div>
          <div className="project-gallery embedded-album-grid">
            {embeddedScreenshots.map((shot, index) => <Screenshot key={shot.src} shot={shot} items={embeddedScreenshots} index={index} onOpen={openViewer} />)}
          </div>
        </>}
      </div>
    </div>}

    {viewer && createPortal(
      <div className="album-viewer" onClick={() => setViewer(null)}>
        <section className="album-viewer-dialog" role="dialog" aria-modal="true" aria-label="BlueBox screenshot viewer" onClick={event => event.stopPropagation()}>
          <div className="album-viewer-header"><span className="mono">BLUEBOX / PROJECT GALLERY</span><button type="button" className="album-viewer-close" ref={closeButtonRef} onClick={() => setViewer(null)} aria-label="Close image viewer"><X size={22} /></button></div>
          <div className="album-viewer-stage">
            <button type="button" className="album-viewer-nav" onClick={() => moveViewer(-1)} aria-label="Previous screenshot"><ChevronLeft size={25} /></button>
            <figure className="album-viewer-figure">
              <img src={assetUrl(viewer.shots[viewer.index].src)} alt={viewer.shots[viewer.index].alt} />
              <figcaption><strong>{viewer.shots[viewer.index].caption}</strong><span aria-live="polite">{viewer.index + 1} / {viewer.shots.length}</span></figcaption>
            </figure>
            <button type="button" className="album-viewer-nav" onClick={() => moveViewer(1)} aria-label="Next screenshot"><ChevronRight size={25} /></button>
          </div>
          <p className="album-viewer-hint">Use left/right arrow keys to browse | Esc to close</p>
        </section>
      </div>,
      document.body
    )}

    {!bluebox.screenshots.length && !embeddedScreenshots.length && <div className="gallery-placeholders" aria-label="BlueBox product images">
      {[['Controller & valves', Cpu], ['Mobile application', Smartphone], ['Web dashboard', PanelsTopLeft]].map(([title, GalleryIcon]) => <div className="gallery-placeholder" key={title}><GalleryIcon size={27} aria-hidden="true" /><strong>{title}</strong><span>Product image coming soon</span></div>)}
    </div>}
  </>;
}
