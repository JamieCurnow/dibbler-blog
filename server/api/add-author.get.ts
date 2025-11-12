import { ObjectId } from 'mongodb'

export default defineEventHandler(async (event) => {
  const db = await useDb()
  await db.authors.findOneAndReplace(
    {
      slug: 'jamie-curnow'
    },
    {
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      uid: 'jamie-curnow',
      slug: 'jamie-curnow',
      name: 'Jamie Curnow',
      title: 'Horticulturist & Garden Writer',
      image: '/img/jamie-curnow.jpeg',
      bio: 'Jamie is a horticulturist and garden writer with over a decade of experience growing vegetables in the UK climate.',
      yearsExperience: 10,
      focusRegion: 'United Kingdom',
      credentials: [
        'RHS Level 2 Principles of Horticulture',
        'Vegetable growing specialist (temperate climate)',
        'Community garden volunteer & mentor'
      ],
      social: {
        twitter: 'https://twitter.com/dibblerapp',
        github: 'https://github.com/JCGeek',
        website: 'https://dibbler.app'
      },
      meta: {
        title: 'About Jamie Curnow | Dibbler',
        description:
          'Meet Jamie Curnow — horticulturist and garden writer with 10+ years experience growing vegetables in the UK climate.',
        canonical: 'https://dibbler.app/author/jamie-curnow'
      },
      content: `# Hi, I’m Jamie Curnow

I’m a **horticulturist** and **garden writer** focused on practical, no-nonsense advice for UK home growers. Over the past **10+ years**, I’ve grown vegetables across different soils and microclimates in the **United Kingdom**, with a special interest in reliable, repeatable methods for busy gardeners.

### What I cover

- Seasonal sowing plans for UK conditions (including coastal and cooler areas)
- Soil preparation, crop rotation, and organic pest management
- Container and small-space growing that actually works
- Straightforward “How-To” guides you can follow step-by-step

### Credentials

- RHS Level 2 Principles of Horticulture  
- Vegetable growing specialist (temperate climate)  
- Community garden volunteer & mentor  

### My approach

I test methods in real gardens first, then write guides that balance **clarity**, **accuracy**, and **results**. I care about **beginner-friendly** steps and **evidence-based** tips, avoiding jargon and fluff.

If you’re a UK grower and want simple advice that works from **March frosts** to **October harvests**, you’re in the right place.

— Jamie
`
    },
    { upsert: true }
  )

  return { success: true }
})
