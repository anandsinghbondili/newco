import { pool } from "../lib/mysql";
import { Request, Response } from "express";

export const getDivisions = async (_req: Request, res: Response) => {
    console.log("getDivisions");
    const [rows] = await pool.query(
        "SELECT * FROM divisions"
    );
    res.json(rows);
};

// export const createDivision = async (req: Request, res: Response) => {
//     const { name, division_code } = req.body;
//     const [result]: any = await pool.query(
//         "INSERT INTO divisions (name, division_code) VALUES (?, ?)",
//         [name, division_code]
//     );
//     // result.insertId contains the generated PK
//     const [row] = await pool.query("SELECT * FROM divisions WHERE id = ?", [
//         result.insertId,
//     ]);
//     res.status(201).json(row[0]);
// };


export const createDivision = async (req: Request, res: Response) => {
    try {
        const { name, division_code, division_type, ledger, active_flag } = req.body;

        if (!name || !division_code) {
            return res.status(400).json({ message: "Name and division code are required" });
        }

        const [result] = await pool.query(
            "INSERT INTO divisions (name, division_code, division_type, ledger, active_flag) VALUES (?, ?, ?, ?, ?)",
            [name, division_code, division_type || null, ledger || null, active_flag || true]
        );

        // Type assertion for the result
        const insertResult = result as { insertId: number };
        
        const [rows] = await pool.query(
            "SELECT * FROM divisions WHERE id = ?", 
            [insertResult.insertId]
        );

        if (rows.length === 0) {
            return res.status(500).json({ message: "Failed to retrieve created division" });
        }

        res.status(201).json(rows[0]);
    } catch (error) {
        console.error("Error creating division:", error);
        res.status(500).json({ message: "Failed to create division" });
    }
};