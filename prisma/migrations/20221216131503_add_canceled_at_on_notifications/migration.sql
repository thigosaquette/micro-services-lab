-- AlterTable
ALTER TABLE "Notification" ADD COLUMN "canceledAt" DATETIME;

-- RedefineIndex
DROP INDEX "Notification_recipentId_idx";
CREATE INDEX "Notification_recipientId_idx" ON "Notification"("recipientId");
