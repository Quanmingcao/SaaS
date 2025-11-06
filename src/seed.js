const { prisma } = require('./prisma');
const bcrypt = require('bcryptjs');

async function seed() {
    try {
        // Tạo Super Admin đầu tiên
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash('admin123', salt);

        const superAdmin = await prisma.superAdmin.create({
            data: {
                username: 'superadmin',
                email: 'admin@system.com',
                passwordhash: passwordHash,
                role: 'superadmin'
            }
        });

        console.log('Created Super Admin:', {
            username: superAdmin.username,
            email: superAdmin.email
        });

        // Tạo Tenant mẫu đầu tiên
        const tenant = await prisma.tenants.create({
            data: {
                tenantname: 'Demo University',
                domain: 'demo.edu',
                email: 'contact@demo.edu',
                phone: '0123456789',
                address: '123 Demo Street',
                status: 'active'
            }
        });

        console.log('Created Demo Tenant:', {
            id: tenant.tenantid,
            name: tenant.tenantname
        });

        // Tạo Tenant Admin account cho tenant đầu tiên
        const tenantAdminPassword = await bcrypt.hash('tenant123', salt);
        const tenantAdmin = await prisma.tenantAccounts.create({
            data: {
                tenantid: tenant.tenantid,
                username: 'tenantadmin',
                email: 'admin@demo.edu',
                passwordhash: tenantAdminPassword,
                role: 'admin'
            }
        });

        console.log('Created Tenant Admin:', {
            username: tenantAdmin.username,
            email: tenantAdmin.email
        });

        console.log('\nInitial Credentials:');
        console.log('1. Super Admin:');
        console.log('   - Email: admin@system.com');
        console.log('   - Password: admin123');
        console.log('\n2. Tenant Admin:');
        console.log('   - Email: admin@demo.edu');
        console.log('   - Password: tenant123');

    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seed();
