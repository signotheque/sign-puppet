import { CustomizeInput } from "../src/components/customizeTab";

export type CustomizeInputMap = { [key: string]: CustomizeInput };

export let CustomPoseUtils = {

    buildHandCustomPositions: function (pSide: string): CustomizeInputMap {

        let lResult: CustomizeInputMap = {};

        const lTranslations = ["h", "b", "a"];
        const lTranslationParams = ["x", "y", "z", ""];

        lTranslations.map(item => lTranslationParams.map(param => {
            const lKey = pSide + item + param;
            lResult[lKey] = new CustomizeInput(lKey, 0);
        }
        ));

        lResult[pSide + "bz"].value = 1;
        lResult[pSide + "b"].value = 1;

        const lRotations = ["p", "r"];
        const lRotationParams = ["x", "y", "z"];

        lRotations.map(item => lRotationParams.map(param => {
            const lKey = pSide + item + param;
            lResult[lKey] = new CustomizeInput(lKey, 0);
        }
        ));

        lResult[pSide + "rz"].value = -90;
        lResult[pSide + "rx"].value = 90;

        return lResult;
    },

    buildHandCustomFingers: function (pSide: string): CustomizeInputMap {

        let lResult: CustomizeInputMap = {};

        const lAllDigitsButThumb = ["i", "m", "r", "p"];
        const lAllDigitsButThumbParams = ["0", "1", "2", "s"];

        lAllDigitsButThumb.map(item => lAllDigitsButThumbParams.map(param => {
            const lKey = pSide + item + param;
            lResult[lKey] = new CustomizeInput(lKey, 0);
        }
        ));


        const lThumb = ["t"];
        const lThumbParams = ["0x", "0y", "1x", "1y", "2x"];

        lThumb.map(item => lThumbParams.map(param => {
            const lKey = pSide + item + param;
            lResult[lKey] = new CustomizeInput(lKey, 0);
        }
        ));

        lResult[pSide + "t0x"].value = -1;
        lResult[pSide + "t1x"].value = -1;

        return lResult;
    },

    buildHeadAndBodyCustom: function CustomizeInputMap() {

        let lResult: CustomizeInputMap = {};

        const lEntries = ["hrx", "hry", "bx", "by",
            "eby", "ebx", "e0y", "e1y",
            "ex", "ey", "ez",
            "ny",
            "mx", "my",
            "mly", "mlz", "mty", "mtz", "mcx",
            "teeth"];

        lEntries.map(item => lResult[item] = new CustomizeInput(item, 0));

        lResult["e0y"].value = 1;
        lResult["e1y"].value = 1;

        lResult["ez"].value = 1;

        return lResult;


    }
}