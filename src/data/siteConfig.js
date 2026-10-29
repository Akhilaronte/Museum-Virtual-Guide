// Central, easy-to-edit site configuration.
// NOTE: All content here is sample/illustrative content for a learning project.
// Update `repoUrl` (and hours/admission text) to match your own repository.

export const siteConfig = {
  museumName: 'Aurelia Museum',
  museumFullName: 'Aurelia Museum of History & Art',
  tagline: 'A virtual guide through art, antiquity, nature, and discovery.',
  about:
    'The Aurelia Museum is a fictional museum created for this learning project. ' +
    'It presents a curated, sample collection across four areas — Antiquities, Paintings, ' +
    'Natural History, and Science & Technology — and helps visitors explore the collection ' +
    'and find their way around the building using an interactive floor plan.',

  // Replace with your own GitHub repository URL after you create the repo.
  repoUrl: 'https://github.com/your-username/museum-virtual-guide',

  // Sample, illustrative visiting information (not real opening hours).
  hours: [
    { day: 'Tuesday – Thursday', time: '10:00 – 18:00' },
    { day: 'Friday – Sunday', time: '10:00 – 21:00' },
    { day: 'Monday', time: 'Closed' },
  ],

  admission: [
    { label: 'Adults', value: 'Free (sample)' },
    { label: 'Students & Seniors', value: 'Free (sample)' },
    { label: 'Children under 12', value: 'Free (sample)' },
  ],

  categories: ['Antiquities', 'Paintings', 'Natural History', 'Science & Technology'],

  // Short notice shown near exhibit content so sample data is never mistaken for verified fact.
  sampleNotice:
    'Sample content — this is a learning project and the exhibits, dates, and details are illustrative, not verified historical facts.',
}

export default siteConfig
