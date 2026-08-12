// Sidebar for the CURRENT (unreleased v2.0) docs in `docs/`.
//
// The order follows the actual working flow: install -> learn the main window ->
// run the calibration (pattern -> capture -> result) -> verify the camera
// parameters -> manage stored data.
//
// CONVENTION: every label lives in this file. Pages must NOT set `sidebar_label`
// in their frontmatter. Docusaurus resolves a doc label as
// `frontMatter.sidebar_label ?? item.label ?? title` (see
// plugin-content-docs/lib/props.js), so any frontmatter label silently wins over
// the `label` below and the step numbers drift out of sync.
const sidebars = {
  tutorialSidebar: [
    { type: 'doc', id: 'intro', label: 'Introduction' },

    {
      type: 'category',
      label: 'Installation',
      collapsed: true,
      items: [
        { type: 'doc', id: 'installation/server', label: 'Server Installation' },
        {
          type: 'doc',
          id: 'installation/client-installation-guide',
          label: 'Client Installation Guide',
        },
      ],
    },

    {
      type: 'doc',
      id: 'system-overview/main-window',
      label: 'Main Window Reference',
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
            {
              type: 'doc',
              id: 'calibration/pct-pattern-generator',
              label: 'PCT Pattern Generator',
            },
            {
              type: 'doc',
              id: 'calibration/monitor-viewer',
              label: 'Monitor Viewer',
            },
          ],
        },

        {
          type: 'doc',
          id: 'calibration/camera-calibration',
          label: '2. Camera Calibration',
        },

        {
          type: 'category',
          label: '3. Calibration Result',
          collapsed: false,
          link: {
            type: 'doc',
            id: 'calibration/cali-result/index',
          },
          items: [
            {
              type: 'doc',
              id: 'calibration/cali-result/main-window-overview',
              label: 'Main Window Overview',
            },
            {
              type: 'doc',
              id: 'calibration/cali-result/result-table-view',
              label: 'Result Table View',
            },
            {
              type: 'doc',
              id: 'calibration/cali-result/parameter-view',
              label: 'Parameter View',
            },
            {
              type: 'doc',
              id: 'calibration/cali-result/overlap-and-aggregation-view',
              label: 'Overlap & Aggregation View',
            },
            {
              type: 'doc',
              id: 'calibration/cali-result/entrance-pupil-analysis',
              label: 'Entrance-Pupil Analysis',
            },
          ],
        },

        {
          type: 'doc',
          id: 'calibration/reload-calibration-data',
          label: '4. Reload Calibration Data',
        },

        {
          type: 'doc',
          id: 'verification/setup-center',
          label: '5. Setup Center',
        },

        {
          type: 'doc',
          id: 'verification/3d-verification',
          label: '6. 3D Verification',
        },
      ],
    },

    {
      type: 'doc',
      id: 'database/database-overview',
      label: 'Database Overview',
    },
  ],
};

export default sidebars;
