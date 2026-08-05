// Sidebar for the CURRENT (v1.1) docs. The order follows the actual working
// flow: install → learn the main window → run the calibration (pattern → capture
// → result) → verify the camera parameters → manage stored data.
const sidebars = {
  tutorialSidebar: [
    'intro',

    {
      type: 'category',
      label: 'Installation',
      collapsed: true,
      items: [
        'installation/server',
        'installation/client-installation-guide',
      ],
    },

    {
      type: 'category',
      label: 'System Overview',
      collapsed: false,
      items: [
        'system-overview/main-window',
      ],
    },

    {
      type: 'category',
      label: 'Calibration Workflow',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: '1. Pattern Setup',
          collapsed: false,
          items: [
            'calibration/pct-pattern-generator',
            'calibration/monitor-viewer',
          ],
        },

        // Step numbers for plain doc items live in each page's `sidebar_label`
        // frontmatter — Docusaurus resolves a doc label as
        // `frontMatter.sidebar_label ?? item.label ?? title`, so a `label` here
        // would be silently ignored. Category labels below have no frontmatter
        // competing with them, so they are numbered here.
        'calibration/camera-calibration',

        {
          type: 'category',
          label: '3. Calibration Result',
          collapsed: false,
          link: {
            type: 'doc',
            id: 'calibration/cali-result/index',
          },
          items: [
            'calibration/cali-result/main-window-overview',
            'calibration/cali-result/result-table-view',
            'calibration/cali-result/parameter-view',
            'calibration/cali-result/overlap-and-aggregation-view',
            'calibration/cali-result/entrance-pupil-analysis',
          ],
        },

        'calibration/reload-calibration-data',
      ],
    },

    {
      type: 'category',
      label: 'Verification',
      collapsed: false,
      items: [
        'verification/setup-center',
        'verification/3d-verification',
      ],
    },

    {
      type: 'category',
      label: 'Database',
      collapsed: true,
      items: [
        'database/database-overview',
      ],
    },
  ],
};

export default sidebars;
