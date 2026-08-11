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


## Development & Implementation Details

### Database Synchronization & Seeding Implementation
* **Schema Alignment:** Synchronized `schema.prisma` with the live PostgreSQL database structure (`meals` and `meal_items` tables) using Prisma introspection (`db pull`) to resolve schema drift.
* **Environment Configuration:** Configured the root project dependencies (`@prisma/client`, `@prisma/adapter-pg`, `@faker-js/faker`, `tsx`) and linked the seeding pipeline inside `prisma.config.ts`.
* **Seed Script Development (`prisma/seed.ts`):** 
  * Updated generated client imports to resolve from `../generated/prisma/client`.
  * Corrected payload fields to map directly to schema column names: `meal_type`, `total_calories`, and `food_name`.
  * Built relational batch seeding to generate 200 meals across a 90-day window with associated nested meal items (macronutrients, quantities, and calories).

---

## AI Collaboration Statement

* **Tools Used:** Gemini (Google AI)
* **Scope of Assistance:**
  * Drafted technical documentation, pull request summaries, and conceptual overviews for database synchronization and seeding workflows.
  * Assisted in structuring synthetic data generation patterns using `@faker-js/faker` within Prisma transaction methods.
* **Human Oversight & Verification:** All database schema changes, client paths, dependency installations, and seed scripts were reviewed, customized, executed, and validated directly in the local repository environment on branch `ramanpreet`.