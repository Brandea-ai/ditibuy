import { PrismaClient, DeviceCategory } from '@prisma/client'

/* ============================================
   SEED SCRIPT – BayernAnkauf
   Phase 2: Domain & Datenbank

   Erstellt Beispiel-Daten für:
   - DeviceModels (Geräte-Katalog)
   ============================================ */

const prisma = new PrismaClient()

// Hilfsfunktion für Slug-Generierung
function generateSlug(brand: string, model: string, storage?: number): string {
  const base = `${brand}-${model}`.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return storage ? `${base}-${storage}gb` : base
}

// Geräte-Daten
const deviceModels = [
  // ============================================
  // APPLE iPHONES
  // ============================================
  {
    category: 'SMARTPHONE' as DeviceCategory,
    brand: 'Apple',
    modelName: 'iPhone 15 Pro Max',
    storageGb: 256,
    releaseYear: 2023,
    basePriceEuro: 850,
    isFeatured: true,
  },
  {
    category: 'SMARTPHONE' as DeviceCategory,
    brand: 'Apple',
    modelName: 'iPhone 15 Pro Max',
    storageGb: 512,
    releaseYear: 2023,
    basePriceEuro: 950,
    isFeatured: true,
  },
  {
    category: 'SMARTPHONE' as DeviceCategory,
    brand: 'Apple',
    modelName: 'iPhone 15 Pro Max',
    storageGb: 1024,
    releaseYear: 2023,
    basePriceEuro: 1050,
  },
  {
    category: 'SMARTPHONE' as DeviceCategory,
    brand: 'Apple',
    modelName: 'iPhone 15 Pro',
    storageGb: 128,
    releaseYear: 2023,
    basePriceEuro: 700,
    isFeatured: true,
  },
  {
    category: 'SMARTPHONE' as DeviceCategory,
    brand: 'Apple',
    modelName: 'iPhone 15 Pro',
    storageGb: 256,
    releaseYear: 2023,
    basePriceEuro: 780,
  },
  {
    category: 'SMARTPHONE' as DeviceCategory,
    brand: 'Apple',
    modelName: 'iPhone 15',
    storageGb: 128,
    releaseYear: 2023,
    basePriceEuro: 550,
  },
  {
    category: 'SMARTPHONE' as DeviceCategory,
    brand: 'Apple',
    modelName: 'iPhone 15',
    storageGb: 256,
    releaseYear: 2023,
    basePriceEuro: 620,
  },
  {
    category: 'SMARTPHONE' as DeviceCategory,
    brand: 'Apple',
    modelName: 'iPhone 14 Pro Max',
    storageGb: 128,
    releaseYear: 2022,
    basePriceEuro: 650,
  },
  {
    category: 'SMARTPHONE' as DeviceCategory,
    brand: 'Apple',
    modelName: 'iPhone 14 Pro Max',
    storageGb: 256,
    releaseYear: 2022,
    basePriceEuro: 720,
  },
  {
    category: 'SMARTPHONE' as DeviceCategory,
    brand: 'Apple',
    modelName: 'iPhone 14 Pro',
    storageGb: 128,
    releaseYear: 2022,
    basePriceEuro: 550,
  },
  {
    category: 'SMARTPHONE' as DeviceCategory,
    brand: 'Apple',
    modelName: 'iPhone 14',
    storageGb: 128,
    releaseYear: 2022,
    basePriceEuro: 450,
  },
  {
    category: 'SMARTPHONE' as DeviceCategory,
    brand: 'Apple',
    modelName: 'iPhone 13 Pro Max',
    storageGb: 128,
    releaseYear: 2021,
    basePriceEuro: 480,
  },
  {
    category: 'SMARTPHONE' as DeviceCategory,
    brand: 'Apple',
    modelName: 'iPhone 13 Pro',
    storageGb: 128,
    releaseYear: 2021,
    basePriceEuro: 420,
  },
  {
    category: 'SMARTPHONE' as DeviceCategory,
    brand: 'Apple',
    modelName: 'iPhone 13',
    storageGb: 128,
    releaseYear: 2021,
    basePriceEuro: 380,
  },
  {
    category: 'SMARTPHONE' as DeviceCategory,
    brand: 'Apple',
    modelName: 'iPhone 12 Pro',
    storageGb: 128,
    releaseYear: 2020,
    basePriceEuro: 320,
  },
  {
    category: 'SMARTPHONE' as DeviceCategory,
    brand: 'Apple',
    modelName: 'iPhone 12',
    storageGb: 64,
    releaseYear: 2020,
    basePriceEuro: 250,
  },
  {
    category: 'SMARTPHONE' as DeviceCategory,
    brand: 'Apple',
    modelName: 'iPhone SE (2022)',
    storageGb: 64,
    releaseYear: 2022,
    basePriceEuro: 200,
  },

  // ============================================
  // SAMSUNG GALAXY
  // ============================================
  {
    category: 'SMARTPHONE' as DeviceCategory,
    brand: 'Samsung',
    modelName: 'Galaxy S24 Ultra',
    storageGb: 256,
    releaseYear: 2024,
    basePriceEuro: 750,
    isFeatured: true,
  },
  {
    category: 'SMARTPHONE' as DeviceCategory,
    brand: 'Samsung',
    modelName: 'Galaxy S24 Ultra',
    storageGb: 512,
    releaseYear: 2024,
    basePriceEuro: 850,
  },
  {
    category: 'SMARTPHONE' as DeviceCategory,
    brand: 'Samsung',
    modelName: 'Galaxy S24+',
    storageGb: 256,
    releaseYear: 2024,
    basePriceEuro: 550,
  },
  {
    category: 'SMARTPHONE' as DeviceCategory,
    brand: 'Samsung',
    modelName: 'Galaxy S24',
    storageGb: 128,
    releaseYear: 2024,
    basePriceEuro: 450,
  },
  {
    category: 'SMARTPHONE' as DeviceCategory,
    brand: 'Samsung',
    modelName: 'Galaxy S23 Ultra',
    storageGb: 256,
    releaseYear: 2023,
    basePriceEuro: 580,
  },
  {
    category: 'SMARTPHONE' as DeviceCategory,
    brand: 'Samsung',
    modelName: 'Galaxy S23',
    storageGb: 128,
    releaseYear: 2023,
    basePriceEuro: 400,
  },
  {
    category: 'SMARTPHONE' as DeviceCategory,
    brand: 'Samsung',
    modelName: 'Galaxy Z Fold5',
    storageGb: 256,
    releaseYear: 2023,
    basePriceEuro: 900,
    isFeatured: true,
  },
  {
    category: 'SMARTPHONE' as DeviceCategory,
    brand: 'Samsung',
    modelName: 'Galaxy Z Flip5',
    storageGb: 256,
    releaseYear: 2023,
    basePriceEuro: 550,
  },
  {
    category: 'SMARTPHONE' as DeviceCategory,
    brand: 'Samsung',
    modelName: 'Galaxy A54',
    storageGb: 128,
    releaseYear: 2023,
    basePriceEuro: 180,
  },

  // ============================================
  // GOOGLE PIXEL
  // ============================================
  {
    category: 'SMARTPHONE' as DeviceCategory,
    brand: 'Google',
    modelName: 'Pixel 8 Pro',
    storageGb: 128,
    releaseYear: 2023,
    basePriceEuro: 480,
  },
  {
    category: 'SMARTPHONE' as DeviceCategory,
    brand: 'Google',
    modelName: 'Pixel 8',
    storageGb: 128,
    releaseYear: 2023,
    basePriceEuro: 380,
  },
  {
    category: 'SMARTPHONE' as DeviceCategory,
    brand: 'Google',
    modelName: 'Pixel 7 Pro',
    storageGb: 128,
    releaseYear: 2022,
    basePriceEuro: 320,
  },

  // ============================================
  // APPLE iPADS
  // ============================================
  {
    category: 'TABLET' as DeviceCategory,
    brand: 'Apple',
    modelName: 'iPad Pro 12.9" (M2)',
    storageGb: 256,
    releaseYear: 2022,
    basePriceEuro: 700,
    isFeatured: true,
  },
  {
    category: 'TABLET' as DeviceCategory,
    brand: 'Apple',
    modelName: 'iPad Pro 12.9" (M2)',
    storageGb: 512,
    releaseYear: 2022,
    basePriceEuro: 850,
  },
  {
    category: 'TABLET' as DeviceCategory,
    brand: 'Apple',
    modelName: 'iPad Pro 11" (M2)',
    storageGb: 256,
    releaseYear: 2022,
    basePriceEuro: 550,
  },
  {
    category: 'TABLET' as DeviceCategory,
    brand: 'Apple',
    modelName: 'iPad Air (M1)',
    storageGb: 64,
    releaseYear: 2022,
    basePriceEuro: 350,
  },
  {
    category: 'TABLET' as DeviceCategory,
    brand: 'Apple',
    modelName: 'iPad Air (M1)',
    storageGb: 256,
    releaseYear: 2022,
    basePriceEuro: 420,
  },
  {
    category: 'TABLET' as DeviceCategory,
    brand: 'Apple',
    modelName: 'iPad (10. Gen)',
    storageGb: 64,
    releaseYear: 2022,
    basePriceEuro: 280,
  },
  {
    category: 'TABLET' as DeviceCategory,
    brand: 'Apple',
    modelName: 'iPad mini (6. Gen)',
    storageGb: 64,
    releaseYear: 2021,
    basePriceEuro: 300,
  },

  // ============================================
  // SAMSUNG TABLETS
  // ============================================
  {
    category: 'TABLET' as DeviceCategory,
    brand: 'Samsung',
    modelName: 'Galaxy Tab S9 Ultra',
    storageGb: 256,
    releaseYear: 2023,
    basePriceEuro: 650,
  },
  {
    category: 'TABLET' as DeviceCategory,
    brand: 'Samsung',
    modelName: 'Galaxy Tab S9+',
    storageGb: 256,
    releaseYear: 2023,
    basePriceEuro: 500,
  },
  {
    category: 'TABLET' as DeviceCategory,
    brand: 'Samsung',
    modelName: 'Galaxy Tab S9',
    storageGb: 128,
    releaseYear: 2023,
    basePriceEuro: 400,
  },

  // ============================================
  // APPLE MACBOOKS
  // ============================================
  {
    category: 'LAPTOP' as DeviceCategory,
    brand: 'Apple',
    modelName: 'MacBook Pro 16" (M3 Max)',
    storageGb: 512,
    releaseYear: 2023,
    basePriceEuro: 1800,
    isFeatured: true,
  },
  {
    category: 'LAPTOP' as DeviceCategory,
    brand: 'Apple',
    modelName: 'MacBook Pro 16" (M3 Pro)',
    storageGb: 512,
    releaseYear: 2023,
    basePriceEuro: 1400,
  },
  {
    category: 'LAPTOP' as DeviceCategory,
    brand: 'Apple',
    modelName: 'MacBook Pro 14" (M3 Pro)',
    storageGb: 512,
    releaseYear: 2023,
    basePriceEuro: 1200,
  },
  {
    category: 'LAPTOP' as DeviceCategory,
    brand: 'Apple',
    modelName: 'MacBook Pro 14" (M3)',
    storageGb: 512,
    releaseYear: 2023,
    basePriceEuro: 950,
  },
  {
    category: 'LAPTOP' as DeviceCategory,
    brand: 'Apple',
    modelName: 'MacBook Air 15" (M2)',
    storageGb: 256,
    releaseYear: 2023,
    basePriceEuro: 850,
  },
  {
    category: 'LAPTOP' as DeviceCategory,
    brand: 'Apple',
    modelName: 'MacBook Air 13" (M2)',
    storageGb: 256,
    releaseYear: 2022,
    basePriceEuro: 750,
    isFeatured: true,
  },
  {
    category: 'LAPTOP' as DeviceCategory,
    brand: 'Apple',
    modelName: 'MacBook Air 13" (M2)',
    storageGb: 512,
    releaseYear: 2022,
    basePriceEuro: 850,
  },
  {
    category: 'LAPTOP' as DeviceCategory,
    brand: 'Apple',
    modelName: 'MacBook Air 13" (M1)',
    storageGb: 256,
    releaseYear: 2020,
    basePriceEuro: 550,
  },

  // ============================================
  // APPLE WATCHES
  // ============================================
  {
    category: 'SMARTWATCH' as DeviceCategory,
    brand: 'Apple',
    modelName: 'Apple Watch Ultra 2',
    storageGb: 64,
    releaseYear: 2023,
    basePriceEuro: 450,
    isFeatured: true,
  },
  {
    category: 'SMARTWATCH' as DeviceCategory,
    brand: 'Apple',
    modelName: 'Apple Watch Series 9 (45mm)',
    storageGb: 64,
    releaseYear: 2023,
    basePriceEuro: 280,
  },
  {
    category: 'SMARTWATCH' as DeviceCategory,
    brand: 'Apple',
    modelName: 'Apple Watch Series 9 (41mm)',
    storageGb: 64,
    releaseYear: 2023,
    basePriceEuro: 250,
  },
  {
    category: 'SMARTWATCH' as DeviceCategory,
    brand: 'Apple',
    modelName: 'Apple Watch SE (2. Gen)',
    storageGb: 32,
    releaseYear: 2022,
    basePriceEuro: 150,
  },

  // ============================================
  // SAMSUNG WATCHES
  // ============================================
  {
    category: 'SMARTWATCH' as DeviceCategory,
    brand: 'Samsung',
    modelName: 'Galaxy Watch 6 Classic',
    storageGb: 16,
    releaseYear: 2023,
    basePriceEuro: 200,
  },
  {
    category: 'SMARTWATCH' as DeviceCategory,
    brand: 'Samsung',
    modelName: 'Galaxy Watch 6',
    storageGb: 16,
    releaseYear: 2023,
    basePriceEuro: 150,
  },

  // ============================================
  // SPIELKONSOLEN
  // ============================================
  {
    category: 'KONSOLE' as DeviceCategory,
    brand: 'Sony',
    modelName: 'PlayStation 5',
    storageGb: 825,
    releaseYear: 2020,
    basePriceEuro: 350,
    isFeatured: true,
  },
  {
    category: 'KONSOLE' as DeviceCategory,
    brand: 'Sony',
    modelName: 'PlayStation 5 Digital Edition',
    storageGb: 825,
    releaseYear: 2020,
    basePriceEuro: 300,
  },
  {
    category: 'KONSOLE' as DeviceCategory,
    brand: 'Sony',
    modelName: 'PlayStation 4 Pro',
    storageGb: 1000,
    releaseYear: 2016,
    basePriceEuro: 150,
  },
  {
    category: 'KONSOLE' as DeviceCategory,
    brand: 'Microsoft',
    modelName: 'Xbox Series X',
    storageGb: 1000,
    releaseYear: 2020,
    basePriceEuro: 320,
    isFeatured: true,
  },
  {
    category: 'KONSOLE' as DeviceCategory,
    brand: 'Microsoft',
    modelName: 'Xbox Series S',
    storageGb: 512,
    releaseYear: 2020,
    basePriceEuro: 180,
  },
  {
    category: 'KONSOLE' as DeviceCategory,
    brand: 'Nintendo',
    modelName: 'Switch OLED',
    storageGb: 64,
    releaseYear: 2021,
    basePriceEuro: 200,
  },
  {
    category: 'KONSOLE' as DeviceCategory,
    brand: 'Nintendo',
    modelName: 'Switch',
    storageGb: 32,
    releaseYear: 2017,
    basePriceEuro: 150,
  },
  {
    category: 'KONSOLE' as DeviceCategory,
    brand: 'Nintendo',
    modelName: 'Switch Lite',
    storageGb: 32,
    releaseYear: 2019,
    basePriceEuro: 100,
  },
  {
    category: 'KONSOLE' as DeviceCategory,
    brand: 'Valve',
    modelName: 'Steam Deck',
    storageGb: 512,
    releaseYear: 2022,
    basePriceEuro: 350,
  },
]

async function main() {
  console.log('🌱 Starting seed...')

  // DeviceModels erstellen
  console.log('📱 Creating device models...')

  for (const device of deviceModels) {
    const slug = generateSlug(device.brand, device.modelName, device.storageGb)

    await prisma.deviceModel.upsert({
      where: {
        brand_modelName_storageGb: {
          brand: device.brand,
          modelName: device.modelName,
          storageGb: device.storageGb ?? 0,
        },
      },
      update: {
        basePriceEuro: device.basePriceEuro,
        isFeatured: device.isFeatured ?? false,
        isActive: true,
      },
      create: {
        category: device.category,
        brand: device.brand,
        modelName: device.modelName,
        storageGb: device.storageGb,
        releaseYear: device.releaseYear,
        basePriceEuro: device.basePriceEuro,
        isFeatured: device.isFeatured ?? false,
        slug,
      },
    })
  }

  const count = await prisma.deviceModel.count()
  console.log(`✅ Created/Updated ${count} device models`)

  // Statistiken ausgeben
  const categories = await prisma.deviceModel.groupBy({
    by: ['category'],
    _count: true,
  })

  console.log('\n📊 Devices by category:')
  for (const cat of categories) {
    console.log(`   ${cat.category}: ${cat._count}`)
  }

  const featured = await prisma.deviceModel.count({
    where: { isFeatured: true },
  })
  console.log(`\n⭐ Featured devices: ${featured}`)

  console.log('\n🎉 Seed completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
