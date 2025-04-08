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
        message: "custphone is mandatory for Incomming calls",
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

// ***********************************************************
// **********************************************************************************
// **********************************************************************************************************


const insertCdr = async (req, res) => {
  try {
    const {
      overall_call_status,
      caller_id,
      customer_name,
      client_correlation_id,
      caller_operator_name,
      time,
      caller_circle_name,
      destination_circle_name,
      pulse_count,
      call_type,
      caller_waiting_time,
      destination_name,
      duration,
      destination_number_status,
      billable_duration,
      conversation_duration,
      overall_call_duration,
      customer_id,
      start_time,
      session_id,
      destination_retry_count,
      timestamp,
      participant_address,
      participant_type,
      participant_number_type,
      participant_number_country_code,
      caller_id_type,
      caller_id_circle,
      caller_id_country_code,
      participant_start_time,
      participant_end_time,
      participant_duration,
      status,
      participant_call_type,
      participant_billable_duration,
      participant_index,
      request_name,
      caller_id_international_point,
      charge_type,
      hangup_cause,
      caller_retry_count,
      destination_cli,
      caller_duration,
      date,
      caller_number_status,
      caller_status_detail,
      destination_number,
      dtmf_capture,
      from_waiting_time,
      destination_status_detail,
      caller_name,
      caller_number,
      audios,
      recording,
      end_time,
      destination_operator_name
    } = req.body;


    const insertCdrQuery = `
      INSERT INTO custom_cdr_calls (
        overall_call_status,
        caller_id,
        customer_name,
        client_correlation_id,
        caller_operator_name,
        time,
        caller_circle_name,
        destination_circle_name,
        pulse_count,
        call_type,
        caller_waiting_time,
        destination_name,
        duration,
        destination_number_status,
        billable_duration,
        conversation_duration,
        overall_call_duration,
        customer_id,
        start_time,
        session_id,
        destination_retry_count,
        timestamp,
        participant_address,
        participant_type,
        participant_number_type,
        participant_number_country_code,
        caller_id_type,
        caller_id_circle,
        caller_id_country_code,
        participant_start_time,
        participant_end_time,
        participant_duration,
        status,
        participant_call_type,
        participant_billable_duration,
        participant_index,
        request_name,
        caller_id_international_point,
        charge_type,
        hangup_cause,
        caller_retry_count,
        destination_cli,
        caller_duration,
        date,
        caller_number_status,
        caller_status_detail,
        destination_number,
        dtmf_capture,
        from_waiting_time,
        destination_status_detail,
        caller_name,
        caller_number,
        audios,
        recording,
        end_time,
        destination_operator_name) VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const requestCdrdata = [
      overall_call_status,
      caller_id,
      customer_name,
      client_correlation_id,
      caller_operator_name,
      time,
      caller_circle_name,
      destination_circle_name,
      pulse_count,
      call_type,
      caller_waiting_time,
      destination_name,
      duration,
      destination_number_status,
      billable_duration,
      conversation_duration,
      overall_call_duration,
      customer_id,
      start_time,
      session_id,
      destination_retry_count,
      timestamp,
      participant_address,
      participant_type,
      participant_number_type,
      participant_number_country_code,
      caller_id_type,
      caller_id_circle,
      caller_id_country_code,
      participant_start_time,
      participant_end_time,
      participant_duration,
      status,
      participant_call_type,
      participant_billable_duration,
      participant_index,
      request_name,
      caller_id_international_point,
      charge_type,
      hangup_cause,
      caller_retry_count,
      destination_cli,
      caller_duration,
      date,
      caller_number_status,
      caller_status_detail,
      destination_number,
      dtmf_capture,
      from_waiting_time,
      destination_status_detail,
      caller_name,
      caller_number,
      audios,
      recording,
      end_time,
      destination_operator_name
    ];

    const result = await query(insertCdrQuery, requestCdrdata);

    const insertId = result.insertId;

    const fetchQuery = `SELECT * FROM custom_cdr_calls WHERE id = ?`;
    const insertedData = await query(fetchQuery, [insertId]);
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

module.exports = { postCdrData, insertCdr };
