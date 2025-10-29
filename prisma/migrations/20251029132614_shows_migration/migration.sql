-- CreateTable
CREATE TABLE "Shows" (
    "id" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "movieId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shows_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shows_id_key" ON "Shows"("id");

-- AddForeignKey
ALTER TABLE "Shows" ADD CONSTRAINT "Shows_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
