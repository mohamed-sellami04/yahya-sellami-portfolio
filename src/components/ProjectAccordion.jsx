import { CalendarDays, ChevronDown } from 'lucide-react';
import { assetUrl } from '../lib/utils';
import { Icon } from './ui';
import { useLanguage } from '../i18n';

export default function ProjectAccordion({
  title,
  company,
  period,
  type,
  description,
  logo,
  logoAlt,
  logoWide = false,
  icon = 'PanelsTopLeft',
  children,
}) {
  const { t } = useLanguage();
  return <details className={`project-accordion${logoWide ? ' project-accordion--wide-mark' : ''}`}>
    <summary className="project-accordion-summary">
      <span className="project-accordion-mark">
        {logo ? <img src={assetUrl(logo)} alt={t(logoAlt || `${title} logo`)} /> : <Icon name={icon} size={22} aria-hidden="true" />}
      </span>
      <span className="project-accordion-heading">
        <strong className="project-accordion-title">{t(title)}</strong>
        <span className="project-accordion-meta">
          {company && <strong>{company}</strong>}
          {period && <span className="project-accordion-period"><CalendarDays size={13} aria-hidden="true" />{t(period)}</span>}
          {type && <span>{t(type)}</span>}
        </span>
        <span className="project-accordion-description">{t(description)}</span>
      </span>
      <ChevronDown className="project-accordion-chevron" size={19} aria-hidden="true" />
    </summary>
    <div className="project-accordion-content">{children}</div>
  </details>;
}
