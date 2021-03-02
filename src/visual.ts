/*
*  Power BI Visual CLI
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

import "core-js/stable";
import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import DataView = powerbi.DataView;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;
import VisualObjectInstanceEnumeration = powerbi.VisualObjectInstanceEnumeration;

import { VisualSettings } from "./settings";
import IVisualHost = powerbi.extensibility.IVisualHost;
import DataViewCategorical = powerbi.DataViewCategorical;

// import valueFormatter = powerbi.extensibility.utils.formatting.valueFormatter;
import { valueFormatter } from "powerbi-visuals-utils-formattingutils";
import { textMeasurementService } from "powerbi-visuals-utils-formattingutils";

import * as d3 from "d3";
import { color } from "d3";
type Selection<T extends d3.BaseType> = d3.Selection<T, any, any, any>;

export interface TextProperties  {

    text: string,
    fontFamily: string,
    fontSize: string

}
export class Visual implements IVisual {
    public visualSettings: VisualSettings;

    private host: IVisualHost;
    private svg: Selection<SVGElement>;
    private container: Selection<SVGElement>;

    private container2: Selection<SVGElement>;

    private textValue1: Selection<SVGElement>;
    private textValue2: Selection<SVGElement>;
    private textValue3: Selection<SVGElement>;


    private signal: Selection<SVGPolygonElement>
    private signal2: Selection<SVGPolygonElement>
    
    private box1: Selection<SVGElement>;
    private box2: Selection<SVGElement>;
    private box3: Selection<SVGElement>;

    private svg1: Selection<SVGElement>;
    // private textLabel1: Selection<SVGElement>;

    // private textValue2: Selection<SVGElement>;
    // private textLabel2: Selection<SVGElement>;

    // private textValue3: Selection<SVGElement>;
    // private textLabel3: Selection<SVGElement>;

    // private textValue4: Selection<SVGElement>;
    // private textLabel4: Selection<SVGElement>;

    // private orgName: Selection<SVGElement>;

    // private textValueOpen: Selection<SVGElement>;
    // private textValueAckn: Selection<SVGElement>;


    // private box1: Selection<SVGElement>;
    // private box2: Selection<SVGElement>;
    // private box3: Selection<SVGElement>;
    // private box4: Selection<SVGElement>;


    constructor(options: VisualConstructorOptions) {

       
        this.svg = d3.select(options.element)
            .append('svg')
            .classed('circleCard', true);

        this.container = this.svg.append("g")
            .classed('container', true);


        this.signal = this.container.append('polygon').classed('polygon',true)
        this.signal2 = this.container.append('polygon').classed('polygon',true)

        this.box1 = this.container.append('rect').classed('textBox',true)
        this.box2 = this.container.append('rect').classed('textBox',true)
        this.box3 = this.container.append('rect').classed('textBox',true)

        this.textValue1 = this.container.append('text').classed('textBox', true)

        this.textValue2 = this.container.append('text').classed('textBox', true)
        this.textValue3 = this.container.append('text').classed('textBox', true)



    }


    public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration {
        const settings: VisualSettings = this.visualSettings || <VisualSettings>VisualSettings.getDefault();
        return VisualSettings.enumerateObjectInstances(settings, options);
    }




    public update(options: VisualUpdateOptions) {

        let dataView1: DataView = options.dataViews[0];

        this.visualSettings = VisualSettings.parse<VisualSettings>(dataView1);



        console.log(dataView1)

        

        let textHeightPrevYear = Math.trunc(textMeasurementService.measureSvgTextHeight( {text:"P",fontFamily: this.visualSettings.prevYear.fontFamily.toString(), fontSize: this.visualSettings.prevYear.fontSize.toString()}))
        let textHeightThisYear = textMeasurementService.measureSvgTextHeight( {text:"P",fontFamily: this.visualSettings.thisYear.fontFamily.toString(), fontSize: this.visualSettings.thisYear.fontSize.toString()})
        let textHeightTarget = textMeasurementService.measureSvgTextHeight( {text:"T",fontFamily: this.visualSettings.target.fontFamily.toString(), fontSize: this.visualSettings.target.fontSize.toString()})

    

        let iValueFormatterPrevYear = valueFormatter.create({ value:  this.visualSettings.prevYear.displayUnits });
        let iValueFormatterThisYear = valueFormatter.create({ value:  this.visualSettings.thisYear.displayUnits });
        let iValueFormatterTarget = valueFormatter.create({ value:  this.visualSettings.target.displayUnits });




        // let formatedValue = iValueFormatterPrevYear.format(30000000)
        // console.log("Formated Value: ", formatedValue)

        let colorUpper = "white"
        let colorDown = "white"


        let parameterH = options.viewport.height
        let parameterW = options.viewport.width

        let firstWidth =  Math.trunc(parameterW/4)

        let boxWidth = (parameterW - firstWidth)*0.9

        let firstHeight = Math.trunc(parameterH/8)

        this.svg.attr('width', parameterW).attr('height', parameterH)

        let target = dataView1.table.rows[0][0]

        let thisYear = dataView1.table.rows[0][1]

        let prevYear = dataView1.table.rows[0][2]

        
       
        if (thisYear<target){

            colorDown = "red"
            colorUpper = "#191741"
        }else if( thisYear >= target)
        {

            colorDown = "#191741"
            colorUpper = "green"


        }


        let boxHeight = Math.trunc((parameterH - firstHeight - 30)/3)

        if(boxHeight<20){
            boxHeight=20
        }else if(boxHeight>100){
            boxHeight=100
        }

      
        let sideLength = firstWidth/2



        let pointsUp= `${(firstWidth/2).toString()} , ${(firstHeight  +10).toString()}  ,${(firstWidth/2 -25 ).toString()},  ${(firstHeight  +60).toString()}, ${(firstWidth/2 + 25).toString()},  ${(firstHeight  +60).toString()}`

        let pointsUp1= `${(firstWidth/2).toString()} , ${(firstHeight  +10).toString()}  ,${(firstWidth/2 -sideLength/2 ).toString()},  ${(firstHeight  + Math.trunc(sideLength*1.73/2)).toString()}, ${(firstWidth/2 + sideLength/2).toString()},  ${(firstHeight  +  Math.trunc(sideLength*1.73/2)).toString()}`


        let pointsDown= `${(firstWidth/2).toString()}, ${(firstHeight  + 2*Math.trunc(1.73*sideLength/2)).toString()}  ,${(firstWidth/2 -sideLength/2 ).toString()},  ${(firstHeight  + Math.trunc(sideLength*1.73/2) + 10 ).toString()}, ${(firstWidth/2 + sideLength/2).toString()},  ${(firstHeight  +Math.trunc(sideLength*1.73/2)+10).toString()}`

        

        this.signal.attr("points",pointsUp1).attr("fill",colorUpper)
        this.signal2.attr("points",pointsDown).attr("fill",colorDown).attr("visibility","visible")
       
        this.box1.attr('x', firstWidth).attr('y',firstHeight).attr("width", boxWidth.toString()).attr('height',boxHeight)
        .attr("rx",this.visualSettings.target.cornerRadius)
        .attr("ry",this.visualSettings.target.cornerRadius)
        .style('fill',this.visualSettings.target.backgroundColour)
        .style("fill-opacity","0.75")

        this.box2.attr('x', firstWidth).attr('y',firstHeight + boxHeight +10).attr("width", boxWidth.toString()).attr('height',boxHeight)
        .attr("rx",this.visualSettings.thisYear.cornerRadius)
        .attr("ry",this.visualSettings.thisYear.cornerRadius)
        .style('fill',this.visualSettings.thisYear.backgroundColour)
        .style("fill-opacity","0.75")


        this.box3.attr('x', firstWidth).attr('y',firstHeight + 2* boxHeight +2*10).attr("width", boxWidth.toString()).attr('height',boxHeight).style("fill-opacity","0.25")
        .attr("rx",this.visualSettings.prevYear.cornerRadius)
        .attr("ry",this.visualSettings.prevYear.cornerRadius)
        .style('fill',this.visualSettings.prevYear.backgroundColour)
        .style("fill-opacity","0.75")


        // this.textValue3.text(`The Goal:  ${iValueFormatterTarget.format(target).toString()}` ).attr('x',firstWidth+10).attr('y',firstHeight + 2*boxHeight +2*10 + boxHeight/2 + textHeightTarget/4)
        // .style("font-size", this.visualSettings.target.fontSize)
        // .style("fill", this.visualSettings.target.fontColour)
        // .style("font-family", this.visualSettings.target.fontFamily)

        // this.textValue2.text(`This Year: ${iValueFormatterThisYear.format(thisYear).toString()}` ).attr('x',firstWidth+10).attr('y',firstHeight + boxHeight +10 + boxHeight/2 + textHeightThisYear/4)
        // .style("font-size", this.visualSettings.thisYear.fontSize)
        // .style("fill", this.visualSettings.thisYear.fontColour)
        // .style("font-family", this.visualSettings.thisYear.fontFamily)
        




        this.textValue1.text(`Target: ${iValueFormatterTarget.format(target).toString()}` ).attr('x',firstWidth+10).attr('y',firstHeight + boxHeight/2 + textHeightTarget/4)
        .style("font-size", this.visualSettings.target.fontSize)
        .style("fill", this.visualSettings.target.fontColour)
        .style("font-family", this.visualSettings.target.fontFamily)

        this.textValue2.text(`This Year: ${iValueFormatterThisYear.format(thisYear).toString()}` ).attr('x',firstWidth+10).attr('y',firstHeight + boxHeight +10 + boxHeight/2 + textHeightThisYear/4)
        .style("font-size", this.visualSettings.thisYear.fontSize)
        .style("fill", this.visualSettings.thisYear.fontColour)
        .style("font-family", this.visualSettings.thisYear.fontFamily)


        this.textValue3.text(`Prev. Year:  ${iValueFormatterTarget.format(prevYear).toString()}` ).attr('x',firstWidth+10).attr('y',firstHeight + 2*boxHeight +2*10 + boxHeight/2 + textHeightThisYear/4)
        .style("font-size", this.visualSettings.prevYear.fontSize)
        .style("fill", this.visualSettings.prevYear.fontColour)
        .style("font-family", this.visualSettings.prevYear.fontFamily)
        



        // this.textValue2.text(`This Year: ${iValueFormatterThisYear.format(thisYear).toString()}` ).attr('x',firstWidth+10).attr('y',firstHeight + boxHeight +10 + boxHeight/2 + textHeightThisYear/4)
        // .style("font-size", this.visualSettings.thisYear.fontSize)
        // .style("fill", this.visualSettings.thisYear.fontColour)
        // .style("font-family", this.visualSettings.thisYear.fontFamily)
        


        // this.textValue3.text(`The Goal:  ${iValueFormatterTarget.format(target).toString()}` ).attr('x',firstWidth+10).attr('y',firstHeight + 2*boxHeight +2*10 + boxHeight/2 + textHeightTarget/4)
        // .style("font-size", this.visualSettings.target.fontSize)
        // .style("fill", this.visualSettings.target.fontColour)
        // .style("font-family", this.visualSettings.target.fontFamily)


        


        

        // this.box3.attr('x', 120).attr('y',300).attr('width', 200).attr('height',50)

    }



}