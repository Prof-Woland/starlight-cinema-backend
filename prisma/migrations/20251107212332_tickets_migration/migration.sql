-- CreateTable
CREATE TABLE "Tickets" (
    "id" TEXT NOT NULL,
    "row" INTEGER NOT NULL,
    "place" INTEGER NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "showId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tickets_id_key" ON "Tickets"("id");

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_showId_fkey" FOREIGN KEY ("showId") REFERENCES "Shows"("id") ON DELETE CASCADE ON UPDATE CASCADE;
