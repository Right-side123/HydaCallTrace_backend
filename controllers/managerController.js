const { query } = require("../config/db");

const ManagerController = async (req, res) => {
    try {
        const sql = `SELECT manager_id, managername FROM manager`;
        const result = await query(sql);
        return res.json({ managers: result });
    } catch (err) {
        console.error("Error fetching managers:", err);
        return res.status(500).json({ error: "Failed to fetch managers" });
    }
};

module.exports = { ManagerController };
