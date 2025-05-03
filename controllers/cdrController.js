//   ******************************************************************************************** nEW for hydacalltrace



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
//                     c.agent_no,
//                     c.call_start_time,
//                     c.call_end_time,
//                     c.dst_no,
//                     c.duration,
//                     c.call_wait_time,
//                     c.bill_sec,
//                     c.hangup_cause,
//                     c.circle,
//                     c.SIM_number,
//                     c.recording_link
//                 FROM customcdr c
//                 JOIN rs_agentmobile a ON c.agent_no = a.agentmobile
//                 WHERE c.call_datetime BETWEEN ? AND ?`;
//         } else {

//             querySql = `
//                 SELECT 
//                     c.call_datetime,
//                     c.calltype,
//                     c.custphone,
//                     a.agentname,
//                     c.agent_no,
//                     c.call_start_time,
//                     c.call_end_time,
//                     c.dst_no,
//                     c.duration,
//                     c.call_wait_time,
//                     c.bill_sec,
//                     c.hangup_cause,
//                     c.circle,
//                     c.SIM_number,
//                     c.recording_link
//                 FROM customcdr c
//                 JOIN rs_agentmobile a ON c.agent_no = a.agentmobile
//                 WHERE a.manager_id = ? 
//                 AND c.call_datetime BETWEEN ? AND ?`;

//             queryParams.unshift(manager_id);
//         }

//         const cdrData = await query(querySql, queryParams);
//         console.log('Query result count:', cdrData.length);
// console.log('Query result data:', cdrData);


//         return res.json({ manager_id, cdr_data: cdrData });
//     } catch (err) {
//         console.error('Error fetching CDR data:', err);
//         return res.status(500).json({ error: 'Failed to fetch CDR data' });
//     }
// };

// module.exports = { getCdrData };




// ******************************************************************************    HydaCall Second  ********************************************

// const { query } = require('../config/db');

// const getCdrData = async (req, res) => {
//     const { manager_id } = req.params;
//     const { startDate, endDate, startTime, endTime, agent, filter } = req.query;

//     if (!startDate || !endDate) {
//         return res.status(400).json({ error: 'Both startDate and endDate are required' });
//     }

//     const queryStartTime = startTime || '00:00:00';
//     const queryEndTime = endTime || '23:59:59';

//     const queryStartDateTime = `${startDate} ${queryStartTime}`;
//     const queryEndDateTime = `${endDate} ${queryEndTime}`;

//     let filterCondition = "";

//     if (filter === 'outbound') {
//         filterCondition = "(c.overall_call_status = 'Missed' AND c.caller_id = a.agentmobile)";
//     } else if (filter === 'inbound') {
//         filterCondition = "(c.overall_call_status = 'Missed' AND c.destination_number = a.agentmobile)";
//     } else if (filter === 'all') {
//         filterCondition = `
//         ((c.overall_call_status = 'Missed' AND c.caller_id = a.agentmobile)
//         OR
//         (c.overall_call_status = 'Missed' AND c.destination_number = a.agentmobile))
//         `;
//     } else {
//         return res.status(400).json({ error: 'Invalid filter provided' });
//     }


//     try {
//         let querySql;
//         let queryParams = [];

//         querySql = `
//             SELECT 
//                 c.timestamp,
//                 c.call_type,
//                 c.overall_call_status,
//                 a.agentname,
//                 a.agentmobile,
//                 c.caller_id,
//                 c.customer_name,
//                 c.client_correlation_id,
//                 c.caller_operator_name,
//                 c.time,
//                 c.caller_circle_name,
//                 c.destination_circle_name,
//                 c.destination_name,
//                 c.duration,
//                 c.destination_number_status,
//                 c.conversation_duration,
//                 c.overall_call_duration,
//                 c.customer_id,
//                 c.start_time,
//                 c.participant_address,
//                 c.participant_number_type,
//                 c.caller_id_type,
//                 c.caller_id_circle,
//                 c.participant_start_time,
//                 c.participant_end_time,
//                 c.participant_duration,
//                 c.hangup_cause,
//                 c.caller_duration,
//                 c.date,
//                 c.caller_number_status,
//                 c.destination_number,
//                 c.from_waiting_time,
//                 c.recording,
//                 c.end_time,
//                 c.destination_operator_name
//             FROM custom_cdr_calls c
//             JOIN agent a ON (
//                 (c.call_type = 'OUTBOUND' AND c.caller_id = a.agentmobile)
//                 OR
//                 (c.call_type = 'INBOUND' AND c.destination_number = a.agentmobile)
//             )
//         `;

//         if (manager_id != 2) {
//             querySql += ` WHERE a.manager_id = ? AND c.timestamp BETWEEN ? AND ?`;
//             queryParams.push(manager_id, queryStartDateTime, queryEndDateTime);
//         } else {
//             querySql += ` WHERE c.timestamp BETWEEN ? AND ?`;
//             queryParams.push(queryStartDateTime, queryEndDateTime);
//         }

//         if (filterCondition) {
//             querySql += ` AND ${filterCondition}`;
//         }

//         if (agent) {
//             querySql += ` AND a.agentmobile = ?`;
//             queryParams.push(agent);
//         }

//         const cdrData = await query(querySql, queryParams);
//         // console.log('Query result count:', cdrData.length);
//         // console.log('Query result data:', cdrData);

//         return res.json({ manager_id, cdr_data: cdrData });
//     } catch (err) {
//         console.error('Error fetching CDR data:', err);
//         return res.status(500).json({ error: 'Failed to fetch CDR data' });
//     }
// };

// module.exports = { getCdrData };



const { query } = require('../config/db');

const getCdrData = async (req, res) => {
    const { manager_id } = req.params;
    const { startDate, endDate, startTime, endTime, agent, filter, callStatus } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Both startDate and endDate are required' });
    }

    const queryStartTime = startTime || '00:00:00';
    const queryEndTime = endTime || '23:59:59';

    const queryStartDateTime = `${startDate} ${queryStartTime}`;
    const queryEndDateTime = `${endDate} ${queryEndTime}`;

    let filterCondition = "";

    if (filter === 'outbound') {
        filterCondition = "(RIGHT(c.caller_id, 10) = a.agentmobile)";
    } else if (filter === 'inbound') {
        filterCondition = "(RIGHT(c.destination_number, 10) = a.agentmobile)";
    } else if (filter === 'all') {
        filterCondition = `(
            (RIGHT(c.caller_id, 10) = a.agentmobile)
            OR
            (RIGHT(c.destination_number, 10) = a.agentmobile)
        )`;
    } else {
        return res.status(400).json({ error: 'Invalid filter provided' });
    }

    let callStatusCondition = "";

    if (callStatus === 'ANSWERED') {
        callStatusCondition = "(c.overall_call_status = 'ANSWERED')";
    } else if (callStatus === 'Missed') {
        callStatusCondition = "(c.overall_call_status = 'Missed')";
    } else if (callStatus === 'all') {
        callStatusCondition = `(
            (c.overall_call_status = 'ANSWERED')
            OR
            (c.overall_call_status = 'Missed')
        )`;
    } else {
        return res.status(400).json({ error: 'Invalid filter provided' });
    }

    try {
        let queryParams = [];
        let whereClauses = [];

        if (manager_id != 1) {
            whereClauses.push("a.manager_id = ?");
            queryParams.push(manager_id);
        }

        whereClauses.push("c.timestamp BETWEEN ? AND ?");
        queryParams.push(queryStartDateTime, queryEndDateTime);

        if (filterCondition) {
            whereClauses.push(filterCondition);
        }

        if (callStatusCondition) {
            whereClauses.push(callStatusCondition)
        }

        if (agent) {
            whereClauses.push("a.agentmobile = ?");
            queryParams.push(agent);
        }

        const querySql = `
            SELECT 
                c.timestamp,
                c.call_type,
                c.overall_call_status,
                a.agentname,
                a.agentmobile,
                c.caller_id,
                c.customer_name,
                c.client_correlation_id,
                c.caller_operator_name,
                c.time,
                c.caller_circle_name,
                c.destination_circle_name,
                c.destination_name,
                c.duration,
                c.destination_number_status,
                c.conversation_duration,
                c.overall_call_duration,
                c.customer_id,
                c.start_time,
                c.participant_address,
                c.participant_number_type,
                c.caller_id_type,
                c.caller_id_circle,
                c.participant_start_time,
                c.participant_end_time,
                c.participant_duration,
                c.hangup_cause,
                c.caller_duration,
                c.date,
                c.caller_number_status,
                c.destination_number,
                c.from_waiting_time,
                c.recording,
                c.end_time,
                c.destination_operator_name,
                 CASE
          WHEN c.call_type = 'OUTBOUND' THEN c.destination_number
          WHEN c.call_type = 'INBOUND' THEN c.caller_id
        END AS customer_number
            FROM custom_cdr_calls c
            JOIN agent a ON (
                (c.call_type = 'OUTBOUND' AND RIGHT(c.caller_id, 10) = a.agentmobile)
                OR
                (c.call_type = 'INBOUND' AND RIGHT(c.destination_number, 10) = a.agentmobile)
            )
            WHERE ${whereClauses.join(" AND ")}
        `;

        const cdrData = await query(querySql, queryParams);

        return res.json({ manager_id, cdr_data: cdrData });
    } catch (err) {
        console.error('Error fetching CDR data:', err);
        return res.status(500).json({ error: 'Failed to fetch CDR data' });
    }
};



// ***************************************************************************      Onle one call per customer number   **************


const getCdrDataSigletime = async (req, res) => {
    const { manager_id } = req.params;
    const { startDate, endDate, startTime, endTime, agent, filter, callStatus } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Both startDate and endDate are required' });
    }

    const queryStartTime = startTime || '00:00:00';
    const queryEndTime = endTime || '23:59:59';

    const queryStartDateTime = `${startDate} ${queryStartTime}`;
    const queryEndDateTime = `${endDate} ${queryEndTime}`;

    if (!['inbound', 'outbound', 'all'].includes(filter)) {
        return res.status(400).json({ error: 'Invalid call direction filter provided' });
    }

    if (!['ANSWERED', 'Missed', 'all'].includes(callStatus)) {
        return res.status(400).json({ error: 'Invalid call status filter provided' });
    }

    let queryParams = [];
    let whereClauses = [];

    if (manager_id != 1) {
        whereClauses.push("a.manager_id = ?");
        queryParams.push(manager_id);
    }

    whereClauses.push("c.timestamp BETWEEN ? AND ?");
    queryParams.push(queryStartDateTime, queryEndDateTime);

    if (filter === 'outbound') {
        whereClauses.push("(RIGHT(c.caller_id, 10) = a.agentmobile)");
    } else if (filter === 'inbound') {
        whereClauses.push("(RIGHT(c.destination_number, 10) = a.agentmobile)");
    } else if (filter === 'all') {
        whereClauses.push("(RIGHT(c.caller_id, 10) = a.agentmobile OR RIGHT(c.destination_number, 10) = a.agentmobile)");
    }

    if (callStatus === 'ANSWERED') {
        whereClauses.push("c.overall_call_status = 'ANSWERED'");
    } else if (callStatus === 'Missed') {
        whereClauses.push("c.overall_call_status = 'Missed'");
    } else if (callStatus === 'all') {
        whereClauses.push("(c.overall_call_status = 'ANSWERED' OR c.overall_call_status = 'Missed')");
    }

    if (agent) {
        whereClauses.push("a.agentmobile = ?");
        queryParams.push(agent);
    }

    const querySql = `
        SELECT main.*
        FROM (
            SELECT 
                c.timestamp,
                c.call_type,
                c.overall_call_status,
                a.agentname,
                a.agentmobile,
                c.caller_id,
                c.customer_name,
                c.client_correlation_id,
                c.caller_operator_name,
                c.time,
                c.caller_circle_name,
                c.destination_circle_name,
                c.destination_name,
                c.duration,
                c.destination_number_status,
                c.conversation_duration,
                c.overall_call_duration,
                c.customer_id,
                c.start_time,
                c.participant_address,
                c.participant_number_type,
                c.caller_id_type,
                c.caller_id_circle,
                c.participant_start_time,
                c.participant_end_time,
                c.participant_duration,
                c.hangup_cause,
                c.caller_duration,
                c.date,
                c.caller_number_status,
                c.destination_number,
                c.from_waiting_time,
                c.recording,
                c.end_time,
                c.destination_operator_name,
                CASE
                    WHEN c.call_type = 'OUTBOUND' THEN c.destination_number
                    WHEN c.call_type = 'INBOUND' THEN c.caller_id
                END AS customer_number,
                ROW_NUMBER() OVER (
                    PARTITION BY 
                        CASE
                            WHEN c.call_type = 'OUTBOUND' THEN c.destination_number
                            WHEN c.call_type = 'INBOUND' THEN c.caller_id
                        END
                    ORDER BY c.timestamp DESC
                ) AS rn
            FROM custom_cdr_calls c
            JOIN agent a ON (
                (c.call_type = 'OUTBOUND' AND RIGHT(c.caller_id, 10) = a.agentmobile)
                OR
                (c.call_type = 'INBOUND' AND RIGHT(c.destination_number, 10) = a.agentmobile)
            )
            WHERE ${whereClauses.join(" AND ")}
        ) AS main
        WHERE main.rn = 1
    `;

    try {
        const cdrData = await query(querySql, queryParams);

        const cleanData = JSON.parse(JSON.stringify(cdrData, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));

        return res.json({ manager_id, cdr_data: cleanData });
    } catch (err) {
        console.error('Error fetching CDR data:', err);
        return res.status(500).json({ error: 'Failed to fetch CDR data' });
    }
};

module.exports = { getCdrData, getCdrDataSigletime };
