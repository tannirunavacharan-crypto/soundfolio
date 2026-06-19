require('dotenv').config();
const User = require('../models/User');
const Track = require('../models/Track');
const Service = require('../models/Service');
const Project = require('../models/Project');
const Testimonial = require('../models/Testimonial');
const Inquiry = require('../models/Inquiry');

const seedData = async () => {
  try {
    console.log('JSON database files preparing for seeding...');

    // Clear existing collections
    await User.deleteMany();
    await Track.deleteMany();
    await Service.deleteMany();
    await Project.deleteMany();
    await Testimonial.deleteMany();
    await Inquiry.deleteMany();
    console.log('Cleared existing data.');

    // 1. Seed Admin User
    const adminUser = await User.create({
      name: 'Ak Bhuker',
      email: 'admin@soundfolio.com',
      password: 'adminpassword', // Will be hashed via pre-save hook
      role: 'admin',
    });
    console.log('Admin user seeded (admin@soundfolio.com / adminpassword).');

    // 2. Seed Tracks (with live test mp3 URLs from SoundHelix)
    const tracks = await Track.create([
      {
        title: 'Echoes of the Cinematic Horizon',
        genre: 'Orchestral / Film Score',
        category: 'Film',
        description: 'An epic, swelling orchestral track designed for science fiction and adventure film trailer openings. Features driving strings and synth textures.',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=400',
        duration: '6:12',
      },
      {
        title: 'The Golden Spark Jingle',
        genre: 'Modern Corporate / Indie Pop',
        category: 'Jingle',
        description: 'Upbeat, catchy 30-second jingle for commercial advertising. High-energy acoustic guitar, handclaps, and whistling accents.',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400',
        duration: '7:05',
      },
      {
        title: 'Midnight Jazz Arrangement',
        genre: 'Smooth Jazz / Neo-Soul',
        category: 'Arrangement',
        description: 'An elegant arrangement of a classical piece rewritten for a jazz quartet. Features smooth saxophone leads, fender rhodes piano, and a double bass groove.',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        imageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=400',
        duration: '5:44',
      },
      {
        title: 'Tension in the Shadows',
        genre: 'Dark Ambient / Thriller',
        category: 'Background Score',
        description: 'A suspenseful, slow-burning background score ideal for documentary or film noir crime scenes. Sub-heavy bass and repeating ticking sounds.',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400',
        duration: '5:02',
      },
      {
        title: 'Summer Fuel commercial theme',
        genre: 'Electronic Dance Music',
        category: 'Commercial',
        description: 'A high-energy, pumping electronic track perfect for automotive, sports energy, or youth-focused marketing campaigns.',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        imageUrl: 'https://images.unsplash.com/photo-1460881680858-30d872d5b530?q=80&w=400',
        duration: '6:02',
      },
    ]);
    console.log(`Seeded ${tracks.length} music tracks.`);

    // 3. Seed Services
    const services = await Service.create([
      {
        title: 'Film Scoring & Cinematic Composition',
        description: 'Custom musical scores tailormade to support your visual narratives. From full-scale orchestral arrangements to minimalist electronic underscores, designed to evoke the exact emotion for your movie or documentary.',
        turnaroundTime: '2 to 4 weeks depending on film duration',
      },
      {
        title: 'Brand Jingles & Sonic Logos',
        description: 'Capture the identity of your brand in a short, memorable audio signature. Catchy hooks, custom sound elements, and memorable arrangements for television, radio, and social media campaigns.',
        turnaroundTime: '5 to 7 business days',
      },
      {
        title: 'Song Arrangement & Instrumentation',
        description: 'Transform your vocal sketches or basic demo chords into a fully arranged, radio-ready masterpiece. We write and record the drums, bass, guitars, keyboards, and orchestral parts to support your melody.',
        turnaroundTime: '7 to 10 business days',
      },
      {
        title: 'Professional Audio Mixing & Mastering',
        description: 'Give your music the clarity, depth, and competitive loudness it deserves. Using state-of-the-art processors and a treated monitoring space, we ensure your tracks sound stellar on all playback devices.',
        turnaroundTime: '3 to 5 business days',
      },
      {
        title: 'Full-Scale Music Production',
        description: 'End-to-end music production for artists and bands. From concept development, recording coordination, session management, and vocal arrangement to the final mixed master.',
        turnaroundTime: 'Flexible (project-dependent)',
      },
    ]);
    console.log(`Seeded ${services.length} services.`);

    // 4. Seed Projects
    const projects = await Project.create([
      {
        clientName: 'Aurora Pictures',
        projectType: 'Short Film Score',
        description: 'Composed an award-winning cinematic score for the sci-fi short film "Stellar Drift". Recorded live acoustic strings and combined them with analog synthesizer beds.',
        imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=400',
        year: 2025,
      },
      {
        clientName: 'Velocity Motors',
        projectType: 'Commercial Campaign',
        description: 'Created a high-octane rock-electronic jingle and sound design set for the global release advertisement of the EV Roadster-9.',
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400',
        year: 2025,
      },
      {
        clientName: 'Whisper Interactive',
        projectType: 'Video Game Soundtrack',
        description: 'Produced 12 looped ambient and combat tracks for the atmospheric exploration RPG game "Shadow of the Forest".',
        imageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=400',
        year: 2024,
      },
      {
        clientName: 'Lumina Cosmetics',
        projectType: 'Sonic Logo',
        description: 'Composed a soft, airy, elegant 5-second acoustic-chime logo to conclude all cosmetic commercials, reinforcing clean and organic themes.',
        imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=400',
        year: 2024,
      },
      {
        clientName: 'Tide Records',
        projectType: 'Album Arrangement',
        description: 'Provided complete string and brass arrangements for indie-pop artist "Sienna Blue" on her top-charting studio album "Waves".',
        imageUrl: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=400',
        year: 2023,
      },
    ]);
    console.log(`Seeded ${projects.length} client projects.`);

    // 5. Seed Testimonials
    const testimonials = await Testimonial.create([
      {
        clientName: 'Sarah Jenkins (Director, Aurora Pictures)',
        feedback: 'Working with Ak was an absolute revelation. He has an uncanny ability to translate abstract emotional cues into breathtaking melodies. The score for Stellar Drift made the film.',
        rating: 5,
      },
      {
        clientName: 'Marcus Vance (Creative Lead, Velocity Motors)',
        feedback: 'We needed a track that felt powerful, modern, and memorable. Ak delivered a jingle that exceeded expectations within 5 days. Absolute professional and highly responsive.',
        rating: 5,
      },
      {
        clientName: 'Elena Rostova (Lead Designer, Whisper Interactive)',
        feedback: 'The game soundtrack is gorgeous. It fits our world perfectly, and the loop cuts are seamless. Our players keep praising the music in reviews!',
        rating: 5,
      },
    ]);
    console.log(`Seeded ${testimonials.length} client reviews.`);

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding Failed:', error.message);
    process.exit(1);
  }
};

seedData();
