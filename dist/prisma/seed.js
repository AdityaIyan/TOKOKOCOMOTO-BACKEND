"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcryptjs"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const prisma = new client_1.PrismaClient();
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
    await prisma.cartItem.deleteMany({});
    await prisma.orderItem.deleteMany({});
    await prisma.product.deleteMany({});
    const uploadDir = path.join(__dirname, '../public/uploads');
    const files = fs.readdirSync(uploadDir).filter(f => f.startsWith('WhatsApp Image'));
    const brands = ['Ray-Ban', 'Prada', 'Oliver Peoples', 'Emporio Armani', 'Brunello Cucinelli'];
    const genders = ['Men', 'Women', 'Kids', 'Unisex'];
    const products = files.map((filename, index) => {
        const brand = brands[index % brands.length];
        const gender = genders[index % genders.length];
        const price = 1000000 + Math.floor(Math.random() * 5000000);
        return {
            name: `${brand} Special Edition ${index + 1}`,
            description: `Premium sunglasses from ${brand}. Features iconic design and high quality lenses. Ideal for ${gender}.`,
            price: price,
            stock: 50,
            sku: `WA-${String(index + 1).padStart(3, '0')}`,
            category: brand,
            gender: gender,
            images: JSON.stringify([filename])
        };
    });
    for (const product of products) {
        await prisma.product.create({
            data: {
                ...product,
                sellerId: seller.username,
            },
        });
    }
    console.log(`Seeding completed successfully! Inserted ${products.length} products.`);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map