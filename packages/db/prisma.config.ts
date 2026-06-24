import "dotenv/config";

export default {
    schema: "prisma/schema.prisma",
    mirations: {
        path: "prisma/migrations",
        seed: "tsx prisma/seed.ts"
    },
    datasource: {
        url: process.env.DATABASE_URL
    },
};
