# SoundFolio - Music Composer Portfolio Web Application

SoundFolio is a premium, production-ready full-stack portfolio website built for professional music composer and arranger **Ak Bhuker**. It allows clients to audition custom cinematic compositions, browse past work, explore service packages, submit contact inquiries, and allows the administrator to manage everything from a secured Admin Dashboard.

## Features

- **Premium Music Aesthetic**: Default dark mode with electric purple and gold accents, micro-animations, and ambient glowing backgrounds.
- **Global Audio Player**: A persistent, sticky audio playback deck fixed to the bottom of the viewport, enabling uninterrupted listening as visitors navigate the biography or submit quotes.
- **Dynamic Waveforms**: Glowing SVG soundwave bars driven by Framer Motion that react visually when audio playback is active.
- **Dynamic Search & Filters**: Instant search debouncing and categories selectors for music pieces and year/type filters for client projects.
- **Contact Inquiry System**: Submits validated project briefs to MongoDB while automatically dispatching email alerts to the composer via Nodemailer.
- **Secured Admin Dashboard**: Manage compositions, services, past client works, reviews, and read through contact inbox inquiries in a tabbed panel guarded by JWT auth.

---

## Technical Stack

- **Frontend**: React.js (Vite), React Router DOM, Tailwind CSS, Framer Motion, Axios, Lucide React icons.
- **Backend**: Node.js, Express.js, JWT Authentication (jsonwebtoken & bcryptjs), CORS.
- **Database**: MongoDB (Mongoose ODM).
- **Mailer**: Nodemailer.

---

## Project Structure

```
soundfolio/
  ├── package.json         # Root scripts to run client & server concurrently
  ├── README.md            # Setup and configuration documentation
  ├── client/              # React Frontend (Vite)
  │   ├── index.html       # HTML entry point with page SEO metadata
  │   ├── tailwind.config  # Custom electric purple and metallic gold color extends
  │   └── src/
  │       ├── main.jsx     # Root React renderer
  │       ├── App.jsx      # Navigation routers and context wraps
  │       ├── index.css    # Central styling, custom scrollbars, and visual classes
  │       ├── components/  # Shared layouts, visualizers, cards, protected routes
  │       ├── pages/       # Home, About, Portfolio, Services, Projects, Contact, Login, Dashboard
  │       └── utils/       # Central Axios instance configured with JWT interceptors
  └── server/              # Express Backend (Node)
      ├── server.js        # Server entry point
      ├── config/db.js     # Mongoose database connector
      ├── models/          # Database models (User, Track, Service, Project, Testimonial, Inquiry)
      ├── controllers/     # Route controller CRUD handlers
      ├── routes/          # Router definitions
      ├── middleware/      # Admin JWT protection guard
      └── utils/           # Nodemailer mail dispatcher
```

---

## Installation & Setup

To run this application locally, you will need **Node.js** and a running **MongoDB** database instance.

### 1. Database Configuration
By default, the application tries to connect to a local MongoDB instance: `mongodb://127.0.0.1:27017/soundfolio`.

If you do not have MongoDB running locally, or would like to use a remote cloud cluster:
1. Open the file [server/.env](file:///c:/Users/thann/OneDrive/Documents/Desktop/soundfolio/server/.env).
2. Replace `MONGODB_URI` with your connection string:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/soundfolio?retryWrites=true&w=majority
   ```

### 2. Install Dependencies
From the root directory, run the install command. This installs root package manager rules, and runs installations recursively inside `client/` and `server/`:
```bash
npm run install-all
```

### 3. Bootstrap Seed Data
Seed the database with default tracks, services, testimonials, projects, and the admin user account:
```bash
npm run seed
```

> **Default Admin Account Credentials:**
> - **Email**: `admin@soundfolio.com`
> - **Password**: `adminpassword`
> *(You can sign in using this account at `/login` to access the Admin Dashboard).*

### 4. Configure Nodemailer SMTP (Optional)
To receive email notifications for client contact inquiries:
1. Configure your SMTP keys in [server/.env](file:///c:/Users/thann/OneDrive/Documents/Desktop/soundfolio/server/.env):
   ```env
   SMTP_HOST=smtp.mailtrap.io
   SMTP_PORT=2525
   SMTP_USER=your_smtp_username
   SMTP_PASS=your_smtp_password
   ADMIN_EMAIL=your_inbox@domain.com
   ```
2. If left empty, the application will simply print a detailed layout of the inquiry log in the server console for easy local debugging.

### 5. Running the Application
To launch the backend server (on port `5000`) and the Vite React frontend (on port `5173`) concurrently, run:
```bash
npm run dev
```

---

## API Routes Documentation

### Authentication
- `POST /api/auth/login` -> Validate credentials and receive JWT.
- `GET /api/auth/me` -> Verify current admin state (requires JWT).

### Music Tracks
- `GET /api/tracks` -> Public. Query tracks by category and text search query.
- `POST /api/tracks` -> Admin. Add a composition track.
- `PUT /api/tracks/:id` -> Admin. Edit details.
- `DELETE /api/tracks/:id` -> Admin. Delete composition track.

### Services
- `GET /api/services` -> Public. Retrieve services.
- `POST /api/services` -> Admin. Configure a composition service.
- `PUT /api/services/:id` -> Admin. Edit turnaround times.
- `DELETE /api/services/:id` -> Admin. Remove service.

### Client Projects
- `GET /api/projects` -> Public. Query previous client work by year and type.
- `POST /api/projects` -> Admin. Create a project thumbnail.
- `PUT /api/projects/:id` -> Admin. Modify details.
- `DELETE /api/projects/:id` -> Admin. Remove client project.

### Inquiries
- `POST /api/inquiries` -> Public. Submit contact project brief form.
- `GET /api/inquiries` -> Admin. View email inquiry log index.
- `DELETE /api/inquiries/:id` -> Admin. Dismiss/Archive message.
