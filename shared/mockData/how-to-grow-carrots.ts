import type { BlogPost } from '../types/BlogPost'
import { jamieCurnow } from './authors/jamie-curnow'

const author = jamieCurnow

export const carrots: BlogPost = {
  id: 'how-to-grow-carrots',
  slug: 'how-to-grow-carrots',
  title: 'How to Grow Carrots (UK Guide)',
  subtitle: 'From sowing to harvest — crisp, sweet roots every time.',
  content: `From sowing to harvest — crisp, sweet roots every time.

Carrots are one of the easiest and most rewarding vegetables to grow in the UK. With the right soil and sowing times, you can harvest bright, flavourful roots from early summer right through to autumn.

---

## 🪴 When to Sow Carrots in the UK 

Carrots prefer cool, moist soil for germination.  
- **Outdoor sowing:** March to June (southern UK can start earlier under cloches).  
- **Under cover:** February onwards in modules or cold frames.  
- **Succession sowing:** Every 3–4 weeks for a continuous harvest through summer.

Avoid sowing during prolonged cold or wet spells — carrot seeds are slow to germinate in cold soil.

---

## 🌱 Preparing the Soil

Carrots grow best in **light, stone-free, well-drained soil**.  
Heavy clay or compacted beds can cause roots to fork or twist.

1. Remove all stones and debris.  
2. Loosen the top 25–30 cm of soil (don’t add fresh manure — it causes deformities).  
3. Mix in sieved compost or sand if the soil is heavy.  
4. Rake level and firm lightly before sowing.

> **Pro tip:** For small gardens or clay soils, use a **raised bed** or **deep container** filled with sandy loam mix.

---

## 🌾 How to Sow Carrots

1. Mark shallow drills about **1 cm deep** and **15–20 cm apart**.  
2. Sow seeds **thinly** — roughly one seed every 2–3 cm.  
3. Cover lightly with fine soil or compost.  
4. Water gently and keep consistently moist until germination (7–21 days).

If seedlings are crowded, thin them once they’re 2 cm tall — final spacing about **5 cm apart**.

> Avoid thinning during midday or windy conditions to reduce carrot fly risk.

---

## 🐛 Preventing Carrot Fly

Carrot fly is the main pest to watch out for in the UK.  
Here’s how to prevent it:

- **Grow resistant varieties:** ‘Flyaway’, ‘Resistafly’, or ‘Maestro’.  
- **Use fine mesh or fleece** barriers at least 60 cm high.  
- **Avoid thinning** when flies are most active (late afternoon).  
- **Intercrop** with onions, leeks, or garlic to mask the carrot scent.

> Once roots are large enough, remove protective mesh only after the main carrot-fly season (late summer).

---

## 💧 Watering and Feeding

Carrots don’t need much feeding — too much nitrogen encourages leaf growth over roots.  
- Keep the soil **evenly moist**, especially during germination and dry spells.  
- Avoid overwatering — sudden moisture after dry periods can cause roots to split.

---

## 🌿 Harvesting Carrots

Most carrot varieties are ready **12–16 weeks** after sowing.  
- Early types (e.g. ‘Nantes’) from **June**.  
- Maincrop varieties (e.g. ‘Autumn King’) into **October or November**.

Gently lift roots with a fork to loosen the soil, then pull by hand.

> For the sweetest flavour, harvest after a light frost — the cold converts starches to sugars.

---

## 🥕 Storing Carrots

Brush off soil and store in boxes of **slightly damp sand or sawdust** in a cool, dark shed.  
Check occasionally for rot or pest damage.

Alternatively, leave carrots in the ground under a thick mulch through winter in mild areas.

---

## ❓ Common Questions

### When should I sow carrots in the UK?
From **March to June**, depending on your region. In milder areas, sow under cover from **February**.

### How do I stop carrot fly?
Use **fine mesh barriers**, **sow resistant varieties**, and **avoid thinning** when flies are active.

### Why are my carrots forked or stunted?
Usually due to **stony soil**, **fresh manure**, or **overcrowding** during early growth.

---

## 🧺 Recommended UK Varieties

| Type | Variety | Harvest Window | Notes |
|------|----------|----------------|-------|
| Early | 'Nantes 2' | June–August | Smooth, sweet, fast-growing |
| Maincrop | 'Autumn King' | September–November | Long roots, excellent storage |
| Resistant | 'Flyaway' | July–October | Carrot fly resistant |
| Baby | 'Parmex' | June–August | Round roots, great for containers |

---

## 🌼 Summary

Growing carrots in the UK is simple once you get the basics right — light soil, thin sowing, steady moisture, and carrot-fly protection.  
Follow these steps and you’ll be rewarded with crisp, sweet, and perfectly formed roots all season long.
`,
  excerpt: 'Learn how to grow carrots in the UK — sowing times, soil prep, thinning, and harvesting tips.',
  coverImage: {
    url: '/img/carrots.jpg',
    alt: 'A bunch of freshly harvested carrots',
    caption: 'Freshly harvested carrots from the garden'
  },
  author,
  datePublished: '2025-03-21',
  category: 'Root Vegetables',
  tags: ['carrots', 'sowing', 'root crops', 'spring'],
  atAGlance: {
    summary:
      'Sow Feb–Jun in light, stone-free soil; thin to 5 cm; harvest June–Nov. Protect from carrot fly with mesh. Recommended varieties: Nantes 2, Autumn King, Flyaway.',
    sowingMonths: ['Feb', 'Mar', 'Apr', 'May', 'Jun'],
    harvestMonths: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    spacing: {
      inRow: '5 cm',
      betweenRows: '15–20 cm',
      depth: '1 cm'
    }
  },
  meta: {
    title: 'How to Grow Carrots (UK Guide) | Dibbler Blog',
    description:
      'Step-by-step guide to growing carrots from seed in the UK — sowing, thinning, and harvesting advice.',
    canonical: 'https://dibbler.app/blog/how-to-grow-carrots'
  },
  social: {
    ogTitle: 'How to Grow Carrots (UK Guide)',
    ogDescription: 'Step-by-step guide to sowing, thinning, and harvesting carrots for the best results.',
    ogImage: 'https://dibbler.app/images/posts/how-to-grow-carrots.jpg',
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterCreator: '@dibblerapp'
  },
  schema: {
    type: 'BlogPosting',
    headline: 'How to Grow Carrots',
    description:
      'Learn how to grow carrots in the UK — sowing times, soil preparation, thinning, and harvesting tips.',
    image: 'https://dibbler.app/images/posts/how-to-grow-carrots.jpg',
    author: jamieCurnow,
    publisher: {
      name: 'Dibbler Blog',
      logo: {
        url: 'https://dibbler.app/images/logo-192.png',
        width: 192,
        height: 192
      }
    },
    howTo: {
      name: 'Grow Carrots from Seed',
      totalTime: 'P12W',
      supply: [
        'Carrot seeds',
        'Fine compost or seed compost',
        'Horticultural sand (for heavy soils)',
        'Insect mesh or fleece (for carrot fly protection)'
      ],
      tool: ['Rake', 'Garden fork', 'Watering can or fine rose'],
      steps: [
        { name: 'Prepare soil', text: 'Loosen and remove stones.' },
        { name: 'Sow seeds', text: 'Sow thinly in shallow drills 1 cm deep.' },
        { name: 'Thin seedlings', text: 'When 2 cm tall, thin to 5 cm apart.' },
        {
          name: 'Harvest',
          text: 'Lift roots when mature, usually 12–16 weeks after sowing.'
        }
      ]
    },
    faq: [
      {
        question: 'When should I sow carrots in the UK?',
        answer: 'From March to June, or under cover from February.'
      },
      {
        question: 'How do I stop carrot fly?',
        answer: 'Use fine mesh or grow resistant varieties like “Flyaway”.'
      }
    ]
  }
}
