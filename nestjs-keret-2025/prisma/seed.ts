import { faker } from '@faker-js/faker'
import dotenv from 'dotenv'
import { PrismaClient } from 'generated/prisma/client'
dotenv.config()
console.log('Seeding...')
const prisma = new PrismaClient()
const eloreDefinialtSzinek = ['Piros', 'Kék', 'Zöld', 'Fekete', 'Fehér']
async function main() {
  

    for (let i = 0; i < 15; i++) {
      await prisma.termek.create({
        data: {
        nev: faker.commerce.productName(),
        ar: parseInt(faker.commerce.price({ min: 1000, max: 100000, dec: 0 })),
        raktariDarabszam: faker.number.int({ min: 0, max: 100 }),
        szin: faker.helpers.arrayElement(eloreDefinialtSzinek),
        ertekeles: faker.number.int({ min: 0, max: 10 }),
        kiadasEve: faker.number.int({ min: 2010, max: 2026 }),
        publikalt: faker.datatype.boolean(),
          

        }
      })
    }
  

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })



