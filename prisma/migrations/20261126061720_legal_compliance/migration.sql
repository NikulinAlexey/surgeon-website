-- AlterTable
ALTER TABLE "Consent" ADD COLUMN     "revokedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "OrganizationInfo" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "fullName" TEXT NOT NULL DEFAULT '',
    "shortName" TEXT NOT NULL DEFAULT '',
    "legalAddress" TEXT NOT NULL DEFAULT '',
    "actualAddress" TEXT NOT NULL DEFAULT '',
    "licenseNumber" TEXT NOT NULL DEFAULT '',
    "licenseIssuedBy" TEXT NOT NULL DEFAULT '',
    "licenseIssueDate" TEXT NOT NULL DEFAULT '',
    "licenseValidUntil" TEXT NOT NULL DEFAULT '',
    "licenseActivities" TEXT NOT NULL DEFAULT '',
    "stateGuaranteeInfo" TEXT NOT NULL DEFAULT '',
    "appointmentInfo" TEXT NOT NULL DEFAULT '',
    "insuranceInfo" TEXT NOT NULL DEFAULT '',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrganizationInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "id" TEXT NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "qualification" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalService" (
    "id" TEXT NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" TEXT NOT NULL DEFAULT '',
    "duration" TEXT NOT NULL DEFAULT '',
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MedicalService_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Doctor_organizationId_isPublished_sortOrder_idx" ON "Doctor"("organizationId", "isPublished", "sortOrder");

-- CreateIndex
CREATE INDEX "MedicalService_organizationId_isPublished_sortOrder_idx" ON "MedicalService"("organizationId", "isPublished", "sortOrder");

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "OrganizationInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalService" ADD CONSTRAINT "MedicalService_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "OrganizationInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
