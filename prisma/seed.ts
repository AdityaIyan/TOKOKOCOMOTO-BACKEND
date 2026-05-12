import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as fs from 'fs';
import * as path from 'path';
import { put } from '@vercel/blob';

// Use DIRECT_URL to bypass pgbouncer (required for seed/migrations)
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL || process.env.DATABASE_URL,
    },
  },
});

async function main() {
  console.log('Seeding database with local WhatsApp Image products...');

  const hashedPassword = await bcrypt.hash('password123', 10);

  const seller = await prisma.user.upsert({
    where: { username: 'official_store' },
    update: {},
    create: {
      username: 'official_store',
      email: 'store@eyewear.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  // Clear existing products
  await prisma.cartItem.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.product.deleteMany({});

  const uploadDir = path.join(__dirname, '../public/uploads');
  const files = fs.readdirSync(uploadDir).filter(f => f.startsWith('WhatsApp Image'));

  const brands = ['Ray-Ban', 'Prada', 'Oliver Peoples', 'Emporio Armani', 'Brunello Cucinelli'];
  const genders = ['Men', 'Women', 'Kids', 'Unisex'];

  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

  for (let index = 0; index < files.length; index++) {
    const filename = files[index];
    const brand = brands[index % brands.length];
    const gender = genders[index % genders.length];
    const price = 1000000 + Math.floor(Math.random() * 5000000);

    let imageUrl = filename; // fallback: simpan nama file lokal

    // Upload ke Vercel Blob jika token tersedia
    if (blobToken) {
      try {
        const filePath = path.join(uploadDir, filename);
        const fileBuffer = fs.readFileSync(filePath);
        const blob = await put(filename, fileBuffer, {
          access: 'public',
          token: blobToken,
        });
        imageUrl = blob.url;
        console.log(`Uploaded: ${filename} → ${blob.url}`);
      } catch (err) {
        console.warn(`Gagal upload ${filename} ke Blob, pakai nama file lokal.`, err);
      }
    } else {
      console.warn('BLOB_READ_WRITE_TOKEN tidak ditemukan, gambar disimpan sebagai nama file lokal.');
    }

    await prisma.product.create({
      data: {
        name: `${brand} Special Edition ${index + 1}`,
        description: `Premium sunglasses from ${brand}. Ideal for ${gender}.`,
        price,
        stock: 50,
        sku: `WA-${String(index + 1).padStart(3, '0')}`,
        category: brand,
        gender,
        images: JSON.stringify([imageUrl]),
        sellerId: seller.username,
      },
    });
  }

  console.log(`Seeding completed successfully! Inserted ${files.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
