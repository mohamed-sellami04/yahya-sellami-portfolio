import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, Cpu, Image, PanelsTopLeft, Smartphone, X } from 'lucide-react';
import { bluebox } from '../data/portfolio';
import { assetUrl } from '../lib/utils';
import { useLanguage } from '../i18n';

function Screenshot({ shot, items, index, onOpen }) {
  const { t } = useLanguage();
  const [failed, setFailed] = useState(false);

  return <figure className="screenshot-card">
    {failed
      ? <div className="image-error"><Image size={25} /><p>{t('Image unavailable')}</p></div>
      : <button type="button" className="screenshot-open" onClick={event => onOpen(items, index, event)} aria-label={`${t('Open screenshot:')} ${t(shot.caption)}`}>
        <img src={assetUrl(shot.src)} alt={t(shot.alt)} loading="lazy" width="1200" height="800" onError={() => setFailed(true)} />
      </button>}
    <figcaption>{t(shot.caption)}</figcaption>
  </figure>;
}

export default function ProjectGallery({ screenshots = null, projectName = 'BlueBox', galleryClass = '', featuredScreenshot = null, architectureOnly = false, includeArchitecture = true }) {
  const { t } = useLanguage();
  const [showAlbum, setShowAlbum] = useState(false);
  const [showMobileAlbum, setShowMobileAlbum] = useState(false);
  const [viewer, setViewer] = useState(null);
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);
  const viewerIsOpen = Boolean(viewer);
  const architectureDiagrams = bluebox.architectureDiagrams || [];
  const embeddedScreenshots = bluebox.embeddedScreenshots || [];
  const mobileScreenshots = bluebox.mobileScreenshots || [];
  const isCustomGallery = screenshots !== null;
  const productScreenshots = featuredScreenshot ? [featuredScreenshot, ...bluebox.screenshots] : bluebox.screenshots;

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
    {isCustomGallery && screenshots.length > 0 && <div className="gallery-subsection">
      <div className="gallery-subsection-heading"><h5>{t('Application screens')} · {projectName}</h5><p>{t('Browse selected application screens for')} {projectName}.</p></div>
      <div className={`project-gallery secome-gallery-grid ${galleryClass}`}>
        {screenshots.map((shot, index) => <Screenshot key={shot.src} shot={shot} items={screenshots} index={index} onOpen={openViewer} />)}
      </div>
    </div>}

    {!isCustomGallery && !architectureOnly && featuredScreenshot && <div className="gallery-subsection bluebox-featured-image">
      <Screenshot shot={featuredScreenshot} items={productScreenshots} index={0} onOpen={openViewer} />
    </div>}

    {!isCustomGallery && (architectureOnly || includeArchitecture) && architectureDiagrams.length > 0 && <div className="gallery-subsection">
      <div className="gallery-subsection-heading"><h5>{t('System flows and architecture')}</h5><p>{t('Visual guides to Wi-Fi setup, controller synchronization, and firmware updates.')}</p></div>
      <div className="project-gallery architecture-gallery-grid">
        {architectureDiagrams.map((shot, index) => <Screenshot key={shot.src} shot={shot} items={architectureDiagrams} index={index} onOpen={openViewer} />)}
      </div>
    </div>}

    {!isCustomGallery && !architectureOnly && bluebox.screenshots.length > 0 && <div className="gallery-subsection">
      <div className="gallery-subsection-heading"><h5>{t('Product views')}</h5><p>{t('Controller screen, mobile schedule, and system overview.')}</p></div>
      <div className="project-gallery">
        {bluebox.screenshots.map((shot, index) => <Screenshot key={shot.src} shot={shot} items={productScreenshots} index={index + (featuredScreenshot ? 1 : 0)} onOpen={openViewer} />)}
      </div>
    </div>}

    {!isCustomGallery && !architectureOnly && mobileScreenshots.length > 0 && <div className="embedded-album mobile-album">
      <button type="button" className="album-toggle" aria-expanded={showMobileAlbum} aria-controls="bluebox-mobile-album" onClick={() => setShowMobileAlbum(open => !open)}>
        <span className="album-toggle-label"><Smartphone size={19} aria-hidden="true" /><span>{showMobileAlbum ? t('Hide mobile app screen album') : t('Browse mobile app screen album')}</span></span>
        <span className="album-count">{mobileScreenshots.length} {t('screens')}</span>
      </button>
      <div id="bluebox-mobile-album" className="embedded-album-content" hidden={!showMobileAlbum}>
        {showMobileAlbum && <>
          <div className="embedded-album-heading"><h5>{t('BlueBox mobile app screens')}</h5><p>{t('Sign-in, account setup, password recovery, valve onboarding, and irrigation scheduling.')}</p></div>
          <div className="project-gallery mobile-album-grid">
            {mobileScreenshots.map((shot, index) => <Screenshot key={shot.src} shot={shot} items={mobileScreenshots} index={index} onOpen={openViewer} />)}
          </div>
        </>}
      </div>
    </div>}

    {!isCustomGallery && !architectureOnly && embeddedScreenshots.length > 0 && <div className="embedded-album">
      <button type="button" className="album-toggle" aria-expanded={showAlbum} aria-controls="bluebox-embedded-album" onClick={() => setShowAlbum(open => !open)}>
        <span className="album-toggle-label"><Image size={19} aria-hidden="true" /><span>{showAlbum ? t('Hide embedded screen album') : t('Browse embedded screen album')}</span></span>
        <span className="album-count">{embeddedScreenshots.length} {t('screens')}</span>
      </button>
      <div id="bluebox-embedded-album" className="embedded-album-content" hidden={!showAlbum}>
        {showAlbum && <>
          <div className="embedded-album-heading"><h5>{t('Embedded controller screens')}</h5><p>{t('Select any screen to view it larger. Use the arrow keys or buttons to browse.')}</p></div>
          <div className="project-gallery embedded-album-grid">
            {embeddedScreenshots.map((shot, index) => <Screenshot key={shot.src} shot={shot} items={embeddedScreenshots} index={index} onOpen={openViewer} />)}
          </div>
        </>}
      </div>
    </div>}

    {viewer && createPortal(
      <div className="album-viewer" onClick={() => setViewer(null)}>
        <section className="album-viewer-dialog" role="dialog" aria-modal="true" aria-label={`${projectName} ${t('PROJECT GALLERY')}`} onClick={event => event.stopPropagation()}>
          <div className="album-viewer-header"><span className="mono">{projectName.toUpperCase()} / {t('PROJECT GALLERY')}</span><button type="button" className="album-viewer-close" ref={closeButtonRef} onClick={() => setViewer(null)} aria-label={t('Close image viewer')}><X size={22} /></button></div>
          <div className="album-viewer-stage">
            <button type="button" className="album-viewer-nav" onClick={() => moveViewer(-1)} aria-label={t('Previous screenshot')}><ChevronLeft size={25} /></button>
            <figure className="album-viewer-figure">
              <img src={assetUrl(viewer.shots[viewer.index].src)} alt={t(viewer.shots[viewer.index].alt)} />
              <figcaption><strong>{t(viewer.shots[viewer.index].caption)}</strong><span aria-live="polite">{viewer.index + 1} / {viewer.shots.length}</span></figcaption>
            </figure>
            <button type="button" className="album-viewer-nav" onClick={() => moveViewer(1)} aria-label={t('Next screenshot')}><ChevronRight size={25} /></button>
          </div>
          <p className="album-viewer-hint">{t('Use left/right arrow keys to browse | Esc to close')}</p>
        </section>
      </div>,
      document.body
    )}

    {!isCustomGallery && !bluebox.screenshots.length && !embeddedScreenshots.length && <div className="gallery-placeholders" aria-label={`${bluebox.title} ${t('product images')}`}>
      {[[t('Controller & valves'), Cpu], [t('Mobile application'), Smartphone], [t('Web dashboard'), PanelsTopLeft]].map(([title, GalleryIcon]) => <div className="gallery-placeholder" key={title}><GalleryIcon size={27} aria-hidden="true" /><strong>{title}</strong><span>{t('Product image coming soon')}</span></div>)}
    </div>}
  </>;
}
