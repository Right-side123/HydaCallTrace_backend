const { query } = require('../config/db');




/********************************************************************************/

/*                                                                *****************************/

/*********************        CDR          ********************************** */

// async function getCustomcdrLength(req, res) {
//     const { manager_id } = req.params;

//     try {
//         let querySql;
//         let queryParams = [];

//         if (manager_id == 2) {

//             querySql = `
//                 SELECT COUNT(*) AS total_count
//                 FROM customcdr c
//                 JOIN rs_agentmobile a ON c.agent = a.agentmobile
//             `;
//         } else {

//             querySql = `
//                 SELECT COUNT(*) AS total_count
//                 FROM customcdr c
//                 JOIN rs_agentmobile a ON c.agent = a.agentmobile
//                 WHERE a.manager_id = ?
//             `;
//             queryParams.push(manager_id);
//         }

//         const results = await query(querySql, queryParams);

//         const formattedResults = results.map(item => {
//             for (let key in item) {
//                 if (typeof item[key] === "bigint") {
//                     item[key] = item[key].toString();
//                 }
//             }
//             return item;
//         });

//         res.json({ total_cdr_count: formattedResults[0].total_count });

//     } catch (err) {
//         console.error("Database query error:", err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }

// /**************************************               INBOUND           **************************/

// async function getInboundLength(req, res) {
//     const { manager_id } = req.params;

//     try {
//         let querySql;
//         let queryParams = [];

//         if (manager_id == 2) {

//             querySql = `
//                 SELECT COUNT(*) AS total_count
//                 FROM customcdr c
//                 JOIN rs_agentmobile a ON c.agent = a.agentmobile  
//                 WHERE c.calltype = 'Incomming Call';
//             `;
//         } else {

//             querySql = `
//                 SELECT COUNT(*) AS total_count
//                 FROM customcdr c
//                 JOIN rs_agentmobile a ON c.agent = a.agentmobile  
//                 WHERE a.manager_id = ? 
//                 AND c.calltype = 'Incomming Call';
//             `;
//             queryParams.push(manager_id);
//         }

//         const results = await query(querySql, queryParams);

//         const formattedResults = results.map(item => {
//             for (let key in item) {
//                 if (typeof item[key] === "bigint") {
//                     item[key] = item[key].toString();
//                 }
//             }
//             return item;
//         });

//         res.json({ total_cdr_count: formattedResults[0].total_count });

//     } catch (err) {
//         console.error("Database query error:", err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }

// /******************************************       OUTBOUND      ******************************/

// async function getOutboundLength(req, res) {
//     const { manager_id } = req.params;
//     try {
//         let querySql;
//         let queryParams = [];

//         if (manager_id == 2) {
//             querySql = `
//             SELECT COUNT(*) AS total_count
//             FROM customcdr c
//             JOIN rs_agentmobile a ON c.agent = a.agentmobile  
//             WHERE c.calltype = 'Outbound';
//         `;
//         } else {

//             querySql = `
//             SELECT COUNT(*) AS total_count
//             FROM customcdr c
//             JOIN rs_agentmobile a ON c.agent = a.agentmobile  
//             WHERE a.manager_id = ? 
//                 AND c.calltype = 'Outbound';
//             `;
//             queryParams.push(manager_id);

//         }

//         const results = await query(querySql, queryParams);

//         const formattedResults = results.map(item => {
//             for (let key in item) {
//                 if (typeof item[key] === "bigint") {
//                     item[key] = item[key].toString();
//                 }
//             }
//             return item;
//         });

//         res.json({ total_cdr_count: formattedResults[0].total_count });

//     } catch (err) {
//         console.error("Database query error:", err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }



// /***********************************             Connected               ****************************/

// async function getconnectedLength(req, res) {
//     const { manager_id } = req.params;

//     try {

//         let querySql;
//         let queryParams = [];

//         if (manager_id == 2) {
//             querySql = `

//             SELECT COUNT(*) AS total_count
//             FROM customcdr c 
//             JOIN rs_agentmobile a ON c.agent = a.agentmobile         
//             WHERE c.agent_disposition = 'ANSWERED'
//             AND c.customer_disposition = 'ANSWERED';  
//             `;

//         } else {
//             querySql = `
//             SELECT COUNT(*) AS total_count
//             FROM customcdr c 
//             JOIN rs_agentmobile a ON c.agent = a.agentmobile         
//             WHERE a.manager_id = ?
//             AND c.agent_disposition = 'ANSWERED'
//             AND c.customer_disposition = 'ANSWERED';
//             `;
//             queryParams.push(manager_id);
//         }

//         const results = await query(querySql, queryParams);

//         const formattedResults = results.map(item => {
//             for (let key in item) {
//                 if (typeof item[key] === "bigint") {
//                     item[key] = item[key].toString();
//                 }
//             }
//             return item;
//         });

//         res.json({ total_cdr_count: formattedResults[0].total_count });

//     } catch (err) {
//         console.error("Database query error:", err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }

// /*****************************************      Not Connected     ************************/

// async function getnotconnectedLength(req, res) {
//     const { manager_id } = req.params;
//     try {

//         let querySql;
//         let queryParams = [];

//         if (manager_id == 2) {
//             querySql = `
//             SELECT COUNT(*) AS total_count
//             FROM customcdr c
//             JOIN rs_agentmobile a ON c.agent = a.agentmobile           
//             WHERE c.agent_disposition = 'ANSWERED'
//             AND c.customer_disposition = 'NO ANSWER';
//             `;
//         } else {
//             querySql = `
//             SELECT COUNT(*) AS total_count
//             FROM customcdr c
//             JOIN rs_agentmobile a ON c.agent = a.agentmobile           
//             WHERE a.manager_id = ?
//             AND c.agent_disposition = 'ANSWERED'
//             AND c.customer_disposition = 'NO ANSWER';
//             `;

//             queryParams.push(manager_id);
//         }
//         const results = await query(querySql, queryParams);

//         const formattedResults = results.map(item => {
//             for (let key in item) {
//                 if (typeof item[key] === "bigint") {
//                     item[key] = item[key].toString();
//                 }
//             }
//             return item;
//         });

//         res.json({ total_cdr_count: formattedResults[0].total_count });

//     } catch (err) {
//         console.error("Database query error:", err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }


// /************************************************  Missed outbound   ******************/


// async function getMissedoutboundLength(req, res) {
//     const { manager_id } = req.params;

//     try {

//         let querySql;
//         let queryParams = [];

//         if (manager_id == 2) {
//             querySql = `
//             SELECT COUNT(*) AS total_count
//             FROM customcdr c
//             JOIN rs_agentmobile a ON c.agent = a.agentmobile  
//             WHERE c.calltype = 'Outbound'
//              AND (
//                  (c.agent_disposition = 'ANSWERED' AND c.customer_disposition = 'NO ANSWER')
//                  OR 
//                  (c.agent_disposition = 'NO ANSWER' AND c.customer_disposition IS NULL)
//                  );
//             `;
//         } else {
//             querySql = `
//             SELECT COUNT(*) AS total_count
//             FROM customcdr c
//             JOIN rs_agentmobile a ON c.agent = a.agentmobile  
//             WHERE a.manager_id = ?
//             AND c.calltype = 'Outbound'
//              AND (
//                  (c.agent_disposition = 'ANSWERED' AND c.customer_disposition = 'NO ANSWER')
//                  OR 
//                  (c.agent_disposition = 'NO ANSWER' AND c.customer_disposition IS NULL)
//                  );
//             `;
//             queryParams.push(manager_id);
//         }
//         const results = await query(querySql, queryParams);

//         const formattedResults = results.map(item => {
//             for (let key in item) {
//                 if (typeof item[key] === "bigint") {
//                     item[key] = item[key].toString();
//                 }
//             }
//             return item;
//         });

//         res.json({ total_cdr_count: formattedResults[0].total_count });

//     } catch (err) {
//         console.error("Database query error:", err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }



// /****************************************   Missed    *******************************/


// async function getMissedLength(req, res) {
//     const { manager_id } = req.params;

//     try {

//         let querySql;
//         let queryParams = [];

//         if (manager_id == 2) {
//             querySql = `
//             SELECT COUNT(*) AS total_count
//             FROM customcdr c
//             JOIN rs_agentmobile a ON c.agent = a.agentmobile  
//             WHERE c.calltype = 'Incomming Call'
//               AND c.agent_disposition = 'NO ANSWER';
//               `;
//         } else {
//             querySql = `
//             SELECT COUNT(*) AS total_count
//             FROM customcdr c
//             JOIN rs_agentmobile a ON c.agent = a.agentmobile  
//             WHERE a.manager_id = ?
//             AND c.calltype = 'Incomming Call'
//               AND c.agent_disposition = 'NO ANSWER';
//               `;

//             queryParams.push(manager_id);
//         }
//         const results = await query(querySql, queryParams);

//         const formattedResults = results.map(item => {
//             for (let key in item) {
//                 if (typeof item[key] === "bigint") {
//                     item[key] = item[key].toString();
//                 }
//             }
//             return item;
//         });

//         res.json({ total_cdr_count: formattedResults[0].total_count });

//     } catch (err) {
//         console.error("Database query error:", err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }





// ***********************************************     for hydacalltrace     



async function getCustomcdrLength(req, res) {
    const { manager_id } = req.params;

    try {
        let querySql;
        let queryParams = [];

        if (manager_id == 1) {

            querySql = `
                SELECT COUNT(*) AS total_count
                FROM callsrecord c
                JOIN agent a ON (
                (c.Call_Type = 'OUTBOUND' AND RIGHT(c.Caller_Number, 10) = a.agentmobile)
                OR
                (c.Call_Type = 'INBOUND' AND RIGHT(c.Destination_Number, 10) = a.agentmobile)
            )
            `;
        } else {

            querySql = `
                SELECT COUNT(*) AS total_count
                FROM callsrecord c
                JOIN agent a ON (
                (c.Call_Type = 'OUTBOUND' AND RIGHT(c.Caller_Number, 10) = a.agentmobile)
                OR
                (c.Call_Type = 'INBOUND' AND RIGHT(c.Destination_Number, 10) = a.agentmobile)
            )
                WHERE a.manager_id = ?
            `;
            queryParams.push(manager_id);
        }

        const results = await query(querySql, queryParams);

        const formattedResults = results.map(item => {
            for (let key in item) {
                if (typeof item[key] === "bigint") {
                    item[key] = item[key].toString();
                }
            }
            return item;
        });

        res.json({ total_cdr_count: formattedResults[0].total_count });

    } catch (err) {
        console.error("Database query error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

/**************************************               INBOUND           **************************/

async function getInboundLength(req, res) {
    const { manager_id } = req.params;

    try {
        let querySql;
        let queryParams = [];

        if (manager_id == 1) {

            querySql = `
                SELECT COUNT(*) AS total_count
                FROM callsrecord c
                JOIN agent a ON RIGHT(c.Destination_Number, 10) = a.agentmobile  
                WHERE c.Call_Type = 'INBOUND';
            `;
        } else {

            querySql = `
                SELECT COUNT(*) AS total_count
                FROM callsrecord c
                JOIN agent a ON RIGHT(c.Destination_Number, 10) = a.agentmobile  
                WHERE a.manager_id = ? 
                AND c.Call_Type = 'INBOUND';
            `;
            queryParams.push(manager_id);
        }

        const results = await query(querySql, queryParams);

        const formattedResults = results.map(item => {
            for (let key in item) {
                if (typeof item[key] === "bigint") {
                    item[key] = item[key].toString();
                }
            }
            return item;
        });

        res.json({ total_cdr_count: formattedResults[0].total_count });

    } catch (err) {
        console.error("Database query error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

/******************************************       OUTBOUND      ******************************/

async function getOutboundLength(req, res) {
    const { manager_id } = req.params;
    try {
        let querySql;
        let queryParams = [];

        if (manager_id == 1) {
            querySql = `
            SELECT COUNT(*) AS total_count
            FROM callsrecord c
            JOIN agent a ON RIGHT(c.Caller_Number, 10) = a.agentmobile  
            WHERE c.Call_Type = 'OUTBOUND';
        `;
        } else {

            querySql = `
            SELECT COUNT(*) AS total_count
            FROM callsrecord c
            JOIN agent a ON RIGHT(c.Caller_Number, 10) = a.agentmobile  
            WHERE a.manager_id = ? 
                AND c.Call_Type = 'OUTBOUND';
            `;
            queryParams.push(manager_id);

        }

        const results = await query(querySql, queryParams);

        const formattedResults = results.map(item => {
            for (let key in item) {
                if (typeof item[key] === "bigint") {
                    item[key] = item[key].toString();
                }
            }
            return item;
        });

        res.json({ total_cdr_count: formattedResults[0].total_count });

    } catch (err) {
        console.error("Database query error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


async function getMissedLength(req, res) {
    const { manager_id } = req.params;

    try {

        let querySql;
        let queryParams = [];

        if (manager_id == 1) {
            querySql = `
            SELECT COUNT(*) AS total_count
            FROM callsrecord c
            JOIN agent a ON (
                (c.Call_Type = 'OUTBOUND' AND RIGHT(c.Caller_Number, 10) = a.agentmobile)
                OR
                (c.Call_Type = 'INBOUND' AND RIGHT(c.Destination_Number, 10) = a.agentmobile)
              )  
            WHERE c.Overall_Call_Status = 'Missed';
              `;
        } else {
            querySql = `
            SELECT COUNT(*) AS total_count
            FROM callsrecord c
            JOIN agent a ON (
                (c.Call_Type = 'OUTBOUND' AND RIGHT(c.Caller_Number, 10) = a.agentmobile)
                OR
                (c.Call_Type = 'INBOUND' AND RIGHT(c.Destination_number, 10) = a.agentmobile)
              )  
            WHERE a.manager_id = ?
            AND c.Overall_Call_Status = 'Missed';
              `;

            queryParams.push(manager_id);
        }
        const results = await query(querySql, queryParams);

        const formattedResults = results.map(item => {
            for (let key in item) {
                if (typeof item[key] === "bigint") {
                    item[key] = item[key].toString();
                }
            }
            return item;
        });

        res.json({ total_cdr_count: formattedResults[0].total_count });

    } catch (err) {
        console.error("Database query error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}



const getUniqueCalls = async (req, res) => {
    const { manager_id } = req.params;

    let queryParams = [];
    let whereClauses = [];

    if (manager_id != 1) {
        whereClauses.push("a.manager_id = ?");
        queryParams.push(manager_id);
    }

    const querySql = `
        SELECT COUNT(*) AS total_unique_customer_calls
        FROM (
            SELECT 
                ROW_NUMBER() OVER (
                    PARTITION BY 
                        CASE
                            WHEN c.Call_Type = 'OUTBOUND' THEN c.Destination_Number
                            WHEN c.Call_Type = 'INBOUND' THEN c.Caller_Number
                        END
                    ORDER BY c.timestamp DESC
                ) AS rn
            FROM callsrecord c
            JOIN agent a ON (
                (c.Call_Type = 'OUTBOUND' AND RIGHT(c.Caller_Number, 10) = a.agentmobile)
                OR
                (c.Call_Type = 'INBOUND' AND RIGHT(c.Destination_Number, 10) = a.agentmobile)
            )
            ${whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : ""}
        ) AS sub
        WHERE sub.rn = 1
    `;

    try {
        // console.log('Query:', querySql);
        // console.log('Params:', queryParams);

        const result = await query(querySql, queryParams);
        const count = result[0].total_unique_customer_calls;

        res.json({ manager_id, total_unique_customer_calls: count.toString() });
    } catch (err) {
        console.error("Error counting CDR data:", err);
        res.status(500).json({ error: "Failed to count unique customer calls" });
    }
};

module.exports = {
    getCustomcdrLength,
    getInboundLength,
    getOutboundLength,
    // getconnectedLength,
    // getnotconnectedLength,
    // getMissedoutboundLength,
    getMissedLength,
    getUniqueCalls
};
