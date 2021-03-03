/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

"use strict";

import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser;
import { valueFormatter } from "powerbi-visuals-utils-formattingutils";


export class CircleSettings {
  public fontColour: string = "black";
  public fontSize: number = 24;
  public fontFamily: string = "Arial"


  
  // public AcknBackgroundColor: string = "red";
  // public CriticalBackgroundColor: string = "orange";

  // public CornerRadius: number = 10;

  // public FontValueSize: number = 16;
  // public FontValueColor: string = "black";
  // public fontFamily: string = "\"Segoe UI\", wf_segoe-ui_normal, helvetica, arial, sans-serif"
  // public CompanyFontSize: number = 20;
} 

export class CustomTitle{

  public customText = ""
  public fontColor = "white"
  public fontSize = 16
}

export class PrevYearSetting {
  public fontColour: string = "white";
  public fontSize: number = 18;
  public fontFamily: string = "Silka";
  public displayUnits: number = 1000000 ;
  public cornerRadius: number = 5;
  public backgroundColour: string = 'blue'

  // public AcknBackgroundColor: string = "red";
  // public CriticalBackgroundColor: string = "orange";

  // public CornerRadius: number = 10;

  // public FontValueSize: number = 16;
  // public FontValueColor: string = "black";
  // public fontFamily: string = "\"Segoe UI\", wf_segoe-ui_normal, helvetica, arial, sans-serif"
  // public CompanyFontSize: number = 20;
} 

export class ThisYearSetting {
  public fontColour: string = "white";
  public fontSize: number = 18;
  public fontFamily: string = "Silka";
  public displayUnits: number = 1000000 ;
  public cornerRadius: number = 5;
  public backgroundColour: string = '#F76969'
  // public AcknBackgroundColor: string = "red";
  // public CriticalBackgroundColor: string = "orange";

  // public CornerRadius: number = 10;

  // public FontValueSize: number = 16;
  // public FontValueColor: string = "black";
  // public fontFamily: string = "\"Segoe UI\", wf_segoe-ui_normal, helvetica, arial, sans-serif"
  // public CompanyFontSize: number = 20;
} 

export class TargetSetting {
  public fontColour: string = "white";
  public fontSize: number = 18;
  public fontFamily: string = "Silka"
  public displayUnits: number = 1000000 ;
  public cornerRadius: number = 5;
  public backgroundColour: string = 'grey'
  public customText: string = ''
  public fontSizeForTitle: number = 18;
  public fontColourTitle: string = "white"

  // public AcknBackgroundColor: string = "red";
  // public CriticalBackgroundColor: string = "orange";

  // public CornerRadius: number = 10;

  // public FontValueSize: number = 16;
  // public FontValueColor: string = "black";
  // public fontFamily: string = "\"Segoe UI\", wf_segoe-ui_normal, helvetica, arial, sans-serif"
  // public CompanyFontSize: number = 20;
} 



export class CircleSettings2{

  

  public circleColor2: string = 'yellow'
  public circleThickness2: number = 3;
  public displayUnits: number = 1000000 ;

}



export class VisualSettings extends DataViewObjectsParser {
      public prevYear: PrevYearSetting = new PrevYearSetting();
      public thisYear: ThisYearSetting = new ThisYearSetting();

      public target: TargetSetting = new TargetSetting()

      }

// export class dataPointSettings {
//   // Default color
//   public defaultColor: string = "";
//   // Show all
//   public showAllDataPoints: boolean = true;
//   // Fill
//   public fill: string = "";
//   // Color saturation
//   public fillRule: string = "";
//   // Text Size
//   public fontSize: number = 12;
//   }

