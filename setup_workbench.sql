-- Open MySQL Workbench and run this script to create the required database for PrepZone.

CREATE DATABASE IF NOT EXISTS aptitude_portal DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Switch to the newly created database
USE aptitude_portal;

-- Once this is executed successfully, run the following command in your terminal:
-- npm run prisma db push
-- or
-- npx prisma db push
