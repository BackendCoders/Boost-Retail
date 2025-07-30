/** @format */

export const adminMenuData = {
  AdminLogin: [
    {
      label: 'Dashboard',
      link: '/admin/dashboard',
    },
    {
      label: 'SIM',
      link: '#',
      children: [
        {
          label: 'Supplier Feeds',
          children: [
            {
              label: 'Maintain Supplier Feeds',
              path: '/admin/sim/supplier-feeds/maintain',
            },
          ],
        },
        {
          label: 'Categorization',
          children: [
            {
              label: 'Maintain Categories',
              path: '/admin/sim/categorization/maintain-categories',
            },
            {
              label: 'Maintain Lookup Tables',
              path: '/admin/sim/categorization/maintain-lookup-tables',
            },
          ],
        },
        {
          label: 'Sim Products',
          children: [
            {
              label: 'Maintain Sim Products',
              path: '/admin/sim/products/maintain',
            },
          ],
        },
        {
          label: 'Missing Data',
          children: [
            {
              label: 'Missing Categories',
              path: '/admin/sim/missing-data/missing-categories',
            },
            {
              label: 'Missing Categories Visual Mode',
              path: '/admin/sim/missing-data/missing-categories-visual-mode',
            },
            {
              label: 'Conflicting Categories',
              path: '/admin/sim/missing-data/conflicting-categories',
            },
            {
              label: 'Missing Product Data',
              path: '/admin/sim/missing-data/missing-product-data',
            },
            {
              label: 'Missing Images',
              path: '/admin/sim/missing-data/missing-images',
            },
          ],
        },
      ],
    },
    {
      label: 'Users',
      link: '/admin/users',
    },
    {
      label: 'Setup',
      link: '/admin/setup',
    },
  ],
};
