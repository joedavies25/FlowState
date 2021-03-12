import { Request, Response } from 'express';
import IStation from '../interfaces/station.interface';
import Station from '../model/stationSchema';

const getStations = async (_: Request, res: Response): Promise<void> => {
  try {
    const result: IStation[] = await Station.find();
    res.status(200);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
};

const postStation = async (req: Request, res: Response): Promise<void> => {
  try {
    await Station.create(req.body);
    res.status(201);
    res.send('Created ' + req.body.stationID);
  } catch (err) {
    handleError(err, res);
  }
};

const handleError = (err: string, res: Response): void => {
  console.log(err);
  res.status(500);
  res.send(err);
};

export default {
  getStations,
  postStation,
};
