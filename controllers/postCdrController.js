const { query } = require('../config/db');

const postCdrData = async (req, res) => {
    try {
        const {
            call_datetime,
            agent_no,
            custphone,
            calltype,
            call_start_time,
            call_end_time,
            dst_no,
            duration,
            call_wait_time,
            bill_sec,
            hangup_cause,
            recording_link,
            circle,
            SIM_number
        } = req.body;


        const requestData = {
            call_datetime, agent_no, custphone, calltype, call_start_time,
            call_end_time, dst_no, duration, call_wait_time, bill_sec,
            hangup_cause, recording_link, circle, SIM_number
        };


        if (!call_datetime || !call_start_time || !call_end_time || !dst_no || !duration || !hangup_cause || !circle) {
            return res.status(400).json({
                Status: "Error",
                message: "Missing required fields",
                data: requestData
            });
        }


        const formattedCallType = calltype ? calltype.trim().toLowerCase() : '';


        if (formattedCallType === 'outbound' && (!agent_no || agent_no.trim() === '')) {
            return res.status(400).json({
                Status: "Error",
                message: "agent_no is mandatory for Outbound calls",
                data: requestData
            });
        }

        if (formattedCallType === 'incomming call' && (!custphone || custphone.trim() === '')) {
            return res.status(400).json({
                Status: "Error",
                message: "custphone is mandatory for Incoming calls",
                data: requestData
            });
        }


        const insertQuery = `
            INSERT INTO customcdr (
                call_datetime, agent_no, custphone, calltype, call_start_time,
                call_end_time, dst_no, duration, call_wait_time, bill_sec,
                hangup_cause, recording_link, circle, SIM_number
            ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        `;

        const result = await query(insertQuery, [
            call_datetime, agent_no || null, custphone || null, formattedCallType,
            call_start_time, call_end_time, dst_no, duration, call_wait_time || 0,
            bill_sec || 0, hangup_cause, recording_link || null, circle, SIM_number || null
        ]);

        const insertedId = result.insertId;


        const fetchQuery = `SELECT * FROM customcdr WHERE id = ?`;
        const insertedData = await query(fetchQuery, [insertedId]);

        const fixedData = JSON.parse(JSON.stringify(insertedData[0], (key, value) =>
            typeof value === "bigint" ? value.toString() : value
        ));

        res.status(201).json({
            Status: "Success",
            message: "Data inserted successfully",
            insertedData: fixedData
        });

    } catch (error) {
        console.error('Error inserting data:', error);


        if (error.sqlMessage) {
            return res.status(400).json({
                Status: "Error",
                message: error.sqlMessage,
                data: req.body
            });
        }

        res.status(500).json({
            Status: "Error",
            message: "Internal Server Error",
            data: req.body
        });
    }
};

module.exports = { postCdrData };
