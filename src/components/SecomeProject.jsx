import { Check } from 'lucide-react';
import { secome } from '../data/portfolio';
import { Icon, Reveal, Tag } from './ui';
import ProjectGallery from './ProjectGallery';
import ProjectAccordion from './ProjectAccordion';
import { useLanguage } from '../i18n';

export default function SecomeProject() {
  const { t } = useLanguage();
  return <Reveal delay={80}>
    <ProjectAccordion
      title={secome.title}
      company={secome.company}
      period="Jun 2025 — Aug 2025"
      type="Full-stack internship"
      description={secome.summary}
      logo="images/secome/secome-logo.png"
      logoAlt="SECOME logo"
    >
      <div className="case-study" id="secome-case-study">
        <div className="problem-solution">
          <div><p className="eyebrow">{t('THE CHALLENGE')}</p><h4>{t('Make product and order information easier to manage.')}</h4><p>{t(secome.problem)}</p></div>
          <div><p className="eyebrow accent">{t('THE SOLUTION')}</p><h4>{t('One connected path from products to quotes.')}</h4><p>{t(secome.solution)}</p></div>
        </div>

        <div className="contribution">
          <div><span className="mono accent">{t('MY CONTRIBUTION')}</span><h4>{t(secome.contributionTitle)}</h4></div>
          <div>{secome.contribution.map((paragraph) => <p key={paragraph}>{t(paragraph)}</p>)}</div>
        </div>

        <div className="platform-overview">
          <div className="platform-heading">
            <div><span className="mono accent">{t('APPLICATION ARCHITECTURE')}</span><h4>{t('Customer and admin workflows over shared services.')}</h4></div>
            <p>{t(secome.communicationFlow)}</p>
          </div>
          <div className="platform-layers">{secome.platformLayers.map((layer) => <article className="platform-layer" key={layer.number}>
            <div className="platform-layer-top"><span className="mono">{layer.number}</span><Icon name={layer.icon} size={20} /></div>
            <h5>{t(layer.title)}</h5><span className="platform-technology">{t(layer.technology)}</span><p>{t(layer.detail)}</p>
          </article>)}</div>
          <div className="communication-flow secome-method-note"><span className="mono">{t('METHOD & DESIGN')}</span><p>{t('Work was organized with Kanban. The report documents MVC concepts and UML use-case, sequence, and class diagrams.')}</p></div>
        </div>

        <div className="secome-feature-groups">
          <div className="project-features"><h4>{t('Customer storefront')}</h4><ul>{secome.customerFeatures.map((feature) => <li key={feature}><Check size={16} aria-hidden="true" /><span>{t(feature)}</span></li>)}</ul></div>
          <div className="project-features"><h4>{t('Administration portal')}</h4><ul>{secome.adminFeatures.map((feature) => <li key={feature}><Check size={16} aria-hidden="true" /><span>{t(feature)}</span></li>)}</ul></div>
        </div>

        <div className="project-technologies"><span className="mono">{t('TOOLS & TECHNOLOGIES')}</span><div className="tags">{secome.technologies.map((technology) => <Tag key={technology}>{t(technology)}</Tag>)}</div></div>

        <ProjectGallery screenshots={secome.screenshots} projectName="SECOME" />
      </div>
    </ProjectAccordion>
  </Reveal>;
}
