export function assetUrl(path) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}

export function safeExternalUrl(value) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}

export function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || '');
}

export function buildMailto(email, fields) {
  const body = `Name: ${fields.name}\nEmail: ${fields.email}\n\n${fields.message}`;
  return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(fields.subject)}&body=${encodeURIComponent(body)}`;
}

export function formatInquiry(fields, recipient) {
  return `To: ${recipient}\nFrom: ${fields.name} <${fields.email}>\nSubject: ${fields.subject}\n\n${fields.message}`;
}
