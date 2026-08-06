-- CreateTable
CREATE TABLE "user" (
    "uuid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "user_info" (
    "uuid" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "sex" TEXT NOT NULL,
    "bmi" DOUBLE PRECISION NOT NULL,
    "activity_frequency" TEXT NOT NULL,
    "activity_type" TEXT NOT NULL,
    "fitness_goal" TEXT NOT NULL,

    CONSTRAINT "user_info_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "meals" (
    "meal_id" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "meals_pkey" PRIMARY KEY ("meal_id")
);

-- CreateTable
CREATE TABLE "meal_items" (
    "id" SERIAL NOT NULL,
    "meal_id" TEXT NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "carbs" DOUBLE PRECISION NOT NULL,
    "sugar" DOUBLE PRECISION NOT NULL,
    "fat" DOUBLE PRECISION NOT NULL,
    "energy_kcal" DOUBLE PRECISION NOT NULL,
    "portion" TEXT NOT NULL,

    CONSTRAINT "meal_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "user_info" ADD CONSTRAINT "user_info_uuid_fkey" FOREIGN KEY ("uuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_uuid_fkey" FOREIGN KEY ("uuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_items" ADD CONSTRAINT "meal_items_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meals"("meal_id") ON DELETE CASCADE ON UPDATE CASCADE;
