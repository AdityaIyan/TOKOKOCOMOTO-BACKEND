"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.product.findMany({
            include: { seller: { select: { username: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: { seller: { select: { username: true } } },
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return product;
    }
    async create(data, username) {
        return this.prisma.product.create({
            data: {
                name: data.name,
                description: data.description,
                price: Number(data.price),
                stock: Number(data.stock),
                sku: data.sku,
                category: data.category,
                images: data.images,
                seller: { connect: { username } },
            },
        });
    }
    async update(id, data, username, role) {
        const product = await this.findOne(id);
        if (product.seller.username !== username && role !== 'ADMIN') {
            throw new common_1.UnauthorizedException('You can only update your own products');
        }
        return this.prisma.product.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
                price: data.price ? Number(data.price) : undefined,
                stock: data.stock ? Number(data.stock) : undefined,
                sku: data.sku,
                category: data.category,
                ...(data.images && { images: data.images }),
            },
        });
    }
    async remove(id, username, role) {
        const product = await this.findOne(id);
        if (product.seller.username !== username && role !== 'ADMIN') {
            throw new common_1.UnauthorizedException('You can only delete your own products');
        }
        return this.prisma.product.delete({
            where: { id },
        });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map