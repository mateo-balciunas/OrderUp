import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    try{
        //Cleanse database
        console.log('Cleansing database...');
        await prisma.orderLine.deleteMany();
        await prisma.order.deleteMany();
        await prisma.membership.deleteMany();
        await prisma.channelConnection.deleteMany();
        await prisma.user.deleteMany();
        await prisma.organization.deleteMany();
        console.log('Database cleansed successfully');

        //Create organizations
        console.log('Creating organizations...');
        const org1 = await prisma.organization.create({
            data: {
                name: 'Organization 1',
                plan: 'pro'
            }
        });
        const org2 = await prisma.organization.create({
            data: {
                name: 'Organization 2',
                plan: 'basic'
            }
        });
        console.log('Organizations created successfully');

        //Create users
        console.log('Creating users...');

        //Create hashed passwords
        const hashedPassword1 = await bcrypt.hash('123456789', 10);
        const hashedPassword2 = await bcrypt.hash('123456789', 10);
        const hashedPassword3 = await bcrypt.hash('123456789', 10);
        const hashedPassword4 = await bcrypt.hash('123456789', 10);
        const user1 = await prisma.user.create({
            data: {
                email: 'user1@example.com',
                name: 'User 1',
                password:hashedPassword1
            }
        });
        const user2 = await prisma.user.create({
            data: {
                email: 'user2@example.com',
                name: 'User 2',
                password: hashedPassword2
            }
        });
        const user3 = await prisma.user.create({
            data: {
                email: 'user3@example.com',
                name: 'User 3',
                password: hashedPassword3
            }
        });
        const user4 = await prisma.user.create({
            data: {
                email: 'user4@example.com',
                name: 'User 4',
                password: hashedPassword4
            }
        });
        console.log( 'Users created successfully' );

        //Create memberships and link to organizations and users
        console.log('Creating memberships...');
        await prisma.membership.create({
            data: {
                userId: user1.id,
                organizationId: org1.id,
                role: 'admin'
            }
        })
        await prisma.membership.create({
            data: {
                userId: user2.id,
                organizationId: org1.id,
                role: 'operator'
            }
        });
        await prisma.membership.create({
            data: {
                userId: user3.id,
                organizationId: org2.id,
                role: 'admin'
            }
        });
        await prisma.membership.create({
            data: {
                userId: user4.id,
                organizationId: org2.id,
                role: 'operator'
            }
        });

        console.log('Memberships created successfully');

        //Create Channel Connections
        console.log('Creating channel connections...');
        const whatsappChannel1 = await prisma.channelConnection.create({
            data: {
                organizationId: org1.id,
                name: 'Whatsapp Business',
                channelType: 'WhastappBusiness',
                isActive: true,
                config: {
                    phoneNumber: '+1234567890',
                    apiKey: '1234567890'
                },
            }
        });
        const emailChannel1 = await prisma.channelConnection.create({
            data: {
                organizationId: org1.id,
                name: 'email',
                channelType: 'Email',
                isActive: true,
                config: {
                    email: 'provider1@example.com',
                    password: '1234567890'
                }
            }
        });
        const whatsappChannel2 = await prisma.channelConnection.create({
            data: {
                organizationId: org2.id,
                name: 'Whatsapp Business',
                channelType: 'WhastappBusiness',
                isActive: true,
                config: {
                    phoneNumber: '+0987654321',
                    apiKey: '0987654321'
                }
            }
        });
        const emailChannel2 = await prisma.channelConnection.create({
            data: {
                organizationId: org2.id,
                name: 'email',
                channelType: 'Email',
                isActive: true,
                config: {
                    email: 'provider2@example.com',
                    password: '1234567890'
                }
            }
        });

        console.log('Channel connections created successfully');

        //Create orders
        console.log('Creating orders...');
        const order1 = await prisma.order.create({
            data: {
                organizationId: org1.id,
                externalRef: '1234567890',
                channelId: whatsappChannel1.id,
                status: 'received',
                metadata: {
                    customerName: 'John Doe',
                    customerEmail: 'john.doe@example.com',
                    customerPhone: '+1234567890'
                },
                priority: 1,
                total: 500.00,
                lines: {
                    create: [
                        {
                            sku: '1234567890',
                            quantity: 1,
                            unit: 'pcs',
                            unitPrice: 100,
                            total: 100.00
                        },
                        {
                            sku: '1234567890',
                            quantity: 2,
                            unit: 'pcs',
                            unitPrice: 200,
                            total: 400.00
                        }
                    ]
                }
            }
        });
        const order2 = await prisma.order.create({
            data: {
                organizationId: org2.id,
                externalRef: '1234567890',
                channelId: whatsappChannel2.id,
                status: 'received',
                metadata: {
                    customerName: 'Jane Doe',
                    customerEmail: 'jane.doe@example.com',
                    customerPhone: '+0987654321'
                },
                priority: 1,
                total: 500.00,
                lines: {
                    create: [
                        {
                            sku: '1234567890',
                            quantity: 5,
                            unit: 'pcs',
                            unitPrice: 100,
                            total: 500.00
                        }
                    ]
                }
            }
        });

        console.log('Seeding completed successfully');
    } catch( error ){
        console.error('Error seeding database:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

main();