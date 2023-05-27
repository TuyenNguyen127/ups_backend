module.exports = (sequelize, DataTypes) =>
    sequelize.define(
        "Info",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                field: "info_ID",
            },
            productID: {
                type: DataTypes.INTEGER,
                // allowNull: false,
                field: "product_id",
            },
            Capacity: {
                type: DataTypes.STRING,
            },
            Technology: {
                type: DataTypes.STRING,
            },
            phaseNumber: {
                type: DataTypes.STRING,
            },
            isolationTransformer: {
                type: DataTypes.STRING,
            },

            ACInputVoltage: {
                type: DataTypes.STRING,
            },
            VoltageRange: {
              type: DataTypes.STRING,
            },
            FrequencyRange: {
                type: DataTypes.STRING,
            },
            powerFactorIN: {
                type: DataTypes.STRING,
            },

            OutputACVoltage: {
                type: DataTypes.STRING,
            },
            ACVoltageRegulator: {
                type: DataTypes.STRING,
            },
            SynFrequencyRange: {
                type: DataTypes.STRING,
            },
            BatteryFrequencyRange: {
                type: DataTypes.STRING,
            },
            timeACtobattery: {
                type: DataTypes.STRING,
            },
            timeInterverBypass: {
                type: DataTypes.STRING,
            },
            wave: {
                type: DataTypes.STRING,
            },
            powerFactorOUT: {
                type: DataTypes.STRING,
            },

            battery: {
                type: DataTypes.STRING,
            },
            numberOfBattery: {
                type: DataTypes.STRING,
            },
            ChargingCurrent: {
                type: DataTypes.STRING,
            },
            ChargingVoltage: {
                type: DataTypes.STRING,
            },

            ACMode: {
              type: DataTypes.STRING,
            },
            batteryModeEfficiency: {
                type: DataTypes.STRING,
            },

            LCDScreen: {
                type: DataTypes.STRING,
            },
            batteryWaring: {
                type: DataTypes.STRING,
            },
            lowBattery: {
                type: DataTypes.STRING,
            },
            overLoad: {
                type: DataTypes.STRING,
            },
            error: {
                type: DataTypes.STRING,
            },

            ProductDimensions: {
                type: DataTypes.STRING,
            },
            mass: {
                type: DataTypes.STRING,
            },

            NoiseLevel: {
                type: DataTypes.STRING,
            },
            ActiveHumidity: {
                type: DataTypes.STRING,
            },

            USB: {
                type: DataTypes.STRING,
            },
        },
        {
            tableName: "Info",
        }
    );
