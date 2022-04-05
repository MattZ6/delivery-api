-- CreateTable
CREATE TABLE "deliveryman_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "deliveryman_id" TEXT NOT NULL,
    "expires_in" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "deliveryman_tokens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "deliveryman_tokens" ADD CONSTRAINT "deliveryman_tokens_deliveryman_id_fkey" FOREIGN KEY ("deliveryman_id") REFERENCES "deliverymans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
