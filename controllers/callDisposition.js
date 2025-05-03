const { query } = require('../config/db');

// const getConnectedCall = async (req, res) => {

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
//               AND c.agent_disposition = 'ANSWERED'
//               AND c.customer_disposition = 'ANSWERED';
//         `;

//         const cdrData = await query(querySql, [manager_id, queryStartDateTime, queryEndDateTime]);

//         return res.json({ manager_id, cdr_data: cdrData });

//     } catch (err) {
//         console.error('Error fetching inbound CDR data:', err);
//         return res.status(500).json({ error: 'Failed to fetch inbound CDR data' });
//     }
// };

// const getNotconnectedCall = async (req, res) => {
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
//               AND c.call_datetime BETWEEN ? AND ?
//               AND c.agent_disposition = 'ANSWERED'
//               AND c.customer_disposition = 'NO ANSWER';
//         `;

//         const cdrData = await query(querySql, [manager_id, queryStartDateTime, queryEndDateTime]);

//         return res.json({ manager_id, cdr_data: cdrData });

//     } catch (err) {
//         console.error('Error fetching inbound CDR data:', err);
//         return res.status(500).json({ error: 'Failed to fetch inbound CDR data' });
//     }
// };

// const getMissedOutboundCall = async (req, res) => {
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

//             WHERE c.call_datetime BETWEEN ? AND ?

// AND (
//     (c.agent_disposition = 'ANSWERED' AND c.customer_disposition = 'NO ANSWER')
//     OR 
//     (c.agent_disposition = 'NO ANSWER' AND c.customer_disposition IS NULL)
// )
// AND c.calltype = 'Outbound';

//         `;

//         const cdrData = await query(querySql, [queryStartDateTime, queryEndDateTime]);

//         return res.json({ cdr_data: cdrData });

//     } catch (err) {
//         console.error('Error fetching inbound CDR data:', err);
//         return res.status(500).json({ error: 'Failed to fetch inbound CDR data' });
//     }
// };


// const getMissedOutboundCall = async (req, res) => {
//     const { manager_id } = req.params;
//     const { startDate, endDate, startTime, endTime, filter } = req.query;


//     if (!startDate || !endDate) {
//         return res.status(400).json({ error: 'Both startDate and endDate are required' });
//     }


//     const queryStartTime = startTime || '00:00:00';
//     const queryEndTime = endTime || '23:59:59';


//     const queryStartDateTime = `${startDate} ${queryStartTime}`;
//     const queryEndDateTime = `${endDate} ${queryEndTime}`;

//     // console.log(`Start DateTime: ${queryStartDateTime}, End DateTime: ${queryEndDateTime}`);


//     let filterCondition = "";

//     if (filter === 'missedByCustomer') {
//         filterCondition = "(c.agent_disposition = 'ANSWERED' AND c.customer_disposition = 'NO ANSWER')";
//     } else if (filter === 'missedByAgent') {
//         filterCondition = "(c.agent_disposition = 'NO ANSWER' AND c.customer_disposition IS NULL)";
//     } else if (filter === 'all') {
//         filterCondition = `
//             ((c.agent_disposition = 'ANSWERED' AND c.customer_disposition = 'NO ANSWER') 
//             OR 
//             (c.agent_disposition = 'NO ANSWER' AND c.customer_disposition IS NULL))
//         `;
//     } else {
//         return res.status(400).json({ error: 'Invalid filter provided' });
//     }

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
//             AND c.calltype = 'Outbound'
//             AND ${filterCondition};
//         `;

//         // console.log(`Executing SQL Query: ${querySql}`);


//         const cdrData = await query(querySql, [manager_id, queryStartDateTime, queryEndDateTime]);


//         return res.json({ manager_id, cdr_data: cdrData });

//     } catch (err) {
//         console.error('Error fetching missed outbound CDR data:', err);
//         return res.status(500).json({ error: 'Failed to fetch missed outbound CDR data' });
//     }
// };




// const getMissedCall = async (req, res) => {
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
//               AND c.call_datetime BETWEEN ? AND ?
//               AND c.calltype = 'Incomming Call'
//               AND c.agent_disposition = 'NO ANSWER';
//         `;

//         const cdrData = await query(querySql, [manager_id, queryStartDateTime, queryEndDateTime]);

//         return res.json({ manager_id, cdr_data: cdrData });

//     } catch (err) {
//         console.error('Error fetching inbound CDR data:', err);
//         return res.status(500).json({ error: 'Failed to fetch inbound CDR data' });
//     }
// };



/*******************************************************************
 *                                             ********************************************************************* 
 *                                                                                                *****************************************************/

/***************************************                Connected calls               **************************************/

const getConnectedCall = async (req, res) => {

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
                c.agent,
                c.agent_dial_start,
                c.agent_answered_at,
                c.agent_disconnected_at,
                c.agent_duration,
                c.customer_duration,
                c.customer_dial_start,
                c.customer_answered_at,
                c.customer_disconnected_at,
                c.api_response,
                c.recording_file,
                c.agent_disposition,
                c.customer_disposition

            FROM customcdr c

            JOIN rs_agentmobile a ON c.agent = a.agentmobile
            WHERE c.call_datetime BETWEEN ? AND ?
              AND c.agent_disposition = 'ANSWERED'
              AND c.customer_disposition = 'ANSWERED';
        `;
        } else {

            querySql = `
            SELECT 
                c.call_datetime,
                c.calltype,
                c.custphone,
                a.agentname,
                c.agent,
                c.agent_dial_start,
                c.agent_answered_at,
                c.agent_disconnected_at,
                c.agent_duration,
                c.customer_duration,
                c.customer_dial_start,
                c.customer_answered_at,
                c.customer_disconnected_at,
                c.api_response,
                c.recording_file,
                c.agent_disposition,
                c.customer_disposition

            FROM customcdr c

            JOIN rs_agentmobile a ON c.agent = a.agentmobile
            WHERE a.manager_id = ?
            AND c.call_datetime BETWEEN ? AND ?
              AND c.agent_disposition = 'ANSWERED'
              AND c.customer_disposition = 'ANSWERED';
        `;

            queryParams.unshift(manager_id);

        }

        const cdrData = await query(querySql, queryParams);

        return res.json({ manager_id, cdr_data: cdrData });

    } catch (err) {
        console.error('Error fetching inbound CDR data:', err);
        return res.status(500).json({ error: 'Failed to fetch inbound CDR data' });
    }
};


/************************************************         Not Connected      ************************************************/

const getNotconnectedCall = async (req, res) => {
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
                c.agent,
                c.agent_dial_start,
                c.agent_answered_at,
                c.agent_disconnected_at,
                c.agent_duration,
                c.customer_duration,
                c.customer_dial_start,
                c.customer_answered_at,
                c.customer_disconnected_at,
                c.api_response,
                c.recording_file,
                c.agent_disposition,
                c.customer_disposition

            FROM customcdr c

            JOIN rs_agentmobile a ON c.agent = a.agentmobile
            WHERE c.call_datetime BETWEEN ? AND ?
              AND c.agent_disposition = 'ANSWERED'
              AND c.customer_disposition = 'NO ANSWER';
        `;
        } else {

            querySql = `
            SELECT 
                c.call_datetime,
                c.calltype,
                c.custphone,
                a.agentname,
                c.agent,
                c.agent_dial_start,
                c.agent_answered_at,
                c.agent_disconnected_at,
                c.agent_duration,
                c.customer_duration,
                c.customer_dial_start,
                c.customer_answered_at,
                c.customer_disconnected_at,
                c.api_response,
                c.recording_file,
                c.agent_disposition,
                c.customer_disposition

            FROM customcdr c

            JOIN rs_agentmobile a ON c.agent = a.agentmobile
            WHERE a.manager_id = ?
              AND c.call_datetime BETWEEN ? AND ?
              AND c.agent_disposition = 'ANSWERED'
              AND c.customer_disposition = 'NO ANSWER';
        `;

            queryParams.unshift(manager_id);

        }

        const cdrData = await query(querySql, queryParams);

        return res.json({ manager_id, cdr_data: cdrData });

    } catch (err) {
        console.error('Error fetching inbound CDR data:', err);
        return res.status(500).json({ error: 'Failed to fetch inbound CDR data' });
    }
};



/**********************************************     Missedoutbound Calls    *************************************/

const getMissedOutboundCall = async (req, res) => {
    const { manager_id } = req.params;
    const { startDate, endDate, startTime, endTime, filter } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Both startDate and endDate are required' });
    }

    const queryStartTime = startTime || '00:00:00';
    const queryEndTime = endTime || '23:59:59';


    const queryStartDateTime = `${startDate} ${queryStartTime}`;
    const queryEndDateTime = `${endDate} ${queryEndTime}`;

    let filterCondition = "";

    if (filter === 'missedByCustomer') {
        filterCondition = "(c.agent_disposition = 'ANSWERED' AND c.customer_disposition = 'NO ANSWER')";
    } else if (filter === 'missedByAgent') {
        filterCondition = "(c.agent_disposition = 'NO ANSWER' AND c.customer_disposition IS NULL)";
    } else if (filter === 'all') {
        filterCondition = `
            ((c.agent_disposition = 'ANSWERED' AND c.customer_disposition = 'NO ANSWER') 
            OR 
            (c.agent_disposition = 'NO ANSWER' AND c.customer_disposition IS NULL))
        `;
    } else {
        return res.status(400).json({ error: 'Invalid filter provided' });
    }

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
                c.agent,
                c.agent_dial_start,
                c.agent_answered_at,
                c.agent_disconnected_at,
                c.agent_duration,
                c.customer_duration,
                c.customer_dial_start,
                c.customer_answered_at,
                c.customer_disconnected_at,
                c.api_response,
                c.recording_file,
                c.agent_disposition,
                c.customer_disposition
            FROM customcdr c
            JOIN rs_agentmobile a ON c.agent = a.agentmobile
            WHERE c.call_datetime BETWEEN ? AND ?
            AND c.calltype = 'Outbound'
            AND ${filterCondition};
        `;
        } else {

            querySql = `
            SELECT 
                c.call_datetime,
                c.calltype,
                c.custphone,
                a.agentname,
                c.agent,
                c.agent_dial_start,
                c.agent_answered_at,
                c.agent_disconnected_at,
                c.agent_duration,
                c.customer_duration,
                c.customer_dial_start,
                c.customer_answered_at,
                c.customer_disconnected_at,
                c.api_response,
                c.recording_file,
                c.agent_disposition,
                c.customer_disposition
            FROM customcdr c
            JOIN rs_agentmobile a ON c.agent = a.agentmobile
            WHERE a.manager_id = ?
            AND c.call_datetime BETWEEN ? AND ?
            AND c.calltype = 'Outbound'
            AND ${filterCondition};
        `;

            queryParams.unshift(manager_id);
        }

        const cdrData = await query(querySql, queryParams);


        return res.json({ manager_id, cdr_data: cdrData });

    } catch (err) {
        console.error('Error fetching missed outbound CDR data:', err);
        return res.status(500).json({ error: 'Failed to fetch missed outbound CDR data' });
    }
};


/**********************************************************  Missed Calls  *************************************************/

// const getMissedCall = async (req, res) => {
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
//             WHERE c.call_datetime BETWEEN ? AND ?
//               AND c.calltype = 'Incomming Call'
//               AND c.agent_disposition = 'NO ANSWER';
//         `;
//         } else {

//             querySql = `
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
//               AND c.call_datetime BETWEEN ? AND ?
//               AND c.calltype = 'Incomming Call'
//               AND c.agent_disposition = 'NO ANSWER';
//         `;

//             queryParams.unshift(manager_id);
//         }

//         const cdrData = await query(querySql, queryParams);

//         return res.json({ manager_id, cdr_data: cdrData });

//     } catch (err) {
//         console.error('Error fetching inbound CDR data:', err);
//         return res.status(500).json({ error: 'Failed to fetch inbound CDR data' });
//     }
// };



// ***********************************   for hydacalltrace   **************



const getMissedCall = async (req, res) => {
    const { manager_id } = req.params;
    const { startDate, endDate, startTime, endTime, filter } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Both startDate and endDate are required' });
    }

    const queryStartTime = startTime || '00:00:00';
    const queryEndTime = endTime || '23:59:59';

    const queryStartDateTime = `${startDate} ${queryStartTime}`;
    const queryEndDateTime = `${endDate} ${queryEndTime}`;

    let filterCondition = "";

    if (filter === 'outbound') {
        filterCondition = "(c.overall_call_status = 'Missed' AND RIGHT(c.caller_id, 10) = a.agentmobile)";
    } else if (filter === 'inbound') {
        filterCondition = "(c.overall_call_status = 'Missed' AND RIGHT(c.destination_number, 10) = a.agentmobile)";
    } else if (filter === 'all') {
        filterCondition = `
        ((c.overall_call_status = 'Missed' AND RIGHT(c.caller_id, 10) = a.agentmobile)
        OR
        (c.overall_call_status = 'Missed' AND RIGHT(c.destination_number, 10) = a.agentmobile))
        `;
    } else {
        return res.status(400).json({ error: 'Invalid filter provided' });
    }

    try {
        let querySql = `
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
            JOIN agent a 
              ON (
                (c.call_type = 'OUTBOUND' AND RIGHT(c.caller_id, 10) = a.agentmobile)
                OR
                (c.call_type = 'INBOUND' AND RIGHT(c.destination_number, 10) = a.agentmobile)
              )
            WHERE c.timestamp BETWEEN ? AND ?
            AND ${filterCondition}
        `;
        let queryParams = [queryStartDateTime, queryEndDateTime];


        if (manager_id != 1) {
            querySql += ` AND a.manager_id = ?`;
            queryParams.push(manager_id);
        }

        const cdrData = await query(querySql, queryParams);

        return res.json({ manager_id, cdr_data: cdrData });

    } catch (err) {
        console.error('Error fetching missed CDR data:', err);
        return res.status(500).json({ error: 'Failed to fetch missed CDR data' });
    }
};


module.exports = { getConnectedCall, getNotconnectedCall, getMissedOutboundCall, getMissedCall };
