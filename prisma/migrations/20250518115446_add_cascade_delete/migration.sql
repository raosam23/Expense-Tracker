-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_userId_fkey";

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
