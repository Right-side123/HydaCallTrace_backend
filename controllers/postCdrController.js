const { query } = require('../config/db');

const { pool } = require('../config/db');


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


// const insertCdr = async (req, res) => {
//   try {
//     const {
//       overall_call_status,
//       caller_id,
//       customer_name,
//       client_correlation_id,
//       caller_operator_name,
//       time,
//       caller_circle_name,
//       destination_circle_name,
//       pulse_count,
//       call_type,
//       caller_waiting_time,
//       destination_name,
//       duration,
//       destination_number_status,
//       billable_duration,
//       conversation_duration,
//       overall_call_duration,
//       customer_id,
//       start_time,
//       session_id,
//       destination_retry_count,
//       timestamp,
//       participant_address,
//       participant_type,
//       participant_number_type,
//       participant_number_country_code,
//       caller_id_type,
//       caller_id_circle,
//       caller_id_country_code,
//       participant_start_time,
//       participant_end_time,
//       participant_duration,
//       status,
//       participant_call_type,
//       participant_billable_duration,
//       participant_index,
//       request_name,
//       caller_id_international_point,
//       charge_type,
//       hangup_cause,
//       caller_retry_count,
//       destination_cli,
//       caller_duration,
//       date,
//       caller_number_status,
//       caller_status_detail,
//       destination_number,
//       dtmf_capture,
//       from_waiting_time,
//       destination_status_detail,
//       caller_name,
//       caller_number,
//       audios,
//       recording,
//       end_time,
//       destination_operator_name
//     } = req.body;


//     const insertCdrQuery = `
//       INSERT INTO custom_cdr_calls (
//         overall_call_status,
//         caller_id,
//         customer_name,
//         client_correlation_id,
//         caller_operator_name,
//         time,
//         caller_circle_name,
//         destination_circle_name,
//         pulse_count,
//         call_type,
//         caller_waiting_time,
//         destination_name,
//         duration,
//         destination_number_status,
//         billable_duration,
//         conversation_duration,
//         overall_call_duration,
//         customer_id,
//         start_time,
//         session_id,
//         destination_retry_count,
//         timestamp,
//         participant_address,
//         participant_type,
//         participant_number_type,
//         participant_number_country_code,
//         caller_id_type,
//         caller_id_circle,
//         caller_id_country_code,
//         participant_start_time,
//         participant_end_time,
//         participant_duration,
//         status,
//         participant_call_type,
//         participant_billable_duration,
//         participant_index,
//         request_name,
//         caller_id_international_point,
//         charge_type,
//         hangup_cause,
//         caller_retry_count,
//         destination_cli,
//         caller_duration,
//         date,
//         caller_number_status,
//         caller_status_detail,
//         destination_number,
//         dtmf_capture,
//         from_waiting_time,
//         destination_status_detail,
//         caller_name,
//         caller_number,
//         audios,
//         recording,
//         end_time,
//         destination_operator_name) VALUES
//         (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;
//     const requestCdrdata = [
//       overall_call_status,
//       caller_id,
//       customer_name,
//       client_correlation_id,
//       caller_operator_name,
//       time,
//       caller_circle_name,
//       destination_circle_name,
//       pulse_count,
//       call_type,
//       caller_waiting_time,
//       destination_name,
//       duration,
//       destination_number_status,
//       billable_duration,
//       conversation_duration,
//       overall_call_duration,
//       customer_id,
//       start_time,
//       session_id,
//       destination_retry_count,
//       timestamp,
//       participant_address,
//       participant_type,
//       participant_number_type,
//       participant_number_country_code,
//       caller_id_type,
//       caller_id_circle,
//       caller_id_country_code,
//       participant_start_time,
//       participant_end_time,
//       participant_duration,
//       status,
//       participant_call_type,
//       participant_billable_duration,
//       participant_index,
//       request_name,
//       caller_id_international_point,
//       charge_type,
//       hangup_cause,
//       caller_retry_count,
//       destination_cli,
//       caller_duration,
//       date,
//       caller_number_status,
//       caller_status_detail,
//       destination_number,
//       dtmf_capture,
//       from_waiting_time,
//       destination_status_detail,
//       caller_name,
//       caller_number,
//       audios,
//       recording,
//       end_time,
//       destination_operator_name
//     ];

//     const result = await query(insertCdrQuery, requestCdrdata);

//     const insertId = result.insertId;

//     const fetchQuery = `SELECT * FROM custom_cdr_calls WHERE id = ?`;
//     const insertedData = await query(fetchQuery, [insertId]);
//     const fixedData = JSON.parse(JSON.stringify(insertedData[0], (key, value) =>
//       typeof value === "bigint" ? value.toString() : value
//     ));

//     res.status(201).json({
//       Status: "Success",
//       message: "Data inserted successfully",
//       insertedData: fixedData
//     });

//   } catch (error) {
//     console.error('Error inserting data:', error);
//     if (error.sqlMessage) {
//       return res.status(400).json({
//         Status: "Error",
//         message: error.sqlMessage,
//         data: req.body
//       });
//     }

//     res.status(500).json({
//       Status: "Error",
//       message: "Internal Server Error",
//       data: req.body
//     });
//   }
// };

//   **********************************************     Agent Post   ****************

const insertAgent = async (req, res) => {
  try {

    const {
      agentname,
      agentmobile,
      managername,
      department,
      imei_no,
      SIM_No,
      status
    } = req.body;


    const validStatus = ["active", "not active"];
    if (!validStatus.includes(status.toLowerCase())) {
      return res.status(400).json({
        Status: "Error",
        message: "Status must be 'active' or 'not active'"
      });
    }


    const managerQuery = `SELECT manager_id FROM manager WHERE managername = ?`;
    const managerResult = await query(managerQuery, [managername]);

    if (managerResult.length === 0) {
      return res.status(400).json({
        Status: "Error",
        message: "Manager not found"
      });
    }

    const managerId = managerResult[0].manager_id;


    const insertAgentQuery = `
      INSERT INTO agent (
        agentname,
        agentmobile,
        manager_id, 
        department,
        imei_no,
        SIM_No,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const capitalizeStatus =
      status.toLowerCase() === "active" ? "Active" : "Not Active";

    const requestAgentdata = [
      agentname,
      agentmobile,
      managerId,
      department,
      imei_no,
      SIM_No,
      capitalizeStatus
    ];

    const result = await query(insertAgentQuery, requestAgentdata);
    const insertId = result.insertId;


    const fetchQuery = `SELECT * FROM agent WHERE id = ?`;
    const insertedData = await query(fetchQuery, [insertId]);

    const fixedData = JSON.parse(JSON.stringify(insertedData[0], (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    ));

    res.status(201).json({
      Status: "Success",
      message: "Agent inserted successfully",
      insertedData: fixedData
    });

  } catch (error) {
    console.error('Error inserting agent:', error);
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


// ****************************************************************                          Update Agent        ****************************


const updateAgent = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      agentname,
      agentmobile,
      managername,
      department,
      imei_no,
      SIM_No,
      status
    } = req.body;

    const validStatus = ["active", "not active"];
    if (!validStatus.includes(status.toLowerCase())) {
      return res.status(400).json({
        Status: "Error",
        message: "Status must be 'active' or 'not active'"
      });
    }

    const managerQuery = `SELECT manager_id FROM manager WHERE managername = ?`;
    const managerResult = await query(managerQuery, [managername]);

    if (managerResult.length === 0) {
      return res.status(400).json({
        Status: "Error",
        message: "Manager not found"
      });
    }

    const managerId = managerResult[0].manager_id;

    const capitalizeStatus =
      status.toLowerCase() === "active" ? "Active" : "Not Active";

    const updateQuery = `
      UPDATE agent SET
        agentname = ?,
        agentmobile = ?,
        manager_id = ?,
        department = ?,
        imei_no = ?,
        SIM_No = ?,
        status = ?
      WHERE id = ?
    `;

    const updateValues = [
      agentname,
      agentmobile,
      managerId,
      department,
      imei_no,
      SIM_No,
      capitalizeStatus,
      id
    ];

    await query(updateQuery, updateValues);

    const updatedData = await query(`SELECT * FROM agent WHERE id = ?`, [id]);

    res.status(200).json({
      Status: "Success",
      message: "Agent updated successfully",
      updatedData: updatedData[0]
    });

  } catch (error) {
    console.error("Error updating agent:", error);
    res.status(500).json({
      Status: "Error",
      message: "Internal Server Error",
      error: error.message
    });
  }
};


const insertCdr = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const {
      Overall_Call_Status,
      Caller_ID,
      Customer_Name,
      Client_Correlation_Id,
      Caller_Operator_Name,
      Time,
      Caller_Circle_Name,
      Destination_Circle_Name,
      Pulse_Count,
      callType,
      Caller_Waiting_Time,
      Destination_Name,
      duration,
      Billable_Duration,
      conversationDuration,
      Overall_Call_Duration,
      customerId,
      overallCallStatus,
      startTime,
      Session_ID,
      Destination_Retry_Count,
      Caller_Status,
      Destination_Status,
      timestamp,
      Conversation_Duration,
      Hangup_Cause,
      callerNumber,
      Caller_Retry_Count,
      Destination_CLI,
      Missed_Destination_Number,
      Caller_Duration,
      Date: inputDate,
      Caller_Status_Detail,
      DTMF_Capture,
      destinationNumber,
      fromWaitingTime,
      Call_Type,
      Destination_Status_Detail,
      Caller_Name,
      Caller_Number,
      Recording,
      endTime,
      Destination_Number,
      Destination_Operator_Name
    } = req.body;


    const formatDate = (inputDate) => {
      if (!inputDate) return null;
      const [day, month, year] = inputDate.split('/');
      return `${year}-${month}-${day}`;
    };

    // ⭐ Use inputDate instead of Date
    const formattedDate = formatDate(inputDate);

    // Add +5:30 to timestamp

    let formattedTimestamp = null;

    if (timestamp) {
      // Manual parsing "YYYY-MM-DD HH:mm:ss"
      const [datePart, timePart] = timestamp.split(' ');
      const [year, month, day] = datePart.split('-').map(Number);
      const [hour, minute, second] = timePart.split(':').map(Number);

      // Create date in UTC
      const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute, second));

      // Add 5 hours 30 minutes (IST)
      const istDate = new Date(utcDate.getTime() + (5.5 * 60 * 60 * 1000));

      // Format as "YYYY-MM-DD HH:mm:ss"
      formattedTimestamp = istDate.toISOString().slice(0, 19).replace('T', ' ');
    }

    const callInsertQuery = `
      INSERT INTO callsrecord (
        Overall_Call_Status, Caller_ID, Customer_Name, Client_Correlation_Id, Caller_Operator_Name, Time,
        Caller_Circle_Name, Destination_Circle_Name, Pulse_Count, callType, Caller_Waiting_Time, Destination_Name,
        duration, Billable_Duration, conversationDuration, Overall_Call_Duration, customerId, overallCallStatus,
        startTime, Session_ID, Destination_Retry_Count, Caller_Status, Destination_Status, timestamp,
        Conversation_Duration, Hangup_Cause, callerNumber, Caller_Retry_Count, Destination_CLI, Missed_Destination_Number,
        Caller_Duration, Date, Caller_Status_Detail, DTMF_Capture, destinationNumber, fromWaitingTime, Call_Type,
        Destination_Status_Detail, Caller_Name, Caller_Number, Recording, endTime, Destination_Number, Destination_Operator_Name
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    const callValues = [
      Overall_Call_Status, Caller_ID, Customer_Name, Client_Correlation_Id, Caller_Operator_Name, Time,
      Caller_Circle_Name, Destination_Circle_Name, Pulse_Count, callType, Caller_Waiting_Time, Destination_Name,
      duration, Billable_Duration, conversationDuration, Overall_Call_Duration, customerId, overallCallStatus,
      startTime, Session_ID, Destination_Retry_Count, Caller_Status, Destination_Status, formattedTimestamp,
      Conversation_Duration, Hangup_Cause, callerNumber, Caller_Retry_Count, Destination_CLI, Missed_Destination_Number,
      Caller_Duration, formattedDate, Caller_Status_Detail, DTMF_Capture, destinationNumber, fromWaitingTime, Call_Type,
      Destination_Status_Detail, Caller_Name, Caller_Number, Recording, endTime, Destination_Number, Destination_Operator_Name
    ];

    const callResult = await connection.query(callInsertQuery, callValues);
    const callId = callResult.insertId;

    if (req.body.participants && Array.isArray(req.body.participants)) {
      for (const p of req.body.participants) {
        const participantResult = await connection.query(`
          INSERT INTO participants (
            call_id, participantAddress, participantType, participantNumberType,
            participantNumberCountryCode, callerIdType, callerIdCircle, callerIdCountryCode,
            callerId, startTime, endTime, duration, status, hangupCause, audios,
            participantCallType, billableDuration, pulse, requestNo, participantIndex,
            requestName, mergeType, callerIdInternationalPoint, chargeType
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          Session_ID,
          p.participantAddress,
          p.participantType,
          p.participantNumberType,
          p.participantNumberCountryCode,
          p.callerIdType,
          p.callerIdCircle,
          p.callerIdCountryCode,
          p.callerId,
          p.startTime,
          p.endTime,
          p.duration,
          p.status,
          p.hangupCause,
          JSON.stringify(p.audios),
          p.participantCallType,
          p.billableDuration,
          p.pulse,
          p.requestNo,
          p.participantIndex,
          p.requestName,
          p.mergeType,
          p.callerIdInternationalPoint,
          p.chargeType
        ]);

        const participantId = participantResult.insertId;


        if (Array.isArray(p.audios)) {
          for (const audio of p.audios) {
            await connection.query(`
              INSERT INTO audios (participant_id, audioURL) VALUES (?, ?)
            `, [participantId, audio.audioURL]);
          }
        }
      }
    }

    await connection.commit();

    res.status(201).json({
      Status: "Success",
      message: "Data inserted successfully",
      call_id: String(callId)
    });


  } catch (error) {
    await connection.rollback();
    console.error("Insert Error:", error);

    res.status(500).json({
      Status: "Error",
      message: error.message,
    });
  } finally {
    connection.release();
  }
};

module.exports = { postCdrData, insertCdr, insertAgent, updateAgent };
