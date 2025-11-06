const { prisma } = require('../prisma');

const dashboardController = {
    // Get dashboard statistics
    getDashboardStats: async (req, res) => {
        try {
            // Get counts and stats from database
            const [
                totalTenants,
                activeTenants,
                totalSubscriptions,
                activeSubscriptions,
                recentActivities,
                totalRevenue
            ] = await Promise.all([
                prisma.tenants.count(),
                prisma.tenants.count({
                    where: { status: 'active' }
                }),
                prisma.subscriptions.count(),
                prisma.subscriptions.count({
                    where: { status: 'active' }
                }),
                prisma.subscriptions.findMany({
                    take: 5,
                    orderBy: { createdat: 'desc' },
                    include: {
                        tenant: true,
                        plan: true
                    }
                }),
                prisma.subscriptions.aggregate({
                    where: {
                        status: 'active',
                        AND: {
                            startdate: {
                                lte: new Date()
                            },
                            enddate: {
                                gte: new Date()
                            }
                        }
                    },
                    _sum: {
                        // Multiply months by price
                        price: true
                    }
                })
            ]);

            // Format activities
            const formattedActivities = recentActivities.map(activity => ({
                id: activity.subscriptionid,
                type: 'subscription',
                message: `${activity.tenant.tenantname} đăng ký gói ${activity.plan.planname}`,
                time: activity.createdat
            }));

            res.json({
                stats: {
                    totalTenants,
                    activeTenants,
                    totalSubscriptions,
                    activeSubscriptions,
                    totalRevenue: totalRevenue?._sum?.price || 0
                },
                recentActivities: formattedActivities
            });
        } catch (error) {
            console.error('Dashboard stats error:', error);
            res.status(500).json({ error: 'Lỗi khi lấy thống kê dashboard' });
        }
    }
};

module.exports = dashboardController;