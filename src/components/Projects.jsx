import { ArrowDownRight, ArrowUpRight, Check, ChevronDown } from 'lucide-react';
import { additionalProjects, bluebox } from '../data/portfolio';
import { assetUrl, safeExternalUrl } from '../lib/utils';
import { Icon, Reveal, SectionHeading, Tag } from './ui';
import ProjectGallery from './ProjectGallery';
import SecomeProject from './SecomeProject';

export default function Projects() {
  return <section id="projects" className="section section--projects" aria-labelledby="projects-title"><div className="container">
    <Reveal><SectionHeading number="04" eyebrow="SELECTED WORK" title={<span id="projects-title">Code that leaves<br /><span className="muted">the screen.</span></span>} description="Full-stack applications and connected systems built to solve real-world problems." /></Reveal>
    <Reveal><article className="flagship-project">
      <div className="project-banner">
        <div className="project-kicker"><span className="mono">FEATURED PROJECT / 01</span><span className="project-status"><Check size={14} aria-hidden="true" />Full-stack & IoT internship</span></div>
        <div className="project-banner-content">
          <div><div className="project-wordmark"><img className="bluebox-logo" src={assetUrl('images/bluebox/bluebox-labs-logo.png')} alt="BlueBox Labs logo" /><h3>{bluebox.title}<span>{bluebox.subtitle}</span></h3></div><p>From first setup<br />to irrigation in the field.</p></div>
          <div className="project-stack-diagram" aria-label="BlueBox connects the apps, backend, and embedded controller"><span><Icon name="PanelsTopLeft" size={18} />APPS</span><i /><span><Icon name="Server" size={18} />BACKEND</span><i /><span><Icon name="Cpu" size={18} />CONTROLLER</span></div>
        </div>
        <a href="#bluebox-case-study" className="project-explore">Inside the project <ArrowDownRight size={18} aria-hidden="true" /></a>
      </div>
      <div className="case-study" id="bluebox-case-study">
        <div className="problem-solution">
          <div><p className="eyebrow">THE PROBLEM</p><h4>Irrigation shouldn’t depend on being there.</h4><p>Manual irrigation offers limited remote control and visibility into what is happening at the pump, valves, and controller.</p></div>
          <div><p className="eyebrow accent">THE SOLUTION</p><h4>One connected system, from app to field.</h4><p>{bluebox.summary} People can set up the controller, manage irrigation remotely, and still use its local screen in the field.</p></div>
        </div>

        <div className="contribution">
          <div><span className="mono accent">MY CONTRIBUTION</span><h4>{bluebox.contributionTitle}</h4></div>
          <div>{bluebox.contribution.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
        </div>

        <details className="project-details">
          <summary><span><strong>Technical overview</strong><small>Architecture, capabilities, and tools</small></span><ChevronDown size={19} aria-hidden="true" /></summary>
          <div className="project-details-content">
            <div className="platform-overview">
              <div className="platform-heading"><div><span className="mono accent">HOW THE WHOLE SYSTEM FITS TOGETHER</span><h4>Phone, services, controller, field.</h4></div><p>I contributed features across the mobile app, web dashboard, backend services, and embedded controller, integrating their APIs and device messaging as part of one platform.</p></div>
              <div className="platform-layers">{bluebox.platformLayers.map(layer => <article className="platform-layer" key={layer.number}>
                <div className="platform-layer-top"><span className="mono">{layer.number}</span><Icon name={layer.icon} size={20} /></div>
                <h5>{layer.title}</h5><span className="platform-technology">{layer.technology}</span><p>{layer.detail}</p>
              </article>)}</div>
              <div className="communication-flow"><span className="mono">HOW DATA MOVES</span><p>{bluebox.communicationFlow}</p></div>
              <div className="project-delivery">
                <div className="project-delivery-heading"><span className="mono">DEVELOPMENT APPROACH</span><p>{bluebox.deliveryApproach}</p></div>
                <ol className="project-release-grid">{bluebox.releaseMilestones.map(release => <li className="project-release" key={release.number}>
                  <div className="project-release-top"><span className="mono">{release.number}</span><span>{release.sprintCount}</span></div>
                  <h5>{release.title}</h5><p>{release.detail}</p>
                </li>)}</ol>
              </div>
            </div>

            <div className="project-features"><h4>What the system supports</h4><ul>{bluebox.features.map(([icon, label]) => <li key={label}><Icon name={icon} size={19} /><span>{label}</span></li>)}</ul></div>
            <div className="project-technologies"><span className="mono">TECHNOLOGY STACK</span><div className="tags">{bluebox.technologies.map(tech => <Tag key={tech}>{tech}</Tag>)}</div></div>
          </div>
        </details>
        <div className="gallery-heading"><h4>A closer look</h4><span>Architecture · Controller · Mobile · Hardware</span></div><ProjectGallery />
      </div>
    </article></Reveal>
    <SecomeProject />
    <div className="more-projects-heading"><h3>More work, coming next.</h3><span className="mono">ROOM TO KEEP BUILDING</span></div>
    <div className="additional-projects">{additionalProjects.map((project, i) => { const href = safeExternalUrl(project.url); return <Reveal key={project.id} delay={i * 40}><article className="additional-project"><div className="additional-top"><Icon name={project.icon} size={25} /><span className="project-placeholder-label">{project.status === 'placeholder' ? 'Project placeholder' : project.type}</span></div><p className="mono">{project.type}</p><h4>{project.title}</h4><p>{project.description}</p>{project.technologies?.length > 0 && <div className="tags">{project.technologies.map(tech => <Tag key={tech}>{tech}</Tag>)}</div>}{href && <a href={href} target="_blank" rel="noopener noreferrer" className="text-link">Explore project<ArrowUpRight size={16} aria-hidden="true" /></a>}</article></Reveal>; })}</div>
  </div></section>;
}
