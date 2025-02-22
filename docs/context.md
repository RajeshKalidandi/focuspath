# FocusPath Context

## Purpose
FocusPath is a mobile app designed to assist individuals in overcoming masturbation addiction while fostering self-improvement, maintaining consistency in career goals, and avoiding distractions. It provides tools for tracking progress, setting goals, staying motivated, and connecting with a supportive community.

## Target Audience
- Adults (18+) seeking to break free from masturbation addiction.
- Individuals aiming to enhance self-discipline and achieve personal or career-oriented goals.

## Constraints
- Must be developed using entirely free and open-source tools, specifically Bolt.new and Cursor Agent.
- No monetary investment is allowed; rely on free trials and free tiers of services (e.g., **Supabase**).
- Built as a Progressive Web App (PWA) to leverage Bolt.new’s web-based development capabilities and meet mobile app needs.

## Technology Stack
- **Frontend**: HTML, CSS, JavaScript (using React for a responsive, modern interface).
- **Backend**: Node.js, running within Bolt.new’s WebContainers for full-stack capabilities.
- **Database**: **Supabase's PostgreSQL** for storing user data, forum posts, and goals.
- **Authentication**: **Supabase Auth** for secure user management.

## Development Tools
- **Bolt.new**: Primary development environment for building the PWA, leveraging its free tier (daily token limits).
- **Cursor Agent**: AI-assisted code editor (assumed free, based on its VSCode fork roots) to accelerate coding.
- **Supabase**: Use the free tier for authentication, database (PostgreSQL), and real-time features.

## Distribution
- **Android**: Package the PWA as an APK using PWABuilder and upload to F-Droid (a free, open-source Android app store), avoiding Google Play Store’s $25 fee.
- **iOS**: Due to the App Store’s $99/year fee, provide instructions for users to add the PWA to their home screen directly from the browser (no fee required).
- **Web**: Host the PWA on a free platform (e.g., Netlify or Vercel free tier) for direct access and installation.

## Additional Notes
- Stay within Bolt.new’s free tier by managing token usage during development.
- Use **Supabase’s free tier** for backend services, monitoring usage to avoid exceeding limits (e.g., database rows, bandwidth).
- Open-source the app’s code (e.g., on GitHub) to align with F-Droid’s requirements and community ethos.
- Leverage **Supabase’s real-time capabilities** for live updates in the community forum.