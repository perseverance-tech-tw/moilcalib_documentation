// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Calibration System Docs',
  tagline: 'Moil Fisheye Calibration System Documentation',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://perseverance-tech-tw.github.io',
  baseUrl: '/moilcalib_documentation/',

  organizationName: 'perseverance-tech-tw',
  projectName: 'moilcalib_documentation',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'ignore',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/perseverance-tech-tw/moilcalib_documentation/tree/main/',
          // See VERSIONING.md at the repo root for the full folder map and
          // how to cut a new version with `npx docusaurus docs:version X`.
          lastVersion: '1.0', // the released version served at the site root
          versions: {
            // "current" = the live v2/ folder (in-progress, unreleased)
            current: {
              label: 'v2 (main_development)',
              path: 'v2',
              badge: true,
            },
            // frozen snapshot, lives in versioned_docs/version-1.0/
            '1.0': {
              label: 'v1.0 (Feature-AutoLoadCaliResult)',
            },
          },
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/perseverance-tech-tw/moilcalib_documentation/tree/main/blog/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Calibration Docs',
        logo: {
          alt: 'Calibration Docs Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            to: '/blog',
            label: 'Blog',
            position: 'left',
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/perseverance-tech-tw/moilcalib_documentation',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/perseverance-tech-tw/moilcalib_documentation',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Nasyahwulan. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;