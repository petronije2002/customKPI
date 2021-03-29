import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser;
export declare class CircleSettings {
    fontColour: string;
    fontSize: number;
    fontFamily: string;
}
export declare class CustomTitle {
    customText: string;
    fontColor: string;
    fontSize: number;
}
export declare class PrevYearSetting {
    fontColour: string;
    fontSize: number;
    fontFamily: string;
    displayUnits: number;
    cornerRadius: number;
    backgroundColour: string;
    decimalPlacesPreviousYear: number;
}
export declare class ThisYearSetting {
    fontColour: string;
    fontSize: number;
    fontFamily: string;
    displayUnits: number;
    cornerRadius: number;
    backgroundColour: string;
    decimalPlacesThisYear: number;
}
export declare class TargetSetting {
    fontColour: string;
    fontSize: number;
    fontFamily: string;
    displayUnits: number;
    cornerRadius: number;
    backgroundColour: string;
    customText: string;
    fontSizeForTitle: number;
    fontColourTitle: string;
    reverseTarget: boolean;
    decimalPlacesTarget: number;
}
export declare class CircleSettings2 {
    circleColor2: string;
    circleThickness2: number;
    displayUnits: number;
}
export declare class VisualSettings extends DataViewObjectsParser {
    prevYear: PrevYearSetting;
    thisYear: ThisYearSetting;
    target: TargetSetting;
}
