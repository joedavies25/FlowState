import { Request, Response } from 'express';
import IMeasure from '../interfaces/measure.interfaces';
import measureSchema from '../model/measureSchema';
import Measure from '../model/measureSchema';

const getMeasures = async (_: Request, res: Response): Promise<void> => {
  try {
    const result: IMeasure[] = await Measure.find();
    res.status(200);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
};

const saveMeasure = async (req: Request, res: Response): Promise<void> => {
  try {
    const { stationID, qualifier, unitName } = req.body;
    const measure: IMeasure[] = await Measure.find({ stationID });
    if (measure.length === 0) {
      await Measure.create({ stationID, qualifier, unitName });
    }
    res.status(201);
    res.send('Created ' + stationID);
  } catch (err) {
    handleError(err, res);
  }
};

const removeMeasure = async (req: Request, res: Response): Promise<void> => {
  try {
    await Measure.findOneAndDelete({ stationID: req.body.stationID });
    res.status(201);
    res.send('Deleted');
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
  getMeasures,
  saveMeasure,
  removeMeasure,
};
