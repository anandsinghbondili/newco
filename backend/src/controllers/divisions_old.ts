import { Request, Response } from "express";

// Dummy data for now
let divisions = [
    { id: 1, name: "Chewy", division_code: "100" },
    { id: 2, name: "Flipkart", division_code: "200" }
];

export const getDivisions = (req: Request, res: Response) => {
    res.json(divisions);
};

export const getDivisionById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const division = divisions.find((d) => d.id === id);
    if (!division) return res.status(404).send("Not found");
    res.json(division);
};

export const createDivision = (req: Request, res: Response) => {
    const newDivision = { ...req.body, id: Date.now() };
    divisions.push(newDivision);
    res.status(201).json(newDivision);
};

export const updateDivision = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = divisions.findIndex((d) => d.id === id);
    if (index === -1) return res.status(404).send("Not found");

    divisions[index] = { ...divisions[index], ...req.body };
    res.json(divisions[index]);
};

export const deleteDivision = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    divisions = divisions.filter((d) => d.id !== id);
    res.status(204).send();
};
