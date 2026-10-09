import { ArrowUpRight } from 'lucide-react';
import { additionalProjects, bluebox } from '../data/portfolio';
import { safeExternalUrl, assetUrl } from '../lib/utils';
import { Icon, Reveal, SectionHeading, Tag } from './ui';
import ProjectAccordion from './ProjectAccordion';
import ProjectGallery from './ProjectGallery';
import SecomeProject from './SecomeProject';
import { useLanguage } from '../i18n';

export default function Projects() {
  const { t } = useLanguage();
  return <section id="projects" className="section section--projects" aria-labelledby="projects-title"><div className="container">
    <Reveal><SectionHeading number="04" eyebrow="SELECTED WORK" title={<span id="projects-title">{t('Code that leaves')}<br /><span className="muted">{t('the screen.')}</span></span>} description={t('Full-stack applications and connected systems built to solve real-world problems.')} /></Reveal>

    <div className="projects-list">
      <Reveal>
        <ProjectAccordion
          title={`${bluebox.title} ${t(bluebox.subtitle)}`}
          company="BlueBox Labs"
          period="Feb 2026 — Jun 2026"
          type={t('Full-stack & IoT internship')}
          description={bluebox.summary}
          logo="images/bluebox/bluebox-labs-logo.png"
          logoAlt="BlueBox Labs logo"
          logoWide
        >
          <div className="case-study" id="bluebox-case-study">
            <div className="problem-solution">
              <div><p className="eyebrow">{t('THE PROBLEM')}</p><h4>{t('Irrigation shouldn’t depend on being there.')}</h4><p>{t('Manual irrigation offers limited remote control and visibility into what is happening at the pump, valves, and controller.')}</p></div>
              <div><p className="eyebrow accent">{t('THE SOLUTION')}</p><h4>{t('One connected system, from app to field.')}</h4><p>{t(bluebox.summary)} {t('People can set up the controller, manage irrigation remotely, and still use its local screen in the field.')}</p></div>
            </div>

            <div className="contribution">
              <div><span className="mono accent">{t('MY CONTRIBUTION')}</span><h4>{t(bluebox.contributionTitle)}</h4></div>
              <div>{bluebox.contribution.map(paragraph => <p key={paragraph}>{t(paragraph)}</p>)}</div>
            </div>

            <div className="gallery-heading"><h4>{t('BlueBox in the field')}</h4><span>{t('Connected irrigation hardware')}</span></div>
            <ProjectGallery featuredScreenshot={bluebox.featuredImage} includeArchitecture={false} />

            <section className="project-details" aria-labelledby="bluebox-technical-overview-title">
              <div className="project-details-heading"><span><strong id="bluebox-technical-overview-title">{t('Technical overview')}</strong><small>{t('Architecture, capabilities, and tools')}</small></span></div>
              <div className="project-details-content">
                <ProjectGallery architectureOnly />
                <div className="platform-overview">
                  <div className="platform-heading"><div><span className="mono accent">{t('HOW THE WHOLE SYSTEM FITS TOGETHER')}</span><h4>{t('Phone, services, controller, field.')}</h4></div><p>{t('I contributed features across the mobile app, web dashboard, backend services, and embedded controller, integrating their APIs and device messaging as part of one platform.')}</p></div>
                  <div className="platform-layers">{bluebox.platformLayers.map(layer => <article className="platform-layer" key={layer.number}>
                    <div className="platform-layer-top"><span className="mono">{layer.number}</span><Icon name={layer.icon} size={20} /></div>
                    <h5>{t(layer.title)}</h5><span className="platform-technology">{t(layer.technology)}</span><p>{t(layer.detail)}</p>
                  </article>)}</div>
                  <div className="communication-flow"><span className="mono">{t('HOW DATA MOVES')}</span><p>{t(bluebox.communicationFlow)}</p></div>
                </div>

                <div className="project-features"><h4>{t('What the system supports')}</h4><ul>{bluebox.features.map(([icon, label]) => <li key={label}><Icon name={icon} size={19} /><span>{t(label)}</span></li>)}</ul></div>
                <div className="project-technologies"><span className="mono">{t('TECHNOLOGY STACK')}</span><div className="tags">{bluebox.technologies.map(tech => <Tag key={tech}>{tech}</Tag>)}</div></div>
              </div>
            </section>
          </div>
        </ProjectAccordion>
      </Reveal>

      <SecomeProject />

      {additionalProjects.map((project, i) => {
        const href = safeExternalUrl(project.url);
        return <Reveal key={project.id} delay={(i + 2) * 40}>
          <ProjectAccordion
            title={project.title}
            company={project.organization}
            type={project.type}
            description={project.description}
            logo={project.logo}
            logoAlt={project.logoAlt}
            logoWide={project.logoWide}
            icon={project.icon}
          >
            <div className="case-study additional-project-content">
              <div className="project-detail-grid">
                {project.highlights?.length > 0 && <section className="project-detail-block"><h4>{t('Key responsibilities')}</h4><ul className="additional-project-highlights">{project.highlights.map(highlight => <li key={highlight}>{t(highlight)}</li>)}</ul></section>}
                {project.technologies?.length > 0 && <section className="project-detail-block"><h4>{t('Technologies')}</h4><div className="tags">{project.technologies.map(tech => <Tag key={tech}>{t(tech)}</Tag>)}</div></section>}
              </div>
              {project.images?.length > 0 && <div className="additional-project-gallery">
                {project.images.map(image => <figure key={image.src}><img src={assetUrl(image.src)} alt={t(image.alt)} loading="lazy" width="1280" height="720" /><figcaption>{t(image.caption)}</figcaption></figure>)}
              </div>}
              {project.screenshots?.length > 0 && <ProjectGallery screenshots={project.screenshots} projectName={project.galleryName || project.title} galleryClass={project.galleryClass} />}
              {href && <a href={href} target="_blank" rel="noopener noreferrer" className="text-link">{t(project.linkLabel || 'Explore project')}<ArrowUpRight size={16} aria-hidden="true" /></a>}
            </div>
          </ProjectAccordion>
        </Reveal>;
      })}
    </div>
  </div></section>;
}
