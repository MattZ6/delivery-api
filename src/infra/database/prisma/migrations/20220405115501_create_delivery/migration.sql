-- CreateTable
CREATE TABLE "deliveries" (
    "id" TEXT NOT NULL,
    "deliveryman_id" TEXT,
    "client_id" TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "delivered_at" TIMESTAMP(3),

    CONSTRAINT "deliveries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_deliveryman_id_fkey" FOREIGN KEY ("deliveryman_id") REFERENCES "deliverymans"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
