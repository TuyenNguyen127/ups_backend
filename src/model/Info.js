const mongoose = require('mongoose')
const { Schema } = mongoose

const InfoSchema = new Schema({
    productID: {
        type:mongoose.Types.ObjectId, 
        ref:'Product',
    },
    Capacity: {
        type: String,
    },
    Technology: {
        type: String,
    },
    phaseNumber: {
        type: String,
    },
    isolationTransformer: {
        type: String,
    },

    ACInputVoltage: {
        type: String,
    },
    VoltageRange: {
        type: String,
    },
    FrequencyRange: {
        type: String,
    },
    powerFactorIN: {
        type: String,
    },

    OutputACVoltage: {
        type: String,
    },
    ACVoltageRegulator: {
        type: String,
    },
    SynFrequencyRange: {
        type: String,
    },
    BatteryFrequencyRange: {
        type: String,
    },
    timeACtobattery: {
        type: String,
    },
    timeInterverBypass: {
        type: String,
    },
    wave: {
        type: String,
    },
    powerFactorOUT: {
        type: String,
    },

    battery: {
        type: String,
    },
    numberOfBattery: {
        type: String,
    },
    ChargingCurrent: {
        type: String,
    },
    ChargingVoltage: {
        type: String,
    },

    ACMode: {
        type: String,
    },
    batteryModeEfficiency: {
        type: String,
    },

    LCDScreen: {
        type: String,
    },
    batteryWaring: {
        type: String,
    },
    lowBattery: {
        type: String,
    },
    overLoad: {
        type: String,
    },
    error: {
        type: String,
    },

    ProductDimensions: {
        type: String,
    },
    mass: {
        type: String,
    },

    NoiseLevel: {
        type: String,
    },
    ActiveHumidity: {
        type: String,
    },

    USB: {
        type: String,
    },
})

module.exports = mongoose.model('Info', InfoSchema)
