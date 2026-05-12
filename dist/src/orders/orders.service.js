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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const mail_service_1 = require("../mail/mail.service");
let OrdersService = class OrdersService {
    prisma;
    mailService;
    constructor(prisma, mailService) {
        this.prisma = prisma;
        this.mailService = mailService;
    }
    async createOrder(buyerId, data) {
        let totalAmount = 0;
        const orderItemsData = [];
        let itemsToProcess = data.items;
        if (!itemsToProcess || itemsToProcess.length === 0) {
            const cart = await this.prisma.cart.findUnique({
                where: { userId: buyerId },
                include: { items: { include: { product: true } } }
            });
            if (!cart || cart.items.length === 0) {
                throw new common_1.BadRequestException('Cart is empty');
            }
            itemsToProcess = cart.items.map(ci => ({
                productId: ci.productId,
                quantity: ci.quantity
            }));
        }
        for (const item of itemsToProcess) {
            const product = await this.prisma.product.findUnique({ where: { id: item.productId } });
            if (!product || product.stock < item.quantity) {
                throw new common_1.BadRequestException(`Product ${product?.name || item.productId} is out of stock`);
            }
            const price = product.price;
            totalAmount += price * item.quantity;
            orderItemsData.push({
                productId: product.id,
                price: price,
                quantity: item.quantity,
            });
            await this.prisma.product.update({
                where: { id: product.id },
                data: { stock: { decrement: item.quantity } },
            });
        }
        if (!data.items || data.items.length === 0) {
            const cart = await this.prisma.cart.findUnique({ where: { userId: buyerId } });
            if (cart) {
                await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
            }
        }
        const order = await this.prisma.order.create({
            data: {
                buyerId,
                totalAmount,
                status: 'UNPAID',
                shippingAddress: data.shippingAddress,
                items: {
                    create: orderItemsData,
                },
            },
            include: {
                items: { include: { product: true } },
                buyer: true,
            },
        });
        return order;
    }
    async findAll() {
        return this.prisma.order.findMany({
            include: { items: { include: { product: true } }, buyer: { select: { username: true, email: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findMyOrders(buyerId) {
        return this.prisma.order.findMany({
            where: { buyerId },
            include: { items: { include: { product: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: { items: { include: { product: true } }, buyer: { select: { username: true, email: true } } },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
    async updateStatus(id, status) {
        const validStatuses = ['UNPAID', 'VERIFYING', 'PAID', 'PACKED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
        if (!validStatuses.includes(status)) {
            throw new common_1.BadRequestException('Invalid status');
        }
        const order = await this.prisma.order.update({
            where: { id },
            data: { status },
            include: { buyer: true },
        });
        await this.mailService.sendOrderStatusEmail(order.buyer.email, order.id, status);
        return order;
    }
    async payOrder(id, buyerId, paymentMethod, paymentProof) {
        const order = await this.prisma.order.findUnique({ where: { id } });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (order.buyerId !== buyerId)
            throw new common_1.BadRequestException('Not your order');
        if (order.status !== 'UNPAID')
            throw new common_1.BadRequestException('Order is not in UNPAID status');
        if (!paymentProof)
            throw new common_1.BadRequestException('Payment proof is required');
        return this.prisma.order.update({
            where: { id },
            data: {
                paymentMethod,
                paymentProof,
                status: 'VERIFYING',
            },
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mail_service_1.MailService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map