import { ArrowDownRight, Check } from 'lucide-react';
import { secome } from '../data/portfolio';
import { assetUrl } from '../lib/utils';
import { Icon, Reveal, Tag } from './ui';
import ProjectGallery from './ProjectGallery';

export default function SecomeProject() {
  return <Reveal delay={80}>
    <article className="flagship-project secome-project">
      <div className="project-banner">
        <div className="project-kicker">
          <span className="mono">SELECTED PROJECT / 02</span>
          <span className="project-status"><Check size={14} aria-hidden="true" />Full-stack internship</span>
        </div>

        <div className="project-banner-content">
          <div>
            <div className="project-wordmark">
              <img className="secome-mark" src={assetUrl('images/secome/secome-logo.png')} alt="SECOME logo" width="502" height="497" />
              <h3>{secome.title}<span>{secome.subtitle}</span></h3>
            </div>
            <p>Business workflows,<br />from catalog to quote.</p>
          </div>

          <div className="project-stack-diagram" aria-label="SECOME web application layers">
            <span><Icon name="PanelsTopLeft" size={18} />CUSTOMER UI</span><i />
            <span><Icon name="Server" size={18} />API SERVICES</span><i />
            <span><Icon name="Database" size={18} />MYSQL</span>
          </div>
        </div>

        <a href="#secome-case-study" className="project-explore">Inside the project <ArrowDownRight size={18} aria-hidden="true" /></a>
      </div>

      <div className="case-study" id="secome-case-study">
        <div className="problem-solution">
          <div><p className="eyebrow">THE CHALLENGE</p><h4>Make product and order information easier to manage.</h4><p>{secome.problem}</p></div>
          <div><p className="eyebrow accent">THE SOLUTION</p><h4>One connected path from products to quotes.</h4><p>{secome.solution}</p></div>
        </div>

        <div className="contribution">
          <div><span className="mono accent">MY CONTRIBUTION</span><h4>{secome.contributionTitle}</h4></div>
          <div>{secome.contribution.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </div>

        <div className="platform-overview">
          <div className="platform-heading">
            <div><span className="mono accent">APPLICATION ARCHITECTURE</span><h4>Customer and admin workflows over shared services.</h4></div>
            <p>{secome.communicationFlow}</p>
          </div>
          <div className="platform-layers">{secome.platformLayers.map((layer) => <article className="platform-layer" key={layer.number}>
            <div className="platform-layer-top"><span className="mono">{layer.number}</span><Icon name={layer.icon} size={20} /></div>
            <h5>{layer.title}</h5><span className="platform-technology">{layer.technology}</span><p>{layer.detail}</p>
          </article>)}</div>
          <div className="communication-flow secome-method-note"><span className="mono">METHOD & DESIGN</span><p>Work was organized with Kanban. The report documents MVC concepts and UML use-case, sequence, and class diagrams.</p></div>
        </div>

        <div className="secome-feature-groups">
          <div className="project-features"><h4>Customer storefront</h4><ul>{secome.customerFeatures.map((feature) => <li key={feature}><Check size={16} aria-hidden="true" /><span>{feature}</span></li>)}</ul></div>
          <div className="project-features"><h4>Administration portal</h4><ul>{secome.adminFeatures.map((feature) => <li key={feature}><Check size={16} aria-hidden="true" /><span>{feature}</span></li>)}</ul></div>
        </div>

        <div className="project-technologies"><span className="mono">TOOLS & TECHNOLOGIES</span><div className="tags">{secome.technologies.map((technology) => <Tag key={technology}>{technology}</Tag>)}</div></div>

        <ProjectGallery screenshots={secome.screenshots} projectName="SECOME" />
      </div>
    </article>
  </Reveal>;
}
