// Live previews for the Ironclad CMS. Each template renders the entry with the site's own markup and
// stylesheet (/admin/preview.css is global.css), so editors see the page as it will be published.
// Written with h() (React.createElement), which this Sveltia CMS version exposes globally.
(() => {
  const CMS = window.CMS;
  CMS.registerPreviewStyle('/admin/preview.css');
  CMS.registerPreviewStyle(`
    html, body { background: #fff; }
    .cms-note { position: sticky; top: 0; z-index: 10; padding: .5rem 16px; background: #000; color: #fff;
      font: 500 .75rem/1.4 var(--f-sans); letter-spacing: .08em; text-transform: uppercase; }
    .cms-sub { padding-block: 2rem 0; }
    .cms-sub .label { color: var(--c-muted); margin-bottom: 1rem; }
    .cms-empty { color: var(--c-muted); font-style: italic; }
  `, { raw: true });

  const fmt = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const date = (v) => { const d = v ? new Date(v) : null; return d && !isNaN(d) ? fmt.format(d) : 'Date not set'; };
  const or = (v, fallback) => (v && String(v).trim() ? v : h('span', { className: 'cms-empty' }, fallback));
  const note = (text) => h('div', { className: 'cms-note' }, text);
  const pageHeader = (title, summary) =>
    h('section', { className: 'page-header' },
      h('div', { className: 'wrap page-header__inner' },
        h('div', { className: 'page-header__title-col' }, h('h1', { className: 'page-header__title' }, title)),
        h('div', { className: 'page-header__desc' }, h('p', {}, summary))));
  const url = (path) => (path ? encodeURI(path) : '#');

  // Insights post: the article page, then the card as it appears in the list
  CMS.registerPreviewTemplate('blog', ({ entry, widgetFor, getAsset }) => {
    const d = entry.get('data');
    const cover = d.get('cover');
    return h('div', {},
      note('Preview · goes live on the site when you tap Save'),
      h('article', { className: 'section article' },
        h('div', { className: 'wrap' },
          h('p', { className: 'small', 'data-key-path': 'date' }, date(d.get('date'))),
          h('h1', { className: 'd2 article-title', 'data-key-path': 'title' }, or(d.get('title'), 'Title')),
          cover && h('figure', { className: 'article-cover', 'data-key-path': 'cover' },
            h('img', { src: getAsset(cover)?.toString(), alt: d.get('coverAlt') || '' })),
          h('div', { className: 'post-body', 'data-key-path': 'body' }, widgetFor('body')))),
      h('section', { className: 'section cms-sub' },
        h('div', { className: 'wrap' },
          h('p', { className: 'label' }, 'In the list of posts'),
          h('div', { className: 'posts' },
            h('a', { className: 'post' },
              h('time', {}, date(d.get('date'))),
              h('h3', {}, or(d.get('title'), 'Title')),
              h('p', { 'data-key-path': 'summary' }, or(d.get('summary'), 'Summary')))))));
  });

  // Media coverage: the whole /media page
  CMS.registerPreviewTemplate('press', ({ entry }) => {
    const items = entry.getIn(['data', 'items'])?.toJS() ?? [];
    return h('div', {},
      note('Preview of /media · goes live when you tap Save'),
      pageHeader('Media', 'Ironclad Asset Management in the press.'),
      h('section', { className: 'section rule' },
        h('div', { className: 'wrap' },
          h('ul', { className: 'doclist' }, items.map((m, i) =>
            h('li', { key: i, 'data-key-path': `items.${i}` },
              h('a', { href: m.url || '#', target: '_blank', rel: 'noopener' },
                h('span', { className: 'label' }, or(m.outlet, 'Publication')),
                h('div', {}, h('p', { className: 'press-text' }, or(m.text, 'Excerpt'))),
                h('span', { className: 'go-text' }, 'Read article'))))))));
  });

  // Investor updates: the whole /investor-update page
  CMS.registerPreviewTemplate('investor-updates', ({ entry }) => {
    const items = entry.getIn(['data', 'items'])?.toJS() ?? [];
    return h('div', {},
      note('Preview of /investor-update · goes live when you tap Save'),
      pageHeader('Investor Update', 'Monthly notes to Ironclad PMS investors on markets, the portfolio and our thinking.'),
      h('section', { className: 'section rule' },
        h('div', { className: 'wrap' },
          h('ul', { className: 'doclist' }, items.map((u, i) =>
            h('li', { key: i, 'data-key-path': `items.${i}` },
              h('a', { href: url(u.file), target: '_blank', rel: 'noopener' },
                h('span', { className: 'label' }, 'PDF'),
                h('div', {},
                  h('h3', {}, or(u.title, 'Title')),
                  h('p', {}, or(u.summary, 'Summary')),
                  u.points?.some((t) => t?.trim()) ? h('ul', { className: 'points' }, u.points.filter((t) => t?.trim()).map((t, k) => h('li', { key: k }, t))) : null),
                h('span', { className: 'go-text' }, u.file ? 'Read PDF' : 'No PDF yet'))))))));
  });

  // Regulatory documents: the footer's Investor Resources links, with the file each one opens
  const docs = [
    ['disclosure', 'Disclosure'], ['sebiCertificate', 'SEBI Certificate'], ['investorCharter', 'Investor Charter'],
    ['grievance', 'Investor Grievance'], ['complaintsPms', 'Complaints Data PMS'], ['complaintsAif', 'Complaints Data AIF'],
  ];
  CMS.registerPreviewTemplate('regulatory-docs', ({ entry }) => {
    const d = entry.get('data');
    return h('div', {},
      note('Footer · Investor Resources · goes live when you tap Save'),
      h('section', { className: 'section' },
        h('div', { className: 'wrap' },
          h('ul', { className: 'doclist' }, docs.map(([key, label]) => {
            const file = d.get(key);
            return h('li', { key, 'data-key-path': key },
              h('a', { href: url(file), target: '_blank', rel: 'noopener' },
                h('span', { className: 'label' }, 'PDF'),
                h('div', {}, h('h3', {}, label), h('p', {}, file ? decodeURI(file).split('/').pop() : 'No file')),
                h('span', { className: 'go-text' }, file ? 'Open' : 'Missing')));
          })))));
  });
})();
