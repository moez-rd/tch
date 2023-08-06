import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://technofestunsri.com',
      lastModified: new Date(),
    },
    {
      url: 'https://technofestunsri.com/faqs',
      lastModified: new Date(),
    },
    {
      url: 'https://technofestunsri.com/login',
      lastModified: new Date(),
    },
    {
      url: 'https://technofestunsri.com/register',
      lastModified: new Date(),
    },
    {
      url: 'https://technofestunsri.com/events/uiux',
      lastModified: new Date(),
    },
    {
      url: 'https://technofestunsri.com/events/poster',
      lastModified: new Date(),
    },
    {
      url: 'https://technofestunsri.com/events/essay',
      lastModified: new Date(),
    },
    {
      url: 'https://technofestunsri.com/privacy',
      lastModified: new Date(),
    },
  ];
}
