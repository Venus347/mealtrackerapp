# Title
NutriBloom

# Description
NutriBloom is a full-stack diet planning application that creates personalized meal recommendations based on a user's age, height, weight, and BMI. It helps users make healthier food choices without eliminating their favorite meals by suggesting portion sizes and lower-calorie alternatives. The app features a balanced mix of American and Bangladeshi foods, nutrition information, and calorie tracking to support sustainable and realistic healthy eating habits

# Members:
    - MST
    - Nusrat
    - Jacob
    - Devonte
    - Ramanpreet





# RAMANPREET WORK


## Prisma Schema Disclosure
### Branch Disclosure: `ramanpreet`

### What I created

* **Configured Prisma Client & Datasource:**
* Generator: `provider = "prisma-client"`, `output = "../generated/prisma"`
* Datasource: `provider = "postgresql"`


* **Defined Models & Enums:**
* `MealType` (Enum: `BREAKFAST`, `LUNCH`, `DINNER`, `SNACK`)
* `Meal`
* `MealItem`


* **Implemented Relationships & Constraints:**
* `Meal` has many `MealItem` (1 : Many)
* `MealItem` belongs to `Meal` with `onDelete: Cascade` (ensuring cascading deletion of items when a meal is removed)


* **Field Mappings (`@map` / `@@map`):**
* `Meal` table → `meals` (`mealType` → `meal_type`, `totalCalories` → `total_calories`, `createdAt` → `created_at`)
* `MealItem` table → `meal_items` (`mealId` → `meal_id`, `foodName` → `food_name`)



### AI usage disclosure

* I used generative AI assistance to draft, refactor, and review this schema design.
* Reconciling the initial database design with the final NutriBloom project specification.
* Restructuring models to drop deprecated user/BMI entities and implement the `Meal` / `MealItem` relational schema.
* Configuring PostgreSQL enums, cascading deletes, and snake_case column mappings.
* Formulating step-by-step CLI migration workflows (`prisma migrate dev`).


> This schema serves as the PostgreSQL persistence layer for NutriBloom, supporting meal logging, nutritional breakdown tracking (calories, protein, carbs, fat), and cascading meal deletions.

---

## Dummy Seed Data Development & Implementation Details
### Branch Disclosure: `ramanpreet`

### Database Synchronization & Seeding Implementation
* **Schema Alignment:** Synchronized `schema.prisma` with the live PostgreSQL database structure (`meals` and `meal_items` tables) using Prisma introspection (`db pull`) to resolve schema drift.
* **Environment Configuration:** Configured the root project dependencies (`@prisma/client`, `@prisma/adapter-pg`, `@faker-js/faker`, `tsx`) and linked the seeding pipeline inside `prisma.config.ts`.
* **Seed Script Development (`prisma/seed.ts`):** 
  * Updated generated client imports to resolve from `../generated/prisma/client`.
  * Corrected payload fields to map directly to schema column names: `meal_type`, `total_calories`, and `food_name`.
  * Built relational batch seeding to generate 200 meals across a 90-day window with associated nested meal items (macronutrients, quantities, and calories).

---

### Display any day's meals
### Branch Disclosure: `ramanpreet`

**Work Done:**
* Implemented daily meals tracking and meal entry flow.
* Built backend endpoints and database support for meals, meal items, and user nutrition details.
* Added frontend components/pages for viewing and logging meals by date.
* Connected client-side state and data fetching to backend API routes.

**AI Usage Disclosure:**
* Used AI assistance to draft and review Prisma schema designs and relations.
* Used AI for code structuring, file naming conventions, and documentation support.
* Core integration, logic debugging, and final implementations were reviewed and verified manually.


---

## AI Collaboration Statement

* **Tools Used:** Gemini (Google AI)
* **Scope of Assistance:**
  * Drafted technical documentation, pull request summaries, and conceptual overviews for database synchronization and seeding workflows.
  * Assisted in structuring synthetic data generation patterns using `@faker-js/faker` within Prisma transaction methods.
* **Human Oversight & Verification:** All database schema changes, client paths, dependency installations, and seed scripts were reviewed, customized, executed, and validated directly in the local repository environment on branch `ramanpreet`.

---

## Viewing Recharts (Charts)

To see the Recharts visualizations (MacroPieChart, CalorieBarChart, BMITrendChart) locally, run these steps from the project root.

1. Install root and client dependencies:

```bash
cd /Users/ramanpreetsingh/citytech-ttpr-2026-summer/Fullstack-Smart-Diet-BMI-Tracker
npm install
cd client
npm install
```

2. Seed the database (ensure `DATABASE_URL` in `.env` is set):

```bash
cd /Users/ramanpreetsingh/citytech-ttpr-2026-summer/Fullstack-Smart-Diet-BMI-Tracker
npx prisma db seed
```

3. Start the backend API (optional — needed if you want server-driven pages/endpoints):

```bash
cd server
npm run dev
```

4. Start the client dev server and open the dashboard:

```bash
cd client
npm run dev
# Open http://localhost:5173 (Vite default) and navigate to /dashboard
# Or open the app root and click the "Dashboard" button on the Home page
```

Notes:
- If the dev server uses a different port, follow the terminal output link (Vite prints the local URL).
- The dashboard page is at `/dashboard`; the Home page includes a quick navigation button to the Dashboard.

---

## Recharts Display Implementation (What I did)

Branch: `ramanpreet`

- **Files added:**
  - [client/src/components/charts/MacroPieChart.tsx](client/src/components/charts/MacroPieChart.tsx)
  - [client/src/components/charts/CalorieBarChart.tsx](client/src/components/charts/CalorieBarChart.tsx)
  - [client/src/components/charts/BMITrendChart.tsx](client/src/components/charts/BMITrendChart.tsx)
  - [client/src/pages/Dashboard.tsx](client/src/pages/Dashboard.tsx)

- **Client routing & navigation:**
  - Added a `/dashboard` route in [client/src/App.tsx](client/src/App.tsx#L1) and a Dashboard button on the Home page ([client/src/pages/Home.tsx](client/src/pages/Home.tsx#L1)).

- **Dependencies:**
  - Added `recharts` to `client/package.json` and installed it locally.

- **Seed & data flow:**
  - Created/updated `prisma/seed.ts` to generate dummy users, BMI history and meals.
  - Verified seed data via `npx prisma db seed` and optionally `npx prisma studio`.

- **How the charts are wired:**
  - Charts are self-contained React components using static demo data by default (in the chart files) so the Dashboard renders immediately.
  - To wire charts to real seeded data: implement a fetch to the backend endpoint (e.g. `/day-meals`) from `Dashboard` or a child component, map DB fields to chart data shapes, and pass results as props to the chart components.

---

## AI usage for Recharts and wiring

- **Scope of AI help:**
  - Generated initial chart component templates (`MacroPieChart`, `CalorieBarChart`, `BMITrendChart`) and suggested layout and props for `recharts` components.
  - Suggested where to add the `Dashboard` page and how to wire routes in `client/src/App.tsx`.
  - Helped draft the seed script and the README run instructions.

- **Human verification:**
  - I reviewed and adapted all generated code, verified file placement, updated `client/package.json`, and tested the dev server wiring locally.

---

## Git push (branch `ramanpreet`)

To push these changes to your branch:

```bash
git checkout -b ramanpreet
git add README.md prisma/seed.ts client/src/components/charts client/src/pages/Dashboard.tsx client/src/App.tsx client/src/pages/Home.tsx client/package.json
git commit -m "Add Recharts dashboard, seed script, and README disclosure"
git push origin ramanpreet
```

