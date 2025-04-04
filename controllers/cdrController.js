// const { query } = require('../config/db');

// const getCdrData = async (req, res) => {
//     const { manager_id } = req.params;
//     const { startDate, endDate, startTime, endTime } = req.query;

//     if (!startDate || !endDate) {
//         return res.status(400).json({ error: 'Both startDate and endDate are required' });
//     }
//     const queryStartTime = startTime || '00:00:00';
//     const queryEndTime = endTime || '23:59:59';

//     const queryStartDateTime = `${startDate} ${queryStartTime}`;
//     const queryEndDateTime = `${endDate} ${queryEndTime}`;

//     try {

//         const querySql = `
//             SELECT 
//                 c.call_datetime,
//                 c.calltype,
//                 c.custphone,
//                 a.agentname,
//                 c.agent,
//                 c.agent_dial_start,
//                 c.agent_answered_at,
//                 c.agent_disconnected_at,
//                 c.agent_duration,
//                 c.customer_duration,
//                 c.customer_dial_start,
//                 c.customer_answered_at,
//                 c.customer_disconnected_at,
//                 c.api_response,
//                 c.recording_file,
//                 c.agent_disposition,
//                 c.customer_disposition

//             FROM customcdr c

//             JOIN rs_agentmobile a ON c.agent = a.agentmobile

//             WHERE a.manager_id = ? 
//             AND c.call_datetime BETWEEN ? AND ?
//         `;

//         const cdrData = await query(querySql, [manager_id, queryStartDateTime, queryEndDateTime]);

//         return res.json({ manager_id, cdr_data: cdrData });
//     } catch (err) {
//         console.error('Error fetching CDR data:', err);
//         return res.status(500).json({ error: 'Failed to fetch CDR data' });
//     }
// };

// module.exports = { getCdrData };

// *****************************************************************   Like JMPL

// const { query } = require('../config/db');

// const getCdrData = async (req, res) => {
//     const { manager_id } = req.params;
//     const { startDate, endDate, startTime, endTime } = req.query;

//     if (!startDate || !endDate) {
//         return res.status(400).json({ error: 'Both startDate and endDate are required' });
//     }

//     const queryStartTime = startTime || '00:00:00';
//     const queryEndTime = endTime || '23:59:59';

//     const queryStartDateTime = `${startDate} ${queryStartTime}`;
//     const queryEndDateTime = `${endDate} ${queryEndTime}`;

//     try {
//         let querySql;
//         let queryParams = [queryStartDateTime, queryEndDateTime];

//         if (manager_id == 2) {

//             querySql = `
//                 SELECT 
//                     c.call_datetime,
//                     c.calltype,
//                     c.custphone,
//                     a.agentname,
//                     c.agent,
//                     c.agent_dial_start,
//                     c.agent_answered_at,
//                     c.agent_disconnected_at,
//                     c.agent_duration,
//                     c.customer_duration,
//                     c.customer_dial_start,
//                     c.customer_answered_at,
//                     c.customer_disconnected_at,
//                     c.api_response,
//                     c.recording_file,
//                     c.agent_disposition,
//                     c.customer_disposition
//                 FROM customcdr c
//                 JOIN rs_agentmobile a ON c.agent = a.agentmobile
//                 WHERE c.call_datetime BETWEEN ? AND ?`;
//         } else {

//             querySql = `
//                 SELECT 
//                     c.call_datetime,
//                     c.calltype,
//                     c.custphone,
//                     a.agentname,
//                     c.agent,
//                     c.agent_dial_start,
//                     c.agent_answered_at,
//                     c.agent_disconnected_at,
//                     c.agent_duration,
//                     c.customer_duration,
//                     c.customer_dial_start,
//                     c.customer_answered_at,
//                     c.customer_disconnected_at,
//                     c.api_response,
//                     c.recording_file,
//                     c.agent_disposition,
//                     c.customer_disposition
//                 FROM customcdr c
//                 JOIN rs_agentmobile a ON c.agent = a.agentmobile
//                 WHERE a.manager_id = ? 
//                 AND c.call_datetime BETWEEN ? AND ?`;

//             queryParams.unshift(manager_id);
//         }

//         const cdrData = await query(querySql, queryParams);

//         return res.json({ manager_id, cdr_data: cdrData });
//     } catch (err) {
//         console.error('Error fetching CDR data:', err);
//         return res.status(500).json({ error: 'Failed to fetch CDR data' });
//     }
// };

// module.exports = { getCdrData };



//   ******************************************************************************************** nEW for hydacalltrace



const { query } = require('../config/db');

const getCdrData = async (req, res) => {
    const { manager_id } = req.params;
    const { startDate, endDate, startTime, endTime } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Both startDate and endDate are required' });
    }

    const queryStartTime = startTime || '00:00:00';
    const queryEndTime = endTime || '23:59:59';

    const queryStartDateTime = `${startDate} ${queryStartTime}`;
    const queryEndDateTime = `${endDate} ${queryEndTime}`;

    try {
        let querySql;
        let queryParams = [queryStartDateTime, queryEndDateTime];

        if (manager_id == 2) {

            querySql = `
                SELECT 
                    c.call_datetime,
                    c.calltype,
                    c.custphone,
                    a.agentname,
                    c.agent_no,
                    c.call_start_time,
                    c.call_end_time,
                    c.dst_no,
                    c.duration,
                    c.call_wait_time,
                    c.bill_sec,
                    c.hangup_cause,
                    c.circle,
                    c.SIM_number,
                    c.recording_link
                FROM customcdr c
                JOIN rs_agentmobile a ON c.agent_no = a.agentmobile
                WHERE c.call_datetime BETWEEN ? AND ?`;
        } else {

            querySql = `
                SELECT 
                    c.call_datetime,
                    c.calltype,
                    c.custphone,
                    a.agentname,
                    c.agent_no,
                    c.call_start_time,
                    c.call_end_time,
                    c.dst_no,
                    c.duration,
                    c.call_wait_time,
                    c.bill_sec,
                    c.hangup_cause,
                    c.circle,
                    c.SIM_number,
                    c.recording_link
                FROM customcdr c
                JOIN rs_agentmobile a ON c.agent_no = a.agentmobile
                WHERE a.manager_id = ? 
                AND c.call_datetime BETWEEN ? AND ?`;

            queryParams.unshift(manager_id);
        }

        const cdrData = await query(querySql, queryParams);

        return res.json({ manager_id, cdr_data: cdrData });
    } catch (err) {
        console.error('Error fetching CDR data:', err);
        return res.status(500).json({ error: 'Failed to fetch CDR data' });
    }
};

module.exports = { getCdrData };