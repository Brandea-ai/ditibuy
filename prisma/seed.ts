import { PrismaClient, DeviceCategory } from '@prisma/client'

/* ============================================
   SEED SCRIPT – BayernAnkauf
   MASSIVE PRODUCT DATABASE

   Alle relevanten Geräte der letzten 3 Jahre
   mit realistischen Ankaufpreisen

   Preiskalkulation:
   - Ankaufpreis = ~40-55% des aktuellen Marktwertes
   - Ermöglicht 25-35% Gewinnmarge beim Weiterverkauf
   ============================================ */

const prisma = new PrismaClient()

function generateSlug(brand: string, model: string, storage?: number): string {
  const base = `${brand}-${model}`.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return storage ? `${base}-${storage}gb` : base
}

interface DeviceData {
  category: DeviceCategory
  brand: string
  modelName: string
  storageGb?: number
  releaseYear: number
  basePriceEuro: number
  isFeatured?: boolean
}

const deviceModels: DeviceData[] = [
  // ============================================
  // APPLE iPHONE 16 SERIE (2024) - NEUESTE
  // ============================================
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 16 Pro Max', storageGb: 256, releaseYear: 2024, basePriceEuro: 980, isFeatured: true },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 16 Pro Max', storageGb: 512, releaseYear: 2024, basePriceEuro: 1080 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 16 Pro Max', storageGb: 1024, releaseYear: 2024, basePriceEuro: 1180 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 16 Pro', storageGb: 128, releaseYear: 2024, basePriceEuro: 820, isFeatured: true },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 16 Pro', storageGb: 256, releaseYear: 2024, basePriceEuro: 880 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 16 Pro', storageGb: 512, releaseYear: 2024, basePriceEuro: 980 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 16 Pro', storageGb: 1024, releaseYear: 2024, basePriceEuro: 1080 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 16 Plus', storageGb: 128, releaseYear: 2024, basePriceEuro: 680 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 16 Plus', storageGb: 256, releaseYear: 2024, basePriceEuro: 740 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 16 Plus', storageGb: 512, releaseYear: 2024, basePriceEuro: 840 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 16', storageGb: 128, releaseYear: 2024, basePriceEuro: 620 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 16', storageGb: 256, releaseYear: 2024, basePriceEuro: 680 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 16', storageGb: 512, releaseYear: 2024, basePriceEuro: 780 },

  // ============================================
  // APPLE iPHONE 15 SERIE (2023)
  // ============================================
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 15 Pro Max', storageGb: 256, releaseYear: 2023, basePriceEuro: 850, isFeatured: true },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 15 Pro Max', storageGb: 512, releaseYear: 2023, basePriceEuro: 950 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 15 Pro Max', storageGb: 1024, releaseYear: 2023, basePriceEuro: 1050 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 15 Pro', storageGb: 128, releaseYear: 2023, basePriceEuro: 700 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 15 Pro', storageGb: 256, releaseYear: 2023, basePriceEuro: 780 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 15 Pro', storageGb: 512, releaseYear: 2023, basePriceEuro: 880 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 15 Pro', storageGb: 1024, releaseYear: 2023, basePriceEuro: 980 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 15 Plus', storageGb: 128, releaseYear: 2023, basePriceEuro: 580 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 15 Plus', storageGb: 256, releaseYear: 2023, basePriceEuro: 640 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 15 Plus', storageGb: 512, releaseYear: 2023, basePriceEuro: 740 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 15', storageGb: 128, releaseYear: 2023, basePriceEuro: 520 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 15', storageGb: 256, releaseYear: 2023, basePriceEuro: 580 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 15', storageGb: 512, releaseYear: 2023, basePriceEuro: 680 },

  // ============================================
  // APPLE iPHONE 14 SERIE (2022)
  // ============================================
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 14 Pro Max', storageGb: 128, releaseYear: 2022, basePriceEuro: 650 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 14 Pro Max', storageGb: 256, releaseYear: 2022, basePriceEuro: 720 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 14 Pro Max', storageGb: 512, releaseYear: 2022, basePriceEuro: 820 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 14 Pro Max', storageGb: 1024, releaseYear: 2022, basePriceEuro: 920 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 14 Pro', storageGb: 128, releaseYear: 2022, basePriceEuro: 550 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 14 Pro', storageGb: 256, releaseYear: 2022, basePriceEuro: 620 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 14 Pro', storageGb: 512, releaseYear: 2022, basePriceEuro: 720 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 14 Pro', storageGb: 1024, releaseYear: 2022, basePriceEuro: 820 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 14 Plus', storageGb: 128, releaseYear: 2022, basePriceEuro: 480 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 14 Plus', storageGb: 256, releaseYear: 2022, basePriceEuro: 540 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 14 Plus', storageGb: 512, releaseYear: 2022, basePriceEuro: 640 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 14', storageGb: 128, releaseYear: 2022, basePriceEuro: 420 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 14', storageGb: 256, releaseYear: 2022, basePriceEuro: 480 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 14', storageGb: 512, releaseYear: 2022, basePriceEuro: 580 },

  // ============================================
  // APPLE iPHONE 13 SERIE (2021)
  // ============================================
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 13 Pro Max', storageGb: 128, releaseYear: 2021, basePriceEuro: 520 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 13 Pro Max', storageGb: 256, releaseYear: 2021, basePriceEuro: 580 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 13 Pro Max', storageGb: 512, releaseYear: 2021, basePriceEuro: 680 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 13 Pro Max', storageGb: 1024, releaseYear: 2021, basePriceEuro: 780 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 13 Pro', storageGb: 128, releaseYear: 2021, basePriceEuro: 450 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 13 Pro', storageGb: 256, releaseYear: 2021, basePriceEuro: 510 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 13 Pro', storageGb: 512, releaseYear: 2021, basePriceEuro: 610 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 13 Pro', storageGb: 1024, releaseYear: 2021, basePriceEuro: 710 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 13', storageGb: 128, releaseYear: 2021, basePriceEuro: 380 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 13', storageGb: 256, releaseYear: 2021, basePriceEuro: 430 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 13', storageGb: 512, releaseYear: 2021, basePriceEuro: 530 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 13 mini', storageGb: 128, releaseYear: 2021, basePriceEuro: 320 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 13 mini', storageGb: 256, releaseYear: 2021, basePriceEuro: 370 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 13 mini', storageGb: 512, releaseYear: 2021, basePriceEuro: 470 },

  // ============================================
  // APPLE iPHONE 12 SERIE (2020)
  // ============================================
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 12 Pro Max', storageGb: 128, releaseYear: 2020, basePriceEuro: 420 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 12 Pro Max', storageGb: 256, releaseYear: 2020, basePriceEuro: 470 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 12 Pro Max', storageGb: 512, releaseYear: 2020, basePriceEuro: 550 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 12 Pro', storageGb: 128, releaseYear: 2020, basePriceEuro: 350 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 12 Pro', storageGb: 256, releaseYear: 2020, basePriceEuro: 400 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 12 Pro', storageGb: 512, releaseYear: 2020, basePriceEuro: 480 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 12', storageGb: 64, releaseYear: 2020, basePriceEuro: 260 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 12', storageGb: 128, releaseYear: 2020, basePriceEuro: 300 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 12', storageGb: 256, releaseYear: 2020, basePriceEuro: 350 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 12 mini', storageGb: 64, releaseYear: 2020, basePriceEuro: 220 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 12 mini', storageGb: 128, releaseYear: 2020, basePriceEuro: 260 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 12 mini', storageGb: 256, releaseYear: 2020, basePriceEuro: 310 },

  // ============================================
  // APPLE iPHONE SE
  // ============================================
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone SE (2022)', storageGb: 64, releaseYear: 2022, basePriceEuro: 200 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone SE (2022)', storageGb: 128, releaseYear: 2022, basePriceEuro: 230 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone SE (2022)', storageGb: 256, releaseYear: 2022, basePriceEuro: 280 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone SE (2020)', storageGb: 64, releaseYear: 2020, basePriceEuro: 140 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone SE (2020)', storageGb: 128, releaseYear: 2020, basePriceEuro: 170 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone SE (2020)', storageGb: 256, releaseYear: 2020, basePriceEuro: 210 },

  // ============================================
  // SAMSUNG GALAXY S24 SERIE (2024)
  // ============================================
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S24 Ultra', storageGb: 256, releaseYear: 2024, basePriceEuro: 780, isFeatured: true },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S24 Ultra', storageGb: 512, releaseYear: 2024, basePriceEuro: 880 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S24 Ultra', storageGb: 1024, releaseYear: 2024, basePriceEuro: 980 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S24+', storageGb: 256, releaseYear: 2024, basePriceEuro: 580 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S24+', storageGb: 512, releaseYear: 2024, basePriceEuro: 680 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S24', storageGb: 128, releaseYear: 2024, basePriceEuro: 450 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S24', storageGb: 256, releaseYear: 2024, basePriceEuro: 520 },

  // ============================================
  // SAMSUNG GALAXY S23 SERIE (2023)
  // ============================================
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S23 Ultra', storageGb: 256, releaseYear: 2023, basePriceEuro: 620 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S23 Ultra', storageGb: 512, releaseYear: 2023, basePriceEuro: 720 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S23 Ultra', storageGb: 1024, releaseYear: 2023, basePriceEuro: 820 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S23+', storageGb: 256, releaseYear: 2023, basePriceEuro: 480 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S23+', storageGb: 512, releaseYear: 2023, basePriceEuro: 560 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S23', storageGb: 128, releaseYear: 2023, basePriceEuro: 380 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S23', storageGb: 256, releaseYear: 2023, basePriceEuro: 440 },

  // ============================================
  // SAMSUNG GALAXY S22 SERIE (2022)
  // ============================================
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S22 Ultra', storageGb: 128, releaseYear: 2022, basePriceEuro: 480 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S22 Ultra', storageGb: 256, releaseYear: 2022, basePriceEuro: 540 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S22 Ultra', storageGb: 512, releaseYear: 2022, basePriceEuro: 620 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S22 Ultra', storageGb: 1024, releaseYear: 2022, basePriceEuro: 720 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S22+', storageGb: 128, releaseYear: 2022, basePriceEuro: 380 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S22+', storageGb: 256, releaseYear: 2022, basePriceEuro: 440 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S22', storageGb: 128, releaseYear: 2022, basePriceEuro: 300 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S22', storageGb: 256, releaseYear: 2022, basePriceEuro: 360 },

  // ============================================
  // SAMSUNG GALAXY S21 SERIE (2021)
  // ============================================
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S21 Ultra', storageGb: 128, releaseYear: 2021, basePriceEuro: 380 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S21 Ultra', storageGb: 256, releaseYear: 2021, basePriceEuro: 430 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S21 Ultra', storageGb: 512, releaseYear: 2021, basePriceEuro: 510 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S21+', storageGb: 128, releaseYear: 2021, basePriceEuro: 300 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S21+', storageGb: 256, releaseYear: 2021, basePriceEuro: 350 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S21', storageGb: 128, releaseYear: 2021, basePriceEuro: 240 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S21', storageGb: 256, releaseYear: 2021, basePriceEuro: 290 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S21 FE', storageGb: 128, releaseYear: 2022, basePriceEuro: 220 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S21 FE', storageGb: 256, releaseYear: 2022, basePriceEuro: 270 },

  // ============================================
  // SAMSUNG GALAXY Z FOLD SERIE
  // ============================================
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy Z Fold6', storageGb: 256, releaseYear: 2024, basePriceEuro: 1100, isFeatured: true },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy Z Fold6', storageGb: 512, releaseYear: 2024, basePriceEuro: 1200 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy Z Fold6', storageGb: 1024, releaseYear: 2024, basePriceEuro: 1350 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy Z Fold5', storageGb: 256, releaseYear: 2023, basePriceEuro: 900 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy Z Fold5', storageGb: 512, releaseYear: 2023, basePriceEuro: 1000 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy Z Fold5', storageGb: 1024, releaseYear: 2023, basePriceEuro: 1150 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy Z Fold4', storageGb: 256, releaseYear: 2022, basePriceEuro: 720 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy Z Fold4', storageGb: 512, releaseYear: 2022, basePriceEuro: 820 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy Z Fold4', storageGb: 1024, releaseYear: 2022, basePriceEuro: 950 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy Z Fold3', storageGb: 256, releaseYear: 2021, basePriceEuro: 550 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy Z Fold3', storageGb: 512, releaseYear: 2021, basePriceEuro: 650 },

  // ============================================
  // SAMSUNG GALAXY Z FLIP SERIE
  // ============================================
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy Z Flip6', storageGb: 256, releaseYear: 2024, basePriceEuro: 680, isFeatured: true },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy Z Flip6', storageGb: 512, releaseYear: 2024, basePriceEuro: 780 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy Z Flip5', storageGb: 256, releaseYear: 2023, basePriceEuro: 550 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy Z Flip5', storageGb: 512, releaseYear: 2023, basePriceEuro: 650 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy Z Flip4', storageGb: 128, releaseYear: 2022, basePriceEuro: 380 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy Z Flip4', storageGb: 256, releaseYear: 2022, basePriceEuro: 440 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy Z Flip4', storageGb: 512, releaseYear: 2022, basePriceEuro: 540 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy Z Flip3', storageGb: 128, releaseYear: 2021, basePriceEuro: 280 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy Z Flip3', storageGb: 256, releaseYear: 2021, basePriceEuro: 340 },

  // ============================================
  // SAMSUNG GALAXY A SERIE (Mittelklasse)
  // ============================================
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy A55', storageGb: 128, releaseYear: 2024, basePriceEuro: 240 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy A55', storageGb: 256, releaseYear: 2024, basePriceEuro: 280 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy A54', storageGb: 128, releaseYear: 2023, basePriceEuro: 200 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy A54', storageGb: 256, releaseYear: 2023, basePriceEuro: 240 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy A53', storageGb: 128, releaseYear: 2022, basePriceEuro: 160 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy A53', storageGb: 256, releaseYear: 2022, basePriceEuro: 200 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy A52s', storageGb: 128, releaseYear: 2021, basePriceEuro: 140 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy A52s', storageGb: 256, releaseYear: 2021, basePriceEuro: 170 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy A35', storageGb: 128, releaseYear: 2024, basePriceEuro: 180 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy A35', storageGb: 256, releaseYear: 2024, basePriceEuro: 220 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy A34', storageGb: 128, releaseYear: 2023, basePriceEuro: 150 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy A34', storageGb: 256, releaseYear: 2023, basePriceEuro: 190 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy A25', storageGb: 128, releaseYear: 2024, basePriceEuro: 130 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy A25', storageGb: 256, releaseYear: 2024, basePriceEuro: 160 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy A15', storageGb: 128, releaseYear: 2024, basePriceEuro: 90 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy A15', storageGb: 256, releaseYear: 2024, basePriceEuro: 120 },

  // ============================================
  // GOOGLE PIXEL SERIE
  // ============================================
  { category: 'SMARTPHONE', brand: 'Google', modelName: 'Pixel 9 Pro XL', storageGb: 128, releaseYear: 2024, basePriceEuro: 680, isFeatured: true },
  { category: 'SMARTPHONE', brand: 'Google', modelName: 'Pixel 9 Pro XL', storageGb: 256, releaseYear: 2024, basePriceEuro: 740 },
  { category: 'SMARTPHONE', brand: 'Google', modelName: 'Pixel 9 Pro XL', storageGb: 512, releaseYear: 2024, basePriceEuro: 840 },
  { category: 'SMARTPHONE', brand: 'Google', modelName: 'Pixel 9 Pro', storageGb: 128, releaseYear: 2024, basePriceEuro: 620 },
  { category: 'SMARTPHONE', brand: 'Google', modelName: 'Pixel 9 Pro', storageGb: 256, releaseYear: 2024, basePriceEuro: 680 },
  { category: 'SMARTPHONE', brand: 'Google', modelName: 'Pixel 9 Pro', storageGb: 512, releaseYear: 2024, basePriceEuro: 780 },
  { category: 'SMARTPHONE', brand: 'Google', modelName: 'Pixel 9', storageGb: 128, releaseYear: 2024, basePriceEuro: 520 },
  { category: 'SMARTPHONE', brand: 'Google', modelName: 'Pixel 9', storageGb: 256, releaseYear: 2024, basePriceEuro: 580 },
  { category: 'SMARTPHONE', brand: 'Google', modelName: 'Pixel 8 Pro', storageGb: 128, releaseYear: 2023, basePriceEuro: 520 },
  { category: 'SMARTPHONE', brand: 'Google', modelName: 'Pixel 8 Pro', storageGb: 256, releaseYear: 2023, basePriceEuro: 580 },
  { category: 'SMARTPHONE', brand: 'Google', modelName: 'Pixel 8 Pro', storageGb: 512, releaseYear: 2023, basePriceEuro: 680 },
  { category: 'SMARTPHONE', brand: 'Google', modelName: 'Pixel 8', storageGb: 128, releaseYear: 2023, basePriceEuro: 420 },
  { category: 'SMARTPHONE', brand: 'Google', modelName: 'Pixel 8', storageGb: 256, releaseYear: 2023, basePriceEuro: 480 },
  { category: 'SMARTPHONE', brand: 'Google', modelName: 'Pixel 8a', storageGb: 128, releaseYear: 2024, basePriceEuro: 320 },
  { category: 'SMARTPHONE', brand: 'Google', modelName: 'Pixel 8a', storageGb: 256, releaseYear: 2024, basePriceEuro: 380 },
  { category: 'SMARTPHONE', brand: 'Google', modelName: 'Pixel 7 Pro', storageGb: 128, releaseYear: 2022, basePriceEuro: 380 },
  { category: 'SMARTPHONE', brand: 'Google', modelName: 'Pixel 7 Pro', storageGb: 256, releaseYear: 2022, basePriceEuro: 440 },
  { category: 'SMARTPHONE', brand: 'Google', modelName: 'Pixel 7', storageGb: 128, releaseYear: 2022, basePriceEuro: 300 },
  { category: 'SMARTPHONE', brand: 'Google', modelName: 'Pixel 7', storageGb: 256, releaseYear: 2022, basePriceEuro: 360 },
  { category: 'SMARTPHONE', brand: 'Google', modelName: 'Pixel 7a', storageGb: 128, releaseYear: 2023, basePriceEuro: 260 },
  { category: 'SMARTPHONE', brand: 'Google', modelName: 'Pixel 6 Pro', storageGb: 128, releaseYear: 2021, basePriceEuro: 280 },
  { category: 'SMARTPHONE', brand: 'Google', modelName: 'Pixel 6 Pro', storageGb: 256, releaseYear: 2021, basePriceEuro: 330 },
  { category: 'SMARTPHONE', brand: 'Google', modelName: 'Pixel 6', storageGb: 128, releaseYear: 2021, basePriceEuro: 220 },
  { category: 'SMARTPHONE', brand: 'Google', modelName: 'Pixel 6', storageGb: 256, releaseYear: 2021, basePriceEuro: 270 },
  { category: 'SMARTPHONE', brand: 'Google', modelName: 'Pixel 6a', storageGb: 128, releaseYear: 2022, basePriceEuro: 180 },

  // ============================================
  // ONEPLUS
  // ============================================
  { category: 'SMARTPHONE', brand: 'OnePlus', modelName: 'OnePlus 12', storageGb: 256, releaseYear: 2024, basePriceEuro: 520 },
  { category: 'SMARTPHONE', brand: 'OnePlus', modelName: 'OnePlus 12', storageGb: 512, releaseYear: 2024, basePriceEuro: 620 },
  { category: 'SMARTPHONE', brand: 'OnePlus', modelName: 'OnePlus 11', storageGb: 128, releaseYear: 2023, basePriceEuro: 380 },
  { category: 'SMARTPHONE', brand: 'OnePlus', modelName: 'OnePlus 11', storageGb: 256, releaseYear: 2023, basePriceEuro: 440 },
  { category: 'SMARTPHONE', brand: 'OnePlus', modelName: 'OnePlus 10 Pro', storageGb: 128, releaseYear: 2022, basePriceEuro: 320 },
  { category: 'SMARTPHONE', brand: 'OnePlus', modelName: 'OnePlus 10 Pro', storageGb: 256, releaseYear: 2022, basePriceEuro: 380 },
  { category: 'SMARTPHONE', brand: 'OnePlus', modelName: 'OnePlus 10T', storageGb: 128, releaseYear: 2022, basePriceEuro: 260 },
  { category: 'SMARTPHONE', brand: 'OnePlus', modelName: 'OnePlus 10T', storageGb: 256, releaseYear: 2022, basePriceEuro: 320 },
  { category: 'SMARTPHONE', brand: 'OnePlus', modelName: 'OnePlus Nord 3', storageGb: 128, releaseYear: 2023, basePriceEuro: 220 },
  { category: 'SMARTPHONE', brand: 'OnePlus', modelName: 'OnePlus Nord 3', storageGb: 256, releaseYear: 2023, basePriceEuro: 270 },

  // ============================================
  // XIAOMI
  // ============================================
  { category: 'SMARTPHONE', brand: 'Xiaomi', modelName: 'Xiaomi 14 Ultra', storageGb: 256, releaseYear: 2024, basePriceEuro: 680 },
  { category: 'SMARTPHONE', brand: 'Xiaomi', modelName: 'Xiaomi 14 Ultra', storageGb: 512, releaseYear: 2024, basePriceEuro: 780 },
  { category: 'SMARTPHONE', brand: 'Xiaomi', modelName: 'Xiaomi 14 Pro', storageGb: 256, releaseYear: 2024, basePriceEuro: 520 },
  { category: 'SMARTPHONE', brand: 'Xiaomi', modelName: 'Xiaomi 14 Pro', storageGb: 512, releaseYear: 2024, basePriceEuro: 620 },
  { category: 'SMARTPHONE', brand: 'Xiaomi', modelName: 'Xiaomi 14', storageGb: 256, releaseYear: 2024, basePriceEuro: 420 },
  { category: 'SMARTPHONE', brand: 'Xiaomi', modelName: 'Xiaomi 14', storageGb: 512, releaseYear: 2024, basePriceEuro: 520 },
  { category: 'SMARTPHONE', brand: 'Xiaomi', modelName: 'Xiaomi 13 Ultra', storageGb: 256, releaseYear: 2023, basePriceEuro: 520 },
  { category: 'SMARTPHONE', brand: 'Xiaomi', modelName: 'Xiaomi 13 Ultra', storageGb: 512, releaseYear: 2023, basePriceEuro: 620 },
  { category: 'SMARTPHONE', brand: 'Xiaomi', modelName: 'Xiaomi 13 Pro', storageGb: 256, releaseYear: 2023, basePriceEuro: 420 },
  { category: 'SMARTPHONE', brand: 'Xiaomi', modelName: 'Xiaomi 13', storageGb: 256, releaseYear: 2023, basePriceEuro: 340 },
  { category: 'SMARTPHONE', brand: 'Xiaomi', modelName: 'Xiaomi 12 Pro', storageGb: 256, releaseYear: 2022, basePriceEuro: 320 },
  { category: 'SMARTPHONE', brand: 'Xiaomi', modelName: 'Xiaomi 12', storageGb: 256, releaseYear: 2022, basePriceEuro: 260 },
  { category: 'SMARTPHONE', brand: 'Xiaomi', modelName: 'Redmi Note 13 Pro+', storageGb: 256, releaseYear: 2024, basePriceEuro: 200 },
  { category: 'SMARTPHONE', brand: 'Xiaomi', modelName: 'Redmi Note 13 Pro', storageGb: 256, releaseYear: 2024, basePriceEuro: 160 },
  { category: 'SMARTPHONE', brand: 'Xiaomi', modelName: 'Redmi Note 12 Pro+', storageGb: 256, releaseYear: 2023, basePriceEuro: 160 },
  { category: 'SMARTPHONE', brand: 'Xiaomi', modelName: 'Redmi Note 12 Pro', storageGb: 256, releaseYear: 2023, basePriceEuro: 130 },

  // ============================================
  // HUAWEI
  // ============================================
  { category: 'SMARTPHONE', brand: 'Huawei', modelName: 'P60 Pro', storageGb: 256, releaseYear: 2023, basePriceEuro: 480 },
  { category: 'SMARTPHONE', brand: 'Huawei', modelName: 'P60 Pro', storageGb: 512, releaseYear: 2023, basePriceEuro: 560 },
  { category: 'SMARTPHONE', brand: 'Huawei', modelName: 'P60', storageGb: 256, releaseYear: 2023, basePriceEuro: 380 },
  { category: 'SMARTPHONE', brand: 'Huawei', modelName: 'Mate 60 Pro', storageGb: 256, releaseYear: 2023, basePriceEuro: 620 },
  { category: 'SMARTPHONE', brand: 'Huawei', modelName: 'Mate 60 Pro', storageGb: 512, releaseYear: 2023, basePriceEuro: 720 },
  { category: 'SMARTPHONE', brand: 'Huawei', modelName: 'P50 Pro', storageGb: 256, releaseYear: 2021, basePriceEuro: 320 },
  { category: 'SMARTPHONE', brand: 'Huawei', modelName: 'Mate 50 Pro', storageGb: 256, releaseYear: 2022, basePriceEuro: 380 },

  // ============================================
  // APPLE iPAD PRO (M4 - 2024)
  // ============================================
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad Pro 13" (M4)', storageGb: 256, releaseYear: 2024, basePriceEuro: 950, isFeatured: true },
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad Pro 13" (M4)', storageGb: 512, releaseYear: 2024, basePriceEuro: 1100 },
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad Pro 13" (M4)', storageGb: 1024, releaseYear: 2024, basePriceEuro: 1350 },
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad Pro 13" (M4)', storageGb: 2048, releaseYear: 2024, basePriceEuro: 1600 },
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad Pro 11" (M4)', storageGb: 256, releaseYear: 2024, basePriceEuro: 750 },
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad Pro 11" (M4)', storageGb: 512, releaseYear: 2024, basePriceEuro: 900 },
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad Pro 11" (M4)', storageGb: 1024, releaseYear: 2024, basePriceEuro: 1150 },
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad Pro 11" (M4)', storageGb: 2048, releaseYear: 2024, basePriceEuro: 1400 },

  // ============================================
  // APPLE iPAD PRO (M2 - 2022)
  // ============================================
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad Pro 12.9" (M2)', storageGb: 128, releaseYear: 2022, basePriceEuro: 680 },
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad Pro 12.9" (M2)', storageGb: 256, releaseYear: 2022, basePriceEuro: 750 },
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad Pro 12.9" (M2)', storageGb: 512, releaseYear: 2022, basePriceEuro: 900 },
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad Pro 12.9" (M2)', storageGb: 1024, releaseYear: 2022, basePriceEuro: 1100 },
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad Pro 12.9" (M2)', storageGb: 2048, releaseYear: 2022, basePriceEuro: 1350 },
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad Pro 11" (M2)', storageGb: 128, releaseYear: 2022, basePriceEuro: 520 },
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad Pro 11" (M2)', storageGb: 256, releaseYear: 2022, basePriceEuro: 580 },
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad Pro 11" (M2)', storageGb: 512, releaseYear: 2022, basePriceEuro: 720 },
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad Pro 11" (M2)', storageGb: 1024, releaseYear: 2022, basePriceEuro: 900 },
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad Pro 11" (M2)', storageGb: 2048, releaseYear: 2022, basePriceEuro: 1150 },

  // ============================================
  // APPLE iPAD AIR
  // ============================================
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad Air 13" (M2)', storageGb: 128, releaseYear: 2024, basePriceEuro: 620 },
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad Air 13" (M2)', storageGb: 256, releaseYear: 2024, basePriceEuro: 720 },
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad Air 13" (M2)', storageGb: 512, releaseYear: 2024, basePriceEuro: 880 },
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad Air 13" (M2)', storageGb: 1024, releaseYear: 2024, basePriceEuro: 1080 },
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad Air 11" (M2)', storageGb: 128, releaseYear: 2024, basePriceEuro: 480 },
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad Air 11" (M2)', storageGb: 256, releaseYear: 2024, basePriceEuro: 580 },
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad Air 11" (M2)', storageGb: 512, releaseYear: 2024, basePriceEuro: 740 },
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad Air 11" (M2)', storageGb: 1024, releaseYear: 2024, basePriceEuro: 940 },
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad Air (M1)', storageGb: 64, releaseYear: 2022, basePriceEuro: 350 },
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad Air (M1)', storageGb: 256, releaseYear: 2022, basePriceEuro: 450 },

  // ============================================
  // APPLE iPAD (Standard)
  // ============================================
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad (10. Gen)', storageGb: 64, releaseYear: 2022, basePriceEuro: 280 },
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad (10. Gen)', storageGb: 256, releaseYear: 2022, basePriceEuro: 380 },
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad (9. Gen)', storageGb: 64, releaseYear: 2021, basePriceEuro: 200 },
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad (9. Gen)', storageGb: 256, releaseYear: 2021, basePriceEuro: 280 },

  // ============================================
  // APPLE iPAD MINI
  // ============================================
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad mini (6. Gen)', storageGb: 64, releaseYear: 2021, basePriceEuro: 320 },
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad mini (6. Gen)', storageGb: 256, releaseYear: 2021, basePriceEuro: 420 },

  // ============================================
  // SAMSUNG TABLETS
  // ============================================
  { category: 'TABLET', brand: 'Samsung', modelName: 'Galaxy Tab S9 Ultra', storageGb: 256, releaseYear: 2023, basePriceEuro: 680 },
  { category: 'TABLET', brand: 'Samsung', modelName: 'Galaxy Tab S9 Ultra', storageGb: 512, releaseYear: 2023, basePriceEuro: 780 },
  { category: 'TABLET', brand: 'Samsung', modelName: 'Galaxy Tab S9 Ultra', storageGb: 1024, releaseYear: 2023, basePriceEuro: 920 },
  { category: 'TABLET', brand: 'Samsung', modelName: 'Galaxy Tab S9+', storageGb: 256, releaseYear: 2023, basePriceEuro: 520 },
  { category: 'TABLET', brand: 'Samsung', modelName: 'Galaxy Tab S9+', storageGb: 512, releaseYear: 2023, basePriceEuro: 620 },
  { category: 'TABLET', brand: 'Samsung', modelName: 'Galaxy Tab S9', storageGb: 128, releaseYear: 2023, basePriceEuro: 400 },
  { category: 'TABLET', brand: 'Samsung', modelName: 'Galaxy Tab S9', storageGb: 256, releaseYear: 2023, basePriceEuro: 480 },
  { category: 'TABLET', brand: 'Samsung', modelName: 'Galaxy Tab S8 Ultra', storageGb: 128, releaseYear: 2022, basePriceEuro: 520 },
  { category: 'TABLET', brand: 'Samsung', modelName: 'Galaxy Tab S8 Ultra', storageGb: 256, releaseYear: 2022, basePriceEuro: 600 },
  { category: 'TABLET', brand: 'Samsung', modelName: 'Galaxy Tab S8+', storageGb: 128, releaseYear: 2022, basePriceEuro: 400 },
  { category: 'TABLET', brand: 'Samsung', modelName: 'Galaxy Tab S8+', storageGb: 256, releaseYear: 2022, basePriceEuro: 480 },
  { category: 'TABLET', brand: 'Samsung', modelName: 'Galaxy Tab S8', storageGb: 128, releaseYear: 2022, basePriceEuro: 320 },
  { category: 'TABLET', brand: 'Samsung', modelName: 'Galaxy Tab S8', storageGb: 256, releaseYear: 2022, basePriceEuro: 400 },
  { category: 'TABLET', brand: 'Samsung', modelName: 'Galaxy Tab S9 FE+', storageGb: 128, releaseYear: 2023, basePriceEuro: 320 },
  { category: 'TABLET', brand: 'Samsung', modelName: 'Galaxy Tab S9 FE', storageGb: 128, releaseYear: 2023, basePriceEuro: 260 },
  { category: 'TABLET', brand: 'Samsung', modelName: 'Galaxy Tab A9+', storageGb: 64, releaseYear: 2023, basePriceEuro: 140 },
  { category: 'TABLET', brand: 'Samsung', modelName: 'Galaxy Tab A9+', storageGb: 128, releaseYear: 2023, basePriceEuro: 180 },

  // ============================================
  // APPLE MACBOOK PRO (M3 - 2023/2024)
  // ============================================
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Pro 16" (M3 Max)', storageGb: 512, releaseYear: 2023, basePriceEuro: 2200, isFeatured: true },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Pro 16" (M3 Max)', storageGb: 1024, releaseYear: 2023, basePriceEuro: 2500 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Pro 16" (M3 Max)', storageGb: 2048, releaseYear: 2023, basePriceEuro: 2900 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Pro 16" (M3 Max)', storageGb: 4096, releaseYear: 2023, basePriceEuro: 3400 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Pro 16" (M3 Pro)', storageGb: 512, releaseYear: 2023, basePriceEuro: 1650 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Pro 16" (M3 Pro)', storageGb: 1024, releaseYear: 2023, basePriceEuro: 1900 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Pro 16" (M3 Pro)', storageGb: 2048, releaseYear: 2023, basePriceEuro: 2250 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Pro 14" (M3 Max)', storageGb: 512, releaseYear: 2023, basePriceEuro: 2000 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Pro 14" (M3 Max)', storageGb: 1024, releaseYear: 2023, basePriceEuro: 2300 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Pro 14" (M3 Pro)', storageGb: 512, releaseYear: 2023, basePriceEuro: 1400 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Pro 14" (M3 Pro)', storageGb: 1024, releaseYear: 2023, basePriceEuro: 1650 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Pro 14" (M3 Pro)', storageGb: 2048, releaseYear: 2023, basePriceEuro: 2000 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Pro 14" (M3)', storageGb: 512, releaseYear: 2023, basePriceEuro: 1150 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Pro 14" (M3)', storageGb: 1024, releaseYear: 2023, basePriceEuro: 1400 },

  // ============================================
  // APPLE MACBOOK PRO (M2 - 2023)
  // ============================================
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Pro 16" (M2 Max)', storageGb: 512, releaseYear: 2023, basePriceEuro: 1800 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Pro 16" (M2 Max)', storageGb: 1024, releaseYear: 2023, basePriceEuro: 2100 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Pro 16" (M2 Pro)', storageGb: 512, releaseYear: 2023, basePriceEuro: 1400 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Pro 16" (M2 Pro)', storageGb: 1024, releaseYear: 2023, basePriceEuro: 1650 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Pro 14" (M2 Max)', storageGb: 512, releaseYear: 2023, basePriceEuro: 1650 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Pro 14" (M2 Max)', storageGb: 1024, releaseYear: 2023, basePriceEuro: 1900 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Pro 14" (M2 Pro)', storageGb: 512, releaseYear: 2023, basePriceEuro: 1200 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Pro 14" (M2 Pro)', storageGb: 1024, releaseYear: 2023, basePriceEuro: 1450 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Pro 13" (M2)', storageGb: 256, releaseYear: 2022, basePriceEuro: 850 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Pro 13" (M2)', storageGb: 512, releaseYear: 2022, basePriceEuro: 1000 },

  // ============================================
  // APPLE MACBOOK AIR
  // ============================================
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Air 15" (M3)', storageGb: 256, releaseYear: 2024, basePriceEuro: 950 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Air 15" (M3)', storageGb: 512, releaseYear: 2024, basePriceEuro: 1150 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Air 15" (M3)', storageGb: 1024, releaseYear: 2024, basePriceEuro: 1400 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Air 13" (M3)', storageGb: 256, releaseYear: 2024, basePriceEuro: 820 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Air 13" (M3)', storageGb: 512, releaseYear: 2024, basePriceEuro: 1020 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Air 13" (M3)', storageGb: 1024, releaseYear: 2024, basePriceEuro: 1270 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Air 15" (M2)', storageGb: 256, releaseYear: 2023, basePriceEuro: 850 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Air 15" (M2)', storageGb: 512, releaseYear: 2023, basePriceEuro: 1050 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Air 13" (M2)', storageGb: 256, releaseYear: 2022, basePriceEuro: 750, isFeatured: true },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Air 13" (M2)', storageGb: 512, releaseYear: 2022, basePriceEuro: 920 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Air 13" (M2)', storageGb: 1024, releaseYear: 2022, basePriceEuro: 1120 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Air 13" (M1)', storageGb: 256, releaseYear: 2020, basePriceEuro: 550 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Air 13" (M1)', storageGb: 512, releaseYear: 2020, basePriceEuro: 700 },

  // ============================================
  // APPLE WATCH
  // ============================================
  { category: 'SMARTWATCH', brand: 'Apple', modelName: 'Apple Watch Ultra 2 (49mm)', storageGb: 64, releaseYear: 2023, basePriceEuro: 520, isFeatured: true },
  { category: 'SMARTWATCH', brand: 'Apple', modelName: 'Apple Watch Ultra (49mm)', storageGb: 32, releaseYear: 2022, basePriceEuro: 420 },
  { category: 'SMARTWATCH', brand: 'Apple', modelName: 'Apple Watch Series 9 (45mm)', storageGb: 64, releaseYear: 2023, basePriceEuro: 320 },
  { category: 'SMARTWATCH', brand: 'Apple', modelName: 'Apple Watch Series 9 (41mm)', storageGb: 64, releaseYear: 2023, basePriceEuro: 280 },
  { category: 'SMARTWATCH', brand: 'Apple', modelName: 'Apple Watch Series 9 (45mm) GPS+Cellular', storageGb: 64, releaseYear: 2023, basePriceEuro: 380 },
  { category: 'SMARTWATCH', brand: 'Apple', modelName: 'Apple Watch Series 9 (41mm) GPS+Cellular', storageGb: 64, releaseYear: 2023, basePriceEuro: 340 },
  { category: 'SMARTWATCH', brand: 'Apple', modelName: 'Apple Watch Series 8 (45mm)', storageGb: 32, releaseYear: 2022, basePriceEuro: 260 },
  { category: 'SMARTWATCH', brand: 'Apple', modelName: 'Apple Watch Series 8 (41mm)', storageGb: 32, releaseYear: 2022, basePriceEuro: 220 },
  { category: 'SMARTWATCH', brand: 'Apple', modelName: 'Apple Watch Series 7 (45mm)', storageGb: 32, releaseYear: 2021, basePriceEuro: 200 },
  { category: 'SMARTWATCH', brand: 'Apple', modelName: 'Apple Watch Series 7 (41mm)', storageGb: 32, releaseYear: 2021, basePriceEuro: 170 },
  { category: 'SMARTWATCH', brand: 'Apple', modelName: 'Apple Watch SE 2 (44mm)', storageGb: 32, releaseYear: 2022, basePriceEuro: 180 },
  { category: 'SMARTWATCH', brand: 'Apple', modelName: 'Apple Watch SE 2 (40mm)', storageGb: 32, releaseYear: 2022, basePriceEuro: 150 },
  { category: 'SMARTWATCH', brand: 'Apple', modelName: 'Apple Watch SE (44mm)', storageGb: 32, releaseYear: 2020, basePriceEuro: 120 },
  { category: 'SMARTWATCH', brand: 'Apple', modelName: 'Apple Watch SE (40mm)', storageGb: 32, releaseYear: 2020, basePriceEuro: 100 },

  // ============================================
  // SAMSUNG GALAXY WATCH
  // ============================================
  { category: 'SMARTWATCH', brand: 'Samsung', modelName: 'Galaxy Watch Ultra (47mm)', storageGb: 32, releaseYear: 2024, basePriceEuro: 420 },
  { category: 'SMARTWATCH', brand: 'Samsung', modelName: 'Galaxy Watch 7 (44mm)', storageGb: 32, releaseYear: 2024, basePriceEuro: 220 },
  { category: 'SMARTWATCH', brand: 'Samsung', modelName: 'Galaxy Watch 7 (40mm)', storageGb: 32, releaseYear: 2024, basePriceEuro: 190 },
  { category: 'SMARTWATCH', brand: 'Samsung', modelName: 'Galaxy Watch 6 Classic (47mm)', storageGb: 16, releaseYear: 2023, basePriceEuro: 240 },
  { category: 'SMARTWATCH', brand: 'Samsung', modelName: 'Galaxy Watch 6 Classic (43mm)', storageGb: 16, releaseYear: 2023, basePriceEuro: 210 },
  { category: 'SMARTWATCH', brand: 'Samsung', modelName: 'Galaxy Watch 6 (44mm)', storageGb: 16, releaseYear: 2023, basePriceEuro: 180 },
  { category: 'SMARTWATCH', brand: 'Samsung', modelName: 'Galaxy Watch 6 (40mm)', storageGb: 16, releaseYear: 2023, basePriceEuro: 150 },
  { category: 'SMARTWATCH', brand: 'Samsung', modelName: 'Galaxy Watch 5 Pro (45mm)', storageGb: 16, releaseYear: 2022, basePriceEuro: 200 },
  { category: 'SMARTWATCH', brand: 'Samsung', modelName: 'Galaxy Watch 5 (44mm)', storageGb: 16, releaseYear: 2022, basePriceEuro: 140 },
  { category: 'SMARTWATCH', brand: 'Samsung', modelName: 'Galaxy Watch 5 (40mm)', storageGb: 16, releaseYear: 2022, basePriceEuro: 120 },
  { category: 'SMARTWATCH', brand: 'Samsung', modelName: 'Galaxy Watch 4 Classic (46mm)', storageGb: 16, releaseYear: 2021, basePriceEuro: 140 },
  { category: 'SMARTWATCH', brand: 'Samsung', modelName: 'Galaxy Watch 4 Classic (42mm)', storageGb: 16, releaseYear: 2021, basePriceEuro: 120 },
  { category: 'SMARTWATCH', brand: 'Samsung', modelName: 'Galaxy Watch 4 (44mm)', storageGb: 16, releaseYear: 2021, basePriceEuro: 100 },
  { category: 'SMARTWATCH', brand: 'Samsung', modelName: 'Galaxy Watch 4 (40mm)', storageGb: 16, releaseYear: 2021, basePriceEuro: 80 },

  // ============================================
  // ANDERE SMARTWATCHES
  // ============================================
  { category: 'SMARTWATCH', brand: 'Google', modelName: 'Pixel Watch 2', storageGb: 32, releaseYear: 2023, basePriceEuro: 200 },
  { category: 'SMARTWATCH', brand: 'Google', modelName: 'Pixel Watch', storageGb: 32, releaseYear: 2022, basePriceEuro: 140 },
  { category: 'SMARTWATCH', brand: 'Garmin', modelName: 'Fenix 7X Pro', storageGb: 32, releaseYear: 2023, basePriceEuro: 480 },
  { category: 'SMARTWATCH', brand: 'Garmin', modelName: 'Fenix 7 Pro', storageGb: 32, releaseYear: 2023, basePriceEuro: 400 },
  { category: 'SMARTWATCH', brand: 'Garmin', modelName: 'Epix Pro (Gen 2)', storageGb: 32, releaseYear: 2023, basePriceEuro: 520 },
  { category: 'SMARTWATCH', brand: 'Garmin', modelName: 'Venu 3', storageGb: 8, releaseYear: 2023, basePriceEuro: 280 },
  { category: 'SMARTWATCH', brand: 'Garmin', modelName: 'Forerunner 965', storageGb: 32, releaseYear: 2023, basePriceEuro: 380 },

  // ============================================
  // SPIELKONSOLEN - SONY
  // ============================================
  { category: 'KONSOLE', brand: 'Sony', modelName: 'PlayStation 5 Pro', storageGb: 2000, releaseYear: 2024, basePriceEuro: 550, isFeatured: true },
  { category: 'KONSOLE', brand: 'Sony', modelName: 'PlayStation 5 Slim', storageGb: 1000, releaseYear: 2023, basePriceEuro: 380 },
  { category: 'KONSOLE', brand: 'Sony', modelName: 'PlayStation 5 Slim Digital', storageGb: 1000, releaseYear: 2023, basePriceEuro: 320 },
  { category: 'KONSOLE', brand: 'Sony', modelName: 'PlayStation 5', storageGb: 825, releaseYear: 2020, basePriceEuro: 350 },
  { category: 'KONSOLE', brand: 'Sony', modelName: 'PlayStation 5 Digital Edition', storageGb: 825, releaseYear: 2020, basePriceEuro: 300 },
  { category: 'KONSOLE', brand: 'Sony', modelName: 'PlayStation 4 Pro', storageGb: 1000, releaseYear: 2016, basePriceEuro: 150 },
  { category: 'KONSOLE', brand: 'Sony', modelName: 'PlayStation 4 Slim', storageGb: 500, releaseYear: 2016, basePriceEuro: 100 },
  { category: 'KONSOLE', brand: 'Sony', modelName: 'PlayStation 4 Slim', storageGb: 1000, releaseYear: 2016, basePriceEuro: 120 },
  { category: 'KONSOLE', brand: 'Sony', modelName: 'PlayStation VR2', storageGb: 0, releaseYear: 2023, basePriceEuro: 350 },

  // ============================================
  // SPIELKONSOLEN - MICROSOFT
  // ============================================
  { category: 'KONSOLE', brand: 'Microsoft', modelName: 'Xbox Series X', storageGb: 1000, releaseYear: 2020, basePriceEuro: 350, isFeatured: true },
  { category: 'KONSOLE', brand: 'Microsoft', modelName: 'Xbox Series S', storageGb: 512, releaseYear: 2020, basePriceEuro: 180 },
  { category: 'KONSOLE', brand: 'Microsoft', modelName: 'Xbox Series S', storageGb: 1000, releaseYear: 2023, basePriceEuro: 220 },
  { category: 'KONSOLE', brand: 'Microsoft', modelName: 'Xbox One X', storageGb: 1000, releaseYear: 2017, basePriceEuro: 140 },
  { category: 'KONSOLE', brand: 'Microsoft', modelName: 'Xbox One S', storageGb: 500, releaseYear: 2016, basePriceEuro: 80 },
  { category: 'KONSOLE', brand: 'Microsoft', modelName: 'Xbox One S', storageGb: 1000, releaseYear: 2016, basePriceEuro: 100 },

  // ============================================
  // SPIELKONSOLEN - NINTENDO
  // ============================================
  { category: 'KONSOLE', brand: 'Nintendo', modelName: 'Switch OLED', storageGb: 64, releaseYear: 2021, basePriceEuro: 220 },
  { category: 'KONSOLE', brand: 'Nintendo', modelName: 'Switch', storageGb: 32, releaseYear: 2017, basePriceEuro: 160 },
  { category: 'KONSOLE', brand: 'Nintendo', modelName: 'Switch Lite', storageGb: 32, releaseYear: 2019, basePriceEuro: 110 },
  { category: 'KONSOLE', brand: 'Nintendo', modelName: 'Switch (2019 Rev.)', storageGb: 32, releaseYear: 2019, basePriceEuro: 170 },

  // ============================================
  // SPIELKONSOLEN - VALVE
  // ============================================
  { category: 'KONSOLE', brand: 'Valve', modelName: 'Steam Deck OLED', storageGb: 512, releaseYear: 2023, basePriceEuro: 420 },
  { category: 'KONSOLE', brand: 'Valve', modelName: 'Steam Deck OLED', storageGb: 1024, releaseYear: 2023, basePriceEuro: 500 },
  { category: 'KONSOLE', brand: 'Valve', modelName: 'Steam Deck', storageGb: 64, releaseYear: 2022, basePriceEuro: 220 },
  { category: 'KONSOLE', brand: 'Valve', modelName: 'Steam Deck', storageGb: 256, releaseYear: 2022, basePriceEuro: 280 },
  { category: 'KONSOLE', brand: 'Valve', modelName: 'Steam Deck', storageGb: 512, releaseYear: 2022, basePriceEuro: 350 },

  // ============================================
  // HANDHELDS
  // ============================================
  { category: 'KONSOLE', brand: 'ASUS', modelName: 'ROG Ally', storageGb: 512, releaseYear: 2023, basePriceEuro: 380 },
  { category: 'KONSOLE', brand: 'ASUS', modelName: 'ROG Ally X', storageGb: 1024, releaseYear: 2024, basePriceEuro: 520 },
  { category: 'KONSOLE', brand: 'Lenovo', modelName: 'Legion Go', storageGb: 512, releaseYear: 2023, basePriceEuro: 420 },

  // ============================================
  // KAMERAS - SONY
  // ============================================
  { category: 'KAMERA', brand: 'Sony', modelName: 'Alpha 7R V', storageGb: 0, releaseYear: 2022, basePriceEuro: 2200, isFeatured: true },
  { category: 'KAMERA', brand: 'Sony', modelName: 'Alpha 7 IV', storageGb: 0, releaseYear: 2021, basePriceEuro: 1600 },
  { category: 'KAMERA', brand: 'Sony', modelName: 'Alpha 7C II', storageGb: 0, releaseYear: 2023, basePriceEuro: 1400 },
  { category: 'KAMERA', brand: 'Sony', modelName: 'Alpha 7C', storageGb: 0, releaseYear: 2020, basePriceEuro: 1000 },
  { category: 'KAMERA', brand: 'Sony', modelName: 'Alpha 9 III', storageGb: 0, releaseYear: 2024, basePriceEuro: 4000 },
  { category: 'KAMERA', brand: 'Sony', modelName: 'Alpha 1', storageGb: 0, releaseYear: 2021, basePriceEuro: 4500 },
  { category: 'KAMERA', brand: 'Sony', modelName: 'ZV-E10', storageGb: 0, releaseYear: 2021, basePriceEuro: 480 },
  { category: 'KAMERA', brand: 'Sony', modelName: 'ZV-E10 II', storageGb: 0, releaseYear: 2024, basePriceEuro: 680 },
  { category: 'KAMERA', brand: 'Sony', modelName: 'ZV-E1', storageGb: 0, releaseYear: 2023, basePriceEuro: 1600 },
  { category: 'KAMERA', brand: 'Sony', modelName: 'FX30', storageGb: 0, releaseYear: 2022, basePriceEuro: 1200 },

  // ============================================
  // KAMERAS - CANON
  // ============================================
  { category: 'KAMERA', brand: 'Canon', modelName: 'EOS R5', storageGb: 0, releaseYear: 2020, basePriceEuro: 2400 },
  { category: 'KAMERA', brand: 'Canon', modelName: 'EOS R5 Mark II', storageGb: 0, releaseYear: 2024, basePriceEuro: 3200 },
  { category: 'KAMERA', brand: 'Canon', modelName: 'EOS R6 Mark II', storageGb: 0, releaseYear: 2022, basePriceEuro: 1600 },
  { category: 'KAMERA', brand: 'Canon', modelName: 'EOS R6', storageGb: 0, releaseYear: 2020, basePriceEuro: 1200 },
  { category: 'KAMERA', brand: 'Canon', modelName: 'EOS R8', storageGb: 0, releaseYear: 2023, basePriceEuro: 1000 },
  { category: 'KAMERA', brand: 'Canon', modelName: 'EOS R7', storageGb: 0, releaseYear: 2022, basePriceEuro: 900 },
  { category: 'KAMERA', brand: 'Canon', modelName: 'EOS R10', storageGb: 0, releaseYear: 2022, basePriceEuro: 600 },
  { category: 'KAMERA', brand: 'Canon', modelName: 'EOS R50', storageGb: 0, releaseYear: 2023, basePriceEuro: 500 },
  { category: 'KAMERA', brand: 'Canon', modelName: 'EOS R100', storageGb: 0, releaseYear: 2023, basePriceEuro: 350 },
  { category: 'KAMERA', brand: 'Canon', modelName: 'EOS R3', storageGb: 0, releaseYear: 2021, basePriceEuro: 3500 },

  // ============================================
  // KAMERAS - NIKON
  // ============================================
  { category: 'KAMERA', brand: 'Nikon', modelName: 'Z8', storageGb: 0, releaseYear: 2023, basePriceEuro: 2800 },
  { category: 'KAMERA', brand: 'Nikon', modelName: 'Z9', storageGb: 0, releaseYear: 2021, basePriceEuro: 3800 },
  { category: 'KAMERA', brand: 'Nikon', modelName: 'Z6 III', storageGb: 0, releaseYear: 2024, basePriceEuro: 1800 },
  { category: 'KAMERA', brand: 'Nikon', modelName: 'Z6 II', storageGb: 0, releaseYear: 2020, basePriceEuro: 1100 },
  { category: 'KAMERA', brand: 'Nikon', modelName: 'Z7 II', storageGb: 0, releaseYear: 2020, basePriceEuro: 1800 },
  { category: 'KAMERA', brand: 'Nikon', modelName: 'Z5', storageGb: 0, releaseYear: 2020, basePriceEuro: 800 },
  { category: 'KAMERA', brand: 'Nikon', modelName: 'Zf', storageGb: 0, releaseYear: 2023, basePriceEuro: 1600 },
  { category: 'KAMERA', brand: 'Nikon', modelName: 'Zfc', storageGb: 0, releaseYear: 2021, basePriceEuro: 600 },
  { category: 'KAMERA', brand: 'Nikon', modelName: 'Z30', storageGb: 0, releaseYear: 2022, basePriceEuro: 450 },
  { category: 'KAMERA', brand: 'Nikon', modelName: 'Z50', storageGb: 0, releaseYear: 2019, basePriceEuro: 500 },

  // ============================================
  // KAMERAS - FUJIFILM
  // ============================================
  { category: 'KAMERA', brand: 'Fujifilm', modelName: 'X-T5', storageGb: 0, releaseYear: 2022, basePriceEuro: 1100 },
  { category: 'KAMERA', brand: 'Fujifilm', modelName: 'X-H2S', storageGb: 0, releaseYear: 2022, basePriceEuro: 1600 },
  { category: 'KAMERA', brand: 'Fujifilm', modelName: 'X-H2', storageGb: 0, releaseYear: 2022, basePriceEuro: 1300 },
  { category: 'KAMERA', brand: 'Fujifilm', modelName: 'X-S20', storageGb: 0, releaseYear: 2023, basePriceEuro: 850 },
  { category: 'KAMERA', brand: 'Fujifilm', modelName: 'X-T30 II', storageGb: 0, releaseYear: 2021, basePriceEuro: 550 },
  { category: 'KAMERA', brand: 'Fujifilm', modelName: 'X100VI', storageGb: 0, releaseYear: 2024, basePriceEuro: 1200, isFeatured: true },
  { category: 'KAMERA', brand: 'Fujifilm', modelName: 'X100V', storageGb: 0, releaseYear: 2020, basePriceEuro: 900 },
  { category: 'KAMERA', brand: 'Fujifilm', modelName: 'GFX100 II', storageGb: 0, releaseYear: 2023, basePriceEuro: 4500 },
  { category: 'KAMERA', brand: 'Fujifilm', modelName: 'GFX 50S II', storageGb: 0, releaseYear: 2021, basePriceEuro: 2200 },

  // ============================================
  // KAMERAS - PANASONIC
  // ============================================
  { category: 'KAMERA', brand: 'Panasonic', modelName: 'Lumix S5 II', storageGb: 0, releaseYear: 2023, basePriceEuro: 1300 },
  { category: 'KAMERA', brand: 'Panasonic', modelName: 'Lumix S5 IIX', storageGb: 0, releaseYear: 2023, basePriceEuro: 1500 },
  { category: 'KAMERA', brand: 'Panasonic', modelName: 'Lumix S5', storageGb: 0, releaseYear: 2020, basePriceEuro: 900 },
  { category: 'KAMERA', brand: 'Panasonic', modelName: 'Lumix GH6', storageGb: 0, releaseYear: 2022, basePriceEuro: 1200 },
  { category: 'KAMERA', brand: 'Panasonic', modelName: 'Lumix G9 II', storageGb: 0, releaseYear: 2023, basePriceEuro: 1100 },

  // ============================================
  // DROHNEN - DJI
  // ============================================
  { category: 'KAMERA', brand: 'DJI', modelName: 'Mavic 3 Pro', storageGb: 0, releaseYear: 2023, basePriceEuro: 1400 },
  { category: 'KAMERA', brand: 'DJI', modelName: 'Mavic 3 Classic', storageGb: 0, releaseYear: 2022, basePriceEuro: 1000 },
  { category: 'KAMERA', brand: 'DJI', modelName: 'Mavic 3', storageGb: 0, releaseYear: 2021, basePriceEuro: 1200 },
  { category: 'KAMERA', brand: 'DJI', modelName: 'Air 3', storageGb: 0, releaseYear: 2023, basePriceEuro: 750 },
  { category: 'KAMERA', brand: 'DJI', modelName: 'Mini 4 Pro', storageGb: 0, releaseYear: 2023, basePriceEuro: 600 },
  { category: 'KAMERA', brand: 'DJI', modelName: 'Mini 3 Pro', storageGb: 0, releaseYear: 2022, basePriceEuro: 500 },
  { category: 'KAMERA', brand: 'DJI', modelName: 'Mini 3', storageGb: 0, releaseYear: 2022, basePriceEuro: 350 },
  { category: 'KAMERA', brand: 'DJI', modelName: 'Avata 2', storageGb: 0, releaseYear: 2024, basePriceEuro: 700 },
  { category: 'KAMERA', brand: 'DJI', modelName: 'Avata', storageGb: 0, releaseYear: 2022, basePriceEuro: 500 },
  { category: 'KAMERA', brand: 'DJI', modelName: 'Osmo Pocket 3', storageGb: 0, releaseYear: 2023, basePriceEuro: 400 },
  { category: 'KAMERA', brand: 'DJI', modelName: 'Osmo Action 4', storageGb: 0, releaseYear: 2023, basePriceEuro: 250 },

  // ============================================
  // ACTION CAMERAS - GOPRO
  // ============================================
  { category: 'KAMERA', brand: 'GoPro', modelName: 'HERO12 Black', storageGb: 0, releaseYear: 2023, basePriceEuro: 280 },
  { category: 'KAMERA', brand: 'GoPro', modelName: 'HERO11 Black', storageGb: 0, releaseYear: 2022, basePriceEuro: 220 },
  { category: 'KAMERA', brand: 'GoPro', modelName: 'HERO11 Black Mini', storageGb: 0, releaseYear: 2022, basePriceEuro: 180 },
  { category: 'KAMERA', brand: 'GoPro', modelName: 'HERO10 Black', storageGb: 0, releaseYear: 2021, basePriceEuro: 180 },

  // ============================================
  // KOPFHÖRER - APPLE
  // ============================================
  { category: 'SONSTIGES', brand: 'Apple', modelName: 'AirPods Max', storageGb: 0, releaseYear: 2020, basePriceEuro: 320 },
  { category: 'SONSTIGES', brand: 'Apple', modelName: 'AirPods Pro (2. Gen)', storageGb: 0, releaseYear: 2022, basePriceEuro: 160 },
  { category: 'SONSTIGES', brand: 'Apple', modelName: 'AirPods Pro (2. Gen) USB-C', storageGb: 0, releaseYear: 2023, basePriceEuro: 180 },
  { category: 'SONSTIGES', brand: 'Apple', modelName: 'AirPods (3. Gen)', storageGb: 0, releaseYear: 2021, basePriceEuro: 110 },
  { category: 'SONSTIGES', brand: 'Apple', modelName: 'AirPods (2. Gen)', storageGb: 0, releaseYear: 2019, basePriceEuro: 70 },

  // ============================================
  // KOPFHÖRER - SONY
  // ============================================
  { category: 'SONSTIGES', brand: 'Sony', modelName: 'WH-1000XM5', storageGb: 0, releaseYear: 2022, basePriceEuro: 220 },
  { category: 'SONSTIGES', brand: 'Sony', modelName: 'WH-1000XM4', storageGb: 0, releaseYear: 2020, basePriceEuro: 160 },
  { category: 'SONSTIGES', brand: 'Sony', modelName: 'WF-1000XM5', storageGb: 0, releaseYear: 2023, basePriceEuro: 180 },
  { category: 'SONSTIGES', brand: 'Sony', modelName: 'WF-1000XM4', storageGb: 0, releaseYear: 2021, basePriceEuro: 130 },

  // ============================================
  // KOPFHÖRER - ANDERE
  // ============================================
  { category: 'SONSTIGES', brand: 'Samsung', modelName: 'Galaxy Buds3 Pro', storageGb: 0, releaseYear: 2024, basePriceEuro: 140 },
  { category: 'SONSTIGES', brand: 'Samsung', modelName: 'Galaxy Buds2 Pro', storageGb: 0, releaseYear: 2022, basePriceEuro: 100 },
  { category: 'SONSTIGES', brand: 'Samsung', modelName: 'Galaxy Buds FE', storageGb: 0, releaseYear: 2023, basePriceEuro: 60 },
  { category: 'SONSTIGES', brand: 'Bose', modelName: 'QuietComfort Ultra Headphones', storageGb: 0, releaseYear: 2023, basePriceEuro: 280 },
  { category: 'SONSTIGES', brand: 'Bose', modelName: 'QuietComfort 45', storageGb: 0, releaseYear: 2021, basePriceEuro: 180 },
  { category: 'SONSTIGES', brand: 'Bose', modelName: 'QuietComfort Ultra Earbuds', storageGb: 0, releaseYear: 2023, basePriceEuro: 180 },

  // ============================================
  // E-READER
  // ============================================
  { category: 'SONSTIGES', brand: 'Amazon', modelName: 'Kindle Scribe', storageGb: 16, releaseYear: 2022, basePriceEuro: 220 },
  { category: 'SONSTIGES', brand: 'Amazon', modelName: 'Kindle Scribe', storageGb: 32, releaseYear: 2022, basePriceEuro: 260 },
  { category: 'SONSTIGES', brand: 'Amazon', modelName: 'Kindle Scribe', storageGb: 64, releaseYear: 2022, basePriceEuro: 300 },
  { category: 'SONSTIGES', brand: 'Amazon', modelName: 'Kindle Oasis', storageGb: 8, releaseYear: 2019, basePriceEuro: 120 },
  { category: 'SONSTIGES', brand: 'Amazon', modelName: 'Kindle Oasis', storageGb: 32, releaseYear: 2019, basePriceEuro: 150 },
  { category: 'SONSTIGES', brand: 'Amazon', modelName: 'Kindle Paperwhite (11. Gen)', storageGb: 8, releaseYear: 2021, basePriceEuro: 80 },
  { category: 'SONSTIGES', brand: 'Amazon', modelName: 'Kindle Paperwhite (11. Gen)', storageGb: 16, releaseYear: 2021, basePriceEuro: 100 },
  { category: 'SONSTIGES', brand: 'Amazon', modelName: 'Kindle (11. Gen)', storageGb: 16, releaseYear: 2022, basePriceEuro: 60 },
  { category: 'SONSTIGES', brand: 'Kobo', modelName: 'Elipsa 2E', storageGb: 32, releaseYear: 2023, basePriceEuro: 280 },
  { category: 'SONSTIGES', brand: 'Kobo', modelName: 'Libra 2', storageGb: 32, releaseYear: 2021, basePriceEuro: 100 },

  // ============================================
  // VR HEADSETS
  // ============================================
  { category: 'SONSTIGES', brand: 'Meta', modelName: 'Quest 3', storageGb: 128, releaseYear: 2023, basePriceEuro: 350 },
  { category: 'SONSTIGES', brand: 'Meta', modelName: 'Quest 3', storageGb: 512, releaseYear: 2023, basePriceEuro: 420 },
  { category: 'SONSTIGES', brand: 'Meta', modelName: 'Quest 2', storageGb: 128, releaseYear: 2020, basePriceEuro: 180 },
  { category: 'SONSTIGES', brand: 'Meta', modelName: 'Quest 2', storageGb: 256, releaseYear: 2020, basePriceEuro: 220 },
  { category: 'SONSTIGES', brand: 'Meta', modelName: 'Quest Pro', storageGb: 256, releaseYear: 2022, basePriceEuro: 600 },
  { category: 'SONSTIGES', brand: 'Apple', modelName: 'Vision Pro', storageGb: 256, releaseYear: 2024, basePriceEuro: 2500, isFeatured: true },
  { category: 'SONSTIGES', brand: 'Apple', modelName: 'Vision Pro', storageGb: 512, releaseYear: 2024, basePriceEuro: 2700 },
  { category: 'SONSTIGES', brand: 'Apple', modelName: 'Vision Pro', storageGb: 1024, releaseYear: 2024, basePriceEuro: 2900 },
]

async function main() {
  console.log('🌱 Starting massive seed...')
  console.log(`📱 Total devices to seed: ${deviceModels.length}`)

  let created = 0
  let updated = 0
  let errors = 0

  for (const device of deviceModels) {
    try {
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
          releaseYear: device.releaseYear,
        },
        create: {
          category: device.category,
          brand: device.brand,
          modelName: device.modelName,
          storageGb: device.storageGb ?? null,
          releaseYear: device.releaseYear,
          basePriceEuro: device.basePriceEuro,
          isFeatured: device.isFeatured ?? false,
          slug,
        },
      })
      created++
    } catch (error) {
      console.error(`Error seeding ${device.brand} ${device.modelName}:`, error)
      errors++
    }
  }

  const count = await prisma.deviceModel.count()
  console.log(`\n✅ Database now contains ${count} device models`)
  console.log(`   Created/Updated: ${created}`)
  if (errors > 0) console.log(`   Errors: ${errors}`)

  // Statistiken
  const categories = await prisma.deviceModel.groupBy({
    by: ['category'],
    _count: true,
    orderBy: { _count: { category: 'desc' } },
  })

  console.log('\n📊 Devices by category:')
  for (const cat of categories) {
    console.log(`   ${cat.category}: ${cat._count}`)
  }

  const brands = await prisma.deviceModel.groupBy({
    by: ['brand'],
    _count: true,
    orderBy: { _count: { brand: 'desc' } },
  })

  console.log('\n🏷️  Devices by brand:')
  for (const b of brands) {
    console.log(`   ${b.brand}: ${b._count}`)
  }

  const featured = await prisma.deviceModel.count({
    where: { isFeatured: true },
  })
  console.log(`\n⭐ Featured devices: ${featured}`)

  // Preis-Statistiken
  const priceStats = await prisma.deviceModel.aggregate({
    _avg: { basePriceEuro: true },
    _min: { basePriceEuro: true },
    _max: { basePriceEuro: true },
  })

  console.log('\n💰 Price statistics:')
  console.log(`   Average: ${priceStats._avg.basePriceEuro?.toFixed(2)} €`)
  console.log(`   Minimum: ${priceStats._min.basePriceEuro} €`)
  console.log(`   Maximum: ${priceStats._max.basePriceEuro} €`)

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
