// const { query } = require("../config/db");

// const AgentsController = async (req, res) => {
//   try {

//     const { start_date, end_date } = req.query;

//     let agentSql = `
//       SELECT 
//         a.agentname,
//         a.agentmobile,
//         a.status,
//         a.region,
//         COUNT(c.agent) AS totalCalls,
//         SUM(CASE WHEN c.agent_disposition = 'ANSWERED' AND c.customer_disposition = 'ANSWERED' THEN 1 ELSE 0 END) AS totalConnected,
//         SUM(CASE WHEN c.agent_disposition = 'ANSWERED' AND c.customer_disposition = 'NO ANSWER' THEN 1 ELSE 0 END) AS totalNotConnected,
//         SUM(CASE WHEN c.calltype = 'Outbound' THEN 1 ELSE 0 END) AS totaloutbound,
//         SUM(CASE WHEN c.calltype = 'Incomming Call' THEN 1 ELSE 0 END) AS totalincomming,
//         SUM(CASE WHEN ((c.agent_disposition = 'ANSWERED' AND c.customer_disposition = 'NO ANSWER') 
//             OR 
//             (c.agent_disposition = 'NO ANSWER' AND c.customer_disposition IS NULL)) THEN 1 ELSE 0 END) AS totalMissedOutbound,
//         SUM(CASE WHEN c.calltype = 'Incomming Call' AND c.agent_disposition = 'NO ANSWER' THEN 1 ELSE 0 END) AS totalAbandoned
//       FROM rs_agentmobile a
//       LEFT JOIN customcdr c ON a.agentmobile = c.agent
//     `;


//     if (start_date && end_date) {
//       agentSql += ` WHERE c.call_datetime BETWEEN '${start_date}' AND '${end_date}'`;
//     }


//     agentSql += ` GROUP BY a.agentname, a.agentmobile`;

//     const agents = await query(agentSql);


//     const formattedAgents = agents.map(agent => {
//       const formattedAgent = { ...agent };

//       Object.keys(formattedAgent).forEach(key => {
//         if (typeof formattedAgent[key] === 'bigint') {
//           formattedAgent[key] = formattedAgent[key].toString();
//         }
//       });

//       return formattedAgent;
//     });


//     res.json({
//       agents: formattedAgents,
//     });

//   } catch (err) {
//     console.error("Error:", err);
//     return res.status(500).send("Internal Server Error");
//   }
// };

// module.exports = { AgentsController };






// const { query } = require("../config/db");

// const AgentsController = async (req, res) => {
//   try {

//     const { start_date, end_date } = req.query;
//     const { manager_id } = req.params;

//     let agentSql = `
//       SELECT 
//         a.agentname,
//         a.agentmobile,
//         a.status,
//         a.region,
//         COUNT(c.agent) AS totalCalls,
//         SUM(CASE WHEN c.agent_disposition = 'ANSWERED' AND c.customer_disposition = 'ANSWERED' THEN 1 ELSE 0 END) AS totalConnected,
//         SUM(CASE WHEN c.agent_disposition = 'ANSWERED' AND c.customer_disposition = 'NO ANSWER' THEN 1 ELSE 0 END) AS totalNotConnected,
//         SUM(CASE WHEN c.calltype = 'Outbound' THEN 1 ELSE 0 END) AS totaloutbound,
//         SUM(CASE WHEN c.calltype = 'Incomming Call' THEN 1 ELSE 0 END) AS totalincomming,
//         SUM(CASE WHEN ((c.agent_disposition = 'ANSWERED' AND c.customer_disposition = 'NO ANSWER') 
//             OR 
//             (c.agent_disposition = 'NO ANSWER' AND c.customer_disposition IS NULL)) THEN 1 ELSE 0 END) AS totalMissedOutbound,
//         SUM(CASE WHEN c.calltype = 'Incomming Call' AND c.agent_disposition = 'NO ANSWER' THEN 1 ELSE 0 END) AS totalAbandoned
//       FROM rs_agentmobile a
//       LEFT JOIN customcdr c ON a.agentmobile = c.agent
//       WHERE a.manager_id = ?
//     `;


//     if (start_date && end_date) {
//       agentSql += ` AND c.call_datetime BETWEEN '${start_date}' AND '${end_date}'`;
//     }


//     agentSql += ` GROUP BY a.agentname, a.agentmobile`;

//     const agents = await query(agentSql, [manager_id]);


//     const formattedAgents = agents.map(agent => {
//       const formattedAgent = { ...agent };

//       Object.keys(formattedAgent).forEach(key => {
//         if (typeof formattedAgent[key] === 'bigint') {
//           formattedAgent[key] = formattedAgent[key].toString();
//         }
//       });

//       return formattedAgent;
//     });


//     res.json({
//       agents: formattedAgents,
//     });

//   } catch (err) {
//     console.error("Error:", err);
//     return res.status(500).send("Internal Server Error");
//   }
// };

// module.exports = { AgentsController };

//      *******************************************************************************    Like JMPL

// const { query } = require("../config/db");

// const AgentsController = async (req, res) => {
//   try {
//     const { start_date, end_date } = req.query;
//     const { manager_id } = req.params;

//     let agentSql;
//     let queryParams = [];

//     if (manager_id == 2) {

//       agentSql = `
//         SELECT 
//           a.agentname,
//           a.agentmobile,
//           a.status,
//           a.department,
//           COUNT(c.agent) AS totalCalls,
//           SUM(CASE WHEN c.agent_disposition = 'ANSWERED' AND c.customer_disposition = 'ANSWERED' THEN 1 ELSE 0 END) AS totalConnected,
//           SUM(CASE WHEN c.agent_disposition = 'ANSWERED' AND c.customer_disposition = 'NO ANSWER' THEN 1 ELSE 0 END) AS totalNotConnected,
//           SUM(CASE WHEN c.calltype = 'Outbound' THEN 1 ELSE 0 END) AS totaloutbound,
//           SUM(CASE WHEN c.calltype = 'Incomming Call' THEN 1 ELSE 0 END) AS totalincomming,
//           SUM(CASE WHEN ((c.agent_disposition = 'ANSWERED' AND c.customer_disposition = 'NO ANSWER') 
//               OR 
//               (c.agent_disposition = 'NO ANSWER' AND c.customer_disposition IS NULL)) THEN 1 ELSE 0 END) AS totalMissedOutbound,
//           SUM(CASE WHEN c.calltype = 'Incomming Call' AND c.agent_disposition = 'NO ANSWER' THEN 1 ELSE 0 END) AS totalAbandoned
//         FROM rs_agentmobile a
//         LEFT JOIN customcdr c ON a.agentmobile = c.agent
//       `;
//     } else {

//       agentSql = `
//         SELECT 
//           a.agentname,
//           a.agentmobile,
//           a.status,
//           a.department,
//           COUNT(c.agent) AS totalCalls,
//           SUM(CASE WHEN c.agent_disposition = 'ANSWERED' AND c.customer_disposition = 'ANSWERED' THEN 1 ELSE 0 END) AS totalConnected,
//           SUM(CASE WHEN c.agent_disposition = 'ANSWERED' AND c.customer_disposition = 'NO ANSWER' THEN 1 ELSE 0 END) AS totalNotConnected,
//           SUM(CASE WHEN c.calltype = 'Outbound' THEN 1 ELSE 0 END) AS totaloutbound,
//           SUM(CASE WHEN c.calltype = 'Incomming Call' THEN 1 ELSE 0 END) AS totalincomming,
//           SUM(CASE WHEN ((c.agent_disposition = 'ANSWERED' AND c.customer_disposition = 'NO ANSWER') 
//               OR 
//               (c.agent_disposition = 'NO ANSWER' AND c.customer_disposition IS NULL)) THEN 1 ELSE 0 END) AS totalMissedOutbound,
//           SUM(CASE WHEN c.calltype = 'Incomming Call' AND c.agent_disposition = 'NO ANSWER' THEN 1 ELSE 0 END) AS totalAbandoned
//         FROM rs_agentmobile a
//         LEFT JOIN customcdr c ON a.agentmobile = c.agent
//         WHERE a.manager_id = ?
//       `;
//       queryParams.push(manager_id);
//     }


//     if (start_date && end_date) {
//       agentSql += ` AND c.call_datetime BETWEEN ? AND ?`;
//       queryParams.push(start_date, end_date);
//     }

//     agentSql += ` GROUP BY a.agentname, a.agentmobile`;

//     const agents = await query(agentSql, queryParams);


//     const formattedAgents = agents.map(agent => {
//       const formattedAgent = { ...agent };

//       Object.keys(formattedAgent).forEach(key => {
//         if (typeof formattedAgent[key] === 'bigint') {
//           formattedAgent[key] = formattedAgent[key].toString();
//         }
//       });

//       return formattedAgent;
//     });

//     res.json({ agents: formattedAgents });

//   } catch (err) {
//     console.error("Error:", err);
//     return res.status(500).send("Internal Server Error");
//   }
// };

// module.exports = { AgentsController };



//    ***********************************************************************************   New for hydacalltrace


// const { query } = require("../config/db");

// const AgentsController = async (req, res) => {
//   try {
//     const { start_date, end_date } = req.query;
//     const { manager_id } = req.params;

//     let agentSql;
//     let queryParams = [];

//     if (manager_id == 2) {

//       agentSql = `
//         SELECT 
//           a.agentname,
//           a.agentmobile,
//           a.status,
//           a.department
//         FROM rs_agentmobile a
//         LEFT JOIN customcdr c ON a.agentmobile = c.agent_no
//       `;
//     } else {

//       agentSql = `
//         SELECT 
//           a.agentname,
//           a.agentmobile,
//           a.status,
//           a.department
//         FROM rs_agentmobile a
//         LEFT JOIN customcdr c ON a.agentmobile = c.agent_no
//         WHERE a.manager_id = ?
//       `;
//       queryParams.push(manager_id);
//     }


//     if (start_date && end_date) {
//       agentSql += ` AND c.call_datetime BETWEEN ? AND ?`;
//       queryParams.push(start_date, end_date);
//     }

//     agentSql += ` GROUP BY a.agentname, a.agentmobile`;

//     const agents = await query(agentSql, queryParams);


//     const formattedAgents = agents.map(agent => {
//       const formattedAgent = { ...agent };

//       Object.keys(formattedAgent).forEach(key => {
//         if (typeof formattedAgent[key] === 'bigint') {
//           formattedAgent[key] = formattedAgent[key].toString();
//         }
//       });

//       return formattedAgent;
//     });

//     res.json({ agents: formattedAgents });

//   } catch (err) {
//     console.error("Error:", err);
//     return res.status(500).send("Internal Server Error");
//   }
// };

// module.exports = { AgentsController };



// *******************************************************************************
//                                 *************************************************************************



const { query } = require("../config/db");

const AgentsController = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    const { manager_id } = req.params;

    let agentSql = `
      SELECT 
        a.id,
        a.agentname,
        a.agentmobile,
        m.managername,
        a.status,
        a.department,
        a.imei_no,
        a.SIM_No,

       
        SUM(
          CASE 
            WHEN (c.Call_Type = 'OUTBOUND' AND RIGHT(c.Caller_Number, 10) = a.agentmobile) OR
                 (c.Call_Type = 'INBOUND' AND RIGHT(c.Destination_Number, 10) = a.agentmobile)
            THEN 1 ELSE 0 
          END
        ) AS totalCalls,

        SUM(CASE WHEN c.Call_Type = 'OUTBOUND' THEN 1 ELSE 0 END) AS totaloutbound,
        SUM(CASE WHEN c.Call_Type = 'INBOUND' THEN 1 ELSE 0 END) AS totalinbound,
        SUM(CASE WHEN c.Overall_Call_Status = 'Missed' THEN 1 ELSE 0 END) AS totalMissed,

        COUNT(DISTINCT 
          CASE 
            WHEN c.Call_Type = 'OUTBOUND' THEN c.Destination_Number
            WHEN c.Call_Type = 'INBOUND' THEN c.Caller_Number
          END
        ) AS totalUnique

      FROM agent a
      LEFT JOIN manager m ON a.manager_id = m.manager_id 
      LEFT JOIN callsrecord c 
        ON (
          (c.Call_Type = 'OUTBOUND' AND RIGHT (c.Caller_Number, 10) = RIGHT(a.agentmobile, 10)) OR 
          (c.Call_Type = 'INBOUND' AND RIGHT(c.Destination_Number, 10) = RIGHT(a.agentmobile, 10))
        )
    `;

    const conditions = [];
    const queryParams = [];

    if (manager_id != 1) {
      conditions.push(`a.manager_id = ?`);
      queryParams.push(manager_id);
    }

    if (start_date && end_date) {
      conditions.push(`c.timestamp BETWEEN ? AND ?`);
      queryParams.push(start_date, end_date);
    }

    if (conditions.length > 0) {
      agentSql += ` WHERE ` + conditions.join(" AND ");
    }

    agentSql += ` GROUP BY a.agentname, a.agentmobile`;

    const agents = await query(agentSql, queryParams);

    const formattedAgents = agents.map(agent => {
      const formattedAgent = { ...agent };
      Object.keys(formattedAgent).forEach(key => {
        if (typeof formattedAgent[key] === 'bigint') {
          formattedAgent[key] = formattedAgent[key].toString();
        }
      });
      return formattedAgent;
    });

    res.json({ agents: formattedAgents });

  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = AgentsController;



//   **********************************************************************      Agent get for Update agent *********************


const getAgentById = async (req, res) => {
  try {
    const { id } = req.params;

    const sql = `
      SELECT a.*, m.managername
      FROM agent a
      LEFT JOIN manager m ON a.manager_id = m.manager_id
      WHERE a.id = ?
    `;

    const result = await query(sql, [id]);

    if (result.length === 0) {
      return res.status(404).json({ message: "Agent not found", agents: [] });
    }

    res.status(200).json({ agents: result });
  } catch (error) {
    console.error("Error fetching agent by ID:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { AgentsController, getAgentById };
