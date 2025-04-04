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


const { query } = require("../config/db");

const AgentsController = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    const { manager_id } = req.params;

    let agentSql;
    let queryParams = [];

    if (manager_id == 2) {

      agentSql = `
        SELECT 
          a.agentname,
          a.agentmobile,
          a.status,
          a.department
        FROM rs_agentmobile a
        LEFT JOIN customcdr c ON a.agentmobile = c.agent_no
      `;
    } else {

      agentSql = `
        SELECT 
          a.agentname,
          a.agentmobile,
          a.status,
          a.department
        FROM rs_agentmobile a
        LEFT JOIN customcdr c ON a.agentmobile = c.agent_no
        WHERE a.manager_id = ?
      `;
      queryParams.push(manager_id);
    }


    if (start_date && end_date) {
      agentSql += ` AND c.call_datetime BETWEEN ? AND ?`;
      queryParams.push(start_date, end_date);
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

module.exports = { AgentsController };
