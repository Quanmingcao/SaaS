const { prisma } = require('../prisma');

const subscriptionsController = {
    // Lấy danh sách tất cả subscriptions
    getAllSubscriptions: async (req, res) => {
        try {
            const subscriptions = await prisma.subscriptions.findMany({
                include: {
                    tenant: true,
                    plan: true,
                    logs: true
                }
            });
            res.json(subscriptions);
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi lấy danh sách subscriptions' });
        }
    },

    // Lấy subscription theo ID
    getSubscriptionById: async (req, res) => {
        try {
            const { id } = req.params;
            const subscription = await prisma.subscriptions.findUnique({
                where: { subscriptionid: parseInt(id) },
                include: {
                    tenant: true,
                    plan: true,
                    logs: true
                }
            });
            
            if (!subscription) {
                return res.status(404).json({ error: 'Không tìm thấy subscription' });
            }
            
            res.json(subscription);
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi lấy thông tin subscription' });
        }
    },

    // Tạo subscription mới
    createSubscription: async (req, res) => {
        try {
            const { tenantid, planid, startdate, enddate, status } = req.body;
            const newSubscription = await prisma.subscriptions.create({
                data: {
                    tenantid: parseInt(tenantid),
                    planid: parseInt(planid),
                    startdate: new Date(startdate),
                    enddate: new Date(enddate),
                    status
                }
            });
            
            res.status(201).json(newSubscription);
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi tạo subscription mới' });
        }
    },

    // Cập nhật subscription
    updateSubscription: async (req, res) => {
        try {
            const { id } = req.params;
            const { startdate, enddate, status } = req.body;
            
            const updatedSubscription = await prisma.subscriptions.update({
                where: { subscriptionid: parseInt(id) },
                data: {
                    startdate: startdate ? new Date(startdate) : undefined,
                    enddate: enddate ? new Date(enddate) : undefined,
                    status,
                    updatedat: new Date()
                }
            });
            
            res.json(updatedSubscription);
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi cập nhật subscription' });
        }
    },

    // Xóa subscription
    deleteSubscription: async (req, res) => {
        try {
            const { id } = req.params;
            await prisma.subscriptions.delete({
                where: { subscriptionid: parseInt(id) }
            });
            
            res.json({ message: 'Đã xóa subscription thành công' });
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi xóa subscription' });
        }
    }
};

module.exports = subscriptionsController;