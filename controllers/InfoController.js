const { Info } = require("../models");

const getInfoProduct = async (req, res, next) => {
    try {
        const productInfo = await Info.findOne({
            where: {
                productID: req.params.id,
            },
        });
        res.status(200).json(productInfo);
    } catch (error) {
        res.status(400).json(error);
    }
};

const updateInfoProduct = async (req, res, next) => {
    try {
        const update = await Info.update(
            {
                Capacity: req.body.Capacity,
                Technology: req.body.Technology,
                phaseNumber: req.body.phaseNumber,
                isolationTransformer: req.body.isolationTransformer,
                ACInputVoltage: req.body.ACInputVoltage,
                VoltageRange: req.body.VoltageRange,
                FrequencyRange: req.body.FrequencyRange,
                powerFactorIN: req.body.powerFactorIN,
                OutputACVoltage: req.body.OutputACVoltage,
                ACVoltageRegulator: req.body.ACVoltageRegulator,
                SynFrequencyRange: req.body.SynFrequencyRange,
                BatteryFrequencyRange: req.body.BatteryFrequencyRange,
                timeACtobattery: req.body.timeACtobattery,
                timeInterverBypass: req.body.timeInterverBypass,
                wave: req.body.wave,
                powerFactorOUT: req.body.powerFactorOUT,
                battery: req.body.battery,
                numberOfBattery: req.body.numberOfBattery,
                ChargingCurrent: req.body.ChargingCurrent,
                ChargingVoltage: req.body.ChargingVoltage,
                ACMode: req.body.ACMode,
                batteryModeEfficiency: req.body.batteryModeEfficiency,
                LCDScreen: req.body.LCDScreen,
                batteryWaring: req.body.batteryWaring,
                lowBattery: req.body.lowBattery,
                overLoad: req.body.overLoad,
                error: req.body.error,
                ProductDimensions: req.body.ProductDimensions,
                mass: req.body.mass,
                NoiseLevel: req.body.NoiseLevel,
                ActiveHumidity: req.body.ActiveHumidity,
                USB: req.body.USB,
            },
            {
                where: {
                    productID: req.params.id,
                },
            }
        );

        if (!update[0]) {
            return next({
                message: `update product Info failed for productId - ${req.params.id}`,
            });
        }

        return res.status(200).send({
            success: true,
        });
    } catch (error) {
        res.json(error);
        return next(error);
    }
};

module.exports = {
    getInfoProduct,
    updateInfoProduct,
};
