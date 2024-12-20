-- CreateTable
CREATE TABLE "employee_details" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "ph_num" TEXT,
    "dept" TEXT,
    "dob" TIMESTAMPTZ(6),
    "gender" TEXT,
    "salary" TEXT,
    "address" TEXT,
    "doj" TIMESTAMPTZ(6),

    CONSTRAINT "employee_details_pkey" PRIMARY KEY ("id")
);
