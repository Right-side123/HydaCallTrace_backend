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

            //    agent_disconnected_at, agent_duration,
            //     agent_billsec, customer_duration, customer_billsec,
            //     customer_status, customer_dial_start, customer_answered_at,
            //     customer_disconnected_at, api_body, asteriskconnection,
            //     asterisk_response, api_response, recording_file, agent_outcallerid,
            //     customer_outcallerid, agent_dialstatus, agent_disposition,
            //     agent_hangupcause, agent_hangup_isdn_string, agent_hangup_sip_reason,
            //     customer_dialstatus, customer_disposition, customer_hangupcause,
            //     customer_hangup_isdn_string, customer_hangup_sip_reason, Circle, SIM_Number
        } = req.body;


        const sql = `
            INSERT INTO customcdr (
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
                ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
            `;


        await query(sql, [
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
        ]);


        res.status(201).json({ message: 'Data inserted successfully' });

    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { postCdrData };
