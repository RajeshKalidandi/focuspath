# FocusPath Requirements

## Functional Requirements

1. **User Authentication**
   - Allow users to sign up and log in using email/password or social login options (e.g., Google).
   - Implement using **Supabase Auth** (free tier available).

2. **Progress Tracking**
   - Enable users to start a streak counter for abstaining from masturbation.
   - Provide an option to log relapses.
   - Display current streak length and historical progress (e.g., a calendar or graph).
   - Store data in **Supabase's PostgreSQL database**.

3. **Motivational Content**
   - Show daily motivational quotes or self-improvement tips.
   - Source content from a free API (e.g., Quotable) or include a static list of curated quotes.

4. **Goal Setting**
   - Allow users to set personal self-improvement or career goals with optional deadlines.
   - Track progress toward goals (e.g., percentage complete or checklist).
   - Store goals and progress in **Supabase's PostgreSQL database**.

5. **Distraction Avoidance**
   - Include a focus timer (e.g., Pomodoro-style) where users set a duration to stay focused.
   - Encourage users to remain in the app during focus sessions with gentle reminders or visuals.

6. **Community Support**
   - Provide a simple forum or message board where users can post messages and reply to others.
   - Store posts using **Supabase's PostgreSQL database** with **real-time capabilities** for live updates.

7. **Educational Resources**
   - Offer static articles or curated links to free external resources about masturbation addiction and self-improvement benefits.

## Non-Functional Requirements

1. **Performance**
   - Ensure the app loads quickly and responds to user actions within 2 seconds.

2. **Usability**
   - Design an intuitive, clean interface that’s easy to navigate, even for first-time users.

3. **Security**
   - Securely handle user data (e.g., authentication credentials, streaks) using best practices from **Supabase**.

4. **Scalability**
   - Support a reasonable number of users (e.g., hundreds) while staying within **Supabase’s free tier limits**.

5. **Compatibility**
   - Function as a Progressive Web App (PWA) compatible with major mobile browsers (Chrome, Safari, Firefox).
   - Be installable on Android and iOS devices from the browser or app stores.