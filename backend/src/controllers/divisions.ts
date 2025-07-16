import { OkPacket, RowDataPacket } from "mysql2";
import { pool } from "../lib/mysql";
import { Request, Response } from "express";

interface Division extends RowDataPacket {
    id: number;
    name: string;
    division_code: string;
    division_type: string;
    active_flag: boolean;
    start_date: Date | null;
    end_date: Date | null;
    operating_unit: string | null;
    legal_entity: string | null;
    ledger: string | null;
    credit_account: string | null;
    debit_account: string | null;
    parent_division_id: number | null;
    accounted_currency: string | null;
    created_at: Date;
    updated_at: Date;
}

export const getDivisions = async (_req: Request, res: Response) => {
    try {
        const [rows] = await pool.query<Division[]>("SELECT * FROM newco_divisions");
        res.json(rows);
    } catch (error) {
        console.error("Error fetching divisions:", error);
        res.status(500).json({ message: "Failed to fetch divisions" });
    }
};

export const createDivision = async (req: Request, res: Response) => {

    console.log(req.body);

    const { name, division_code, created_at, updated_at, active_flag, division_type, operating_unit, legal_entity, ledger, credit_account, debit_account } = req.body;

    // Input validation
    if (!name || !division_code) {
        return res.status(400).json({
            message: "Name and division code are required"
        });
    }

    try {
        // Insert the new division
        const [result] = await pool.query<OkPacket>(
            `INSERT INTO newco_divisions 
            (name, 
            division_code, 
            created_at,
             updated_at,
             active_flag,
             division_type,
             operating_unit,
             legal_entity,
             ledger,
             credit_account,
             debit_account
             ) 
             VALUES (
                ?,
                ?,
                NOW(),
                NOW(),
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?
             )`,
            [
                name,
                division_code,
                created_at,
                updated_at,
                active_flag,
                division_type,
                operating_unit,
                legal_entity,
                ledger,
                credit_account,
                debit_account
            ]
        );

        // Get the newly created division
        const [rows] = await pool.query<Division[]>(
            "SELECT * FROM newco_divisions WHERE id = ?",
            [result.insertId]
        );

        if (!rows || rows.length === 0) {
            return res.status(404).json({
                message: "Division not found after creation"
            });
        }

        res.status(201).json(rows[0]);
    } catch (error) {
        console.error("Error creating division:", error);
        res.status(500).json({
            message: "Failed to create division",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
};