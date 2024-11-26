/* 
    贴子样式简易调整
    v0.1 by iw 2024.11.26
*/

const bgColors = ["white", "antiquewhite", "lavender", "darkseagreen", "palegoldenrod"];


let lineHeight = 26;
let fontSize = 15;
let brMarginTop = 16;
let shouldSmileyAdjust = 1;
let bgColorIndex = 1;

//Test
let lineHeightTest = 26;
let fontSizeTest = 15;
let brMarginTopTest = 16;
let shouldSmileyAdjustTest = 1;
let bgColorIndexTest = 1;


//Default
let lineHeightDefault = 24;
let fontSizeDefault = 14;
let brMarginTopDefault = 0;
let shouldSmileyAdjustDefault = 0;
let bgColorIndexDefault = 0;


//TODO
let letterSpacing = 0.5;


let hasInitialized = false;

let style; 


window.addEventListener('load', function () {

    // console.log("before getting storage", lineHeight, fontSize, brMarginTop, shouldSmileyAdjust, bgColorIndex);

    chrome.storage.local.get(["lineHeight", "fontSize", "brMarginTop", "shouldSmileyAdjust", "bgColorIndex"], (result)=>{

        // console.log("get storage result", result);
        
          
        

        // console.log(result.lineHeight, result.fontSize, result.brMarginTop, result.shouldSmileyAdjust, result.bgColorIndex)

        if(typeof(result.lineHeight) !== 'undefined') lineHeight = parseInt(result.lineHeight); 
        if(typeof(result.fontSize) !== 'undefined') fontSize = parseInt(result.fontSize);
        if(typeof(result.brMarginTop) !== 'undefined') brMarginTop = parseInt(result.brMarginTop); 
        if(typeof(result.shouldSmileyAdjust) !== 'undefined') shouldSmileyAdjust = parseInt(result.shouldSmileyAdjust);
        if(typeof(result.bgColorIndex) !== 'undefined') bgColorIndex = parseInt(result.bgColorIndex);



        // console.log("after getting storage", lineHeight, fontSize, brMarginTop, shouldSmileyAdjust, bgColorIndex);

        if(!hasInitialized){
            style= document.createElement('style');
            style.textContent = `
                .d_post_content{
                    line-height: `+lineHeight+`px;
                    
                    font-size: `+ fontSize +`px;
                    background-color: `+bgColors[bgColorIndex]+`;
                    
                }

                .d_post_content br{
                    content: "";
                    display: block;
                    margin-top: `+ brMarginTop +`px;
                }
                

                .d_post_content .replace_div{
                    text-indent: 0px;
                }

                .BDE_Smiley{
                    vertical-align: text-bottom;
                    width: `+ (shouldSmileyAdjust?(parseInt(fontSize)+3):30) +`px;
                    height: `+ (shouldSmileyAdjust?(parseInt(fontSize)+3):30) +`px;
                }

                #myTable td{
                    
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;

                    display: inline-grid;
                }
                
                #colorGroup{
                    background-color: `+ bgColors[bgColorIndex] + `;
                }

            `;
            document.head.appendChild(style);

            hasInitialized = true;
        }
        


        

        const tbui_fbar_top = document.querySelector(".tbui_fbar_top");
        tbui_fbar_top.insertAdjacentHTML('afterend', `<table id="myTable" style="position:absolute; bottom: 60px; left: 55px; width: 115px; " >
            <tr>
                <td style="width:80px" >字体</td>
                <td><input id="inputFontSize" type="number" style="width:30px" min="10" max="26" value="`+ fontSize + `" /></td>
            </tr>
            <tr>
                <td style="width:80px" >行高</td>
                <td><input id="inputLineHeight" type="number" style="width:30px" min="20" max="30" value="`+ lineHeight + `" /></td>
            </tr>
            <tr>
                <td style="width:80px" >段距</td>
                <td><input id="inputBRMarginTop" type="number" style="width:30px" min="0" max="30" value="`+ brMarginTop + `" /></td>
            </tr>
            <tr>
                <td style="width:80px" >表情匹配行高</td>
                <td><input  id="inputSmileyMatchLineHeight" type="checkbox" `+(shouldSmileyAdjust?"checked":"")+` /></td>
            </tr>
            <tr>
                <td style="width:80px" >底色</td>
                <td>
                    <select id="colorGroup" value="1" style="width:30px;">
                        <option value="0" `+(bgColorIndex==0?"selected":"")+` style="background-color: white">A</option>
                        <option value="1" `+(bgColorIndex==1?"selected":"")+` style="background-color: antiquewhite">B</option>
                        <option value="2" `+(bgColorIndex==2?"selected":"")+` style="background-color: lavender">C</option>
                        <option value="3" `+(bgColorIndex==3?"selected":"")+` style="background-color: darkseagreen">D</option>
                        <option value="4" `+(bgColorIndex==4?"selected":"")+` style="background-color: palegoldenrod">E</option>
                    </select>


                </td>
            </tr>
            <tr>
                <td style="width:80px" ><input id="inputButtonTest" type="button" value="测试样式" style="-webkit-appearance: auto;"/></td>
                <td></td>
            </tr>
            <tr>
                <td style="width:80px" ><input id="inputButtonDefault" type="button" value="恢复原状" style="-webkit-appearance: auto;"/></td>
                <td></td>
            </tr>
        </table>`);


        const inputFontSize = document.getElementById('inputFontSize');

        inputFontSize.addEventListener('change', function (e) {
            // console.log('Input value changed:', e.target.value);

            fontSize = e.target.value;
            updateStyle();
        });

        const inputLineHeight = document.getElementById('inputLineHeight');
        inputLineHeight.addEventListener('change', function (e) {
            // console.log('Input value changed:', e.target.value);

            lineHeight = e.target.value;
            updateStyle();
        });

        const inputBRMarginTop = document.getElementById('inputBRMarginTop');
        inputBRMarginTop.addEventListener('change', function (e) {
            // console.log('Input value changed:', e.target.value);

            brMarginTop = e.target.value;
            updateStyle();
        });


        const inputSmileyMatchLineHeight = document.getElementById('inputSmileyMatchLineHeight');
        inputSmileyMatchLineHeight.addEventListener('change', function (e) {
            // console.log('Input value changed:', e.target.checked);

            shouldSmileyAdjust = e.target.checked ? 1 : 0;
            updateStyle();
        });

        

        
        

        const colorGroup = document.getElementById('colorGroup');
        colorGroup.addEventListener('change', function (e) {
            // console.log('colorGroup value changed:', e.target.value);

            bgColorIndex = e.target.value;
            updateStyle();
        });



        const inputButtonTest = document.getElementById("inputButtonTest");
        inputButtonTest.addEventListener("click", function(e){
            // console.log("inputButtonTest clicked");

            lineHeight = lineHeightTest;
            fontSize = fontSizeTest;
            brMarginTop = brMarginTopTest;
            
            shouldSmileyAdjust = shouldSmileyAdjustTest;
            bgColorIndex = bgColorIndexTest;


            
            inputLineHeight.value = lineHeight;
            inputFontSize.value = fontSize;
            inputBRMarginTop.value = brMarginTop;
            inputSmileyMatchLineHeight.checked = shouldSmileyAdjust?true:false;
            colorGroup.selectedIndex = bgColorIndex;

            updateStyle();
        });


        
        const inputButtonDefault = document.getElementById("inputButtonDefault");
        inputButtonDefault.addEventListener("click", function(e){
            // console.log("inputButtonDefault clicked");

            lineHeight = lineHeightDefault;
            fontSize = fontSizeDefault;
            brMarginTop = brMarginTopDefault;
            
            shouldSmileyAdjust = shouldSmileyAdjustDefault;
            bgColorIndex = bgColorIndexDefault;


            
            inputLineHeight.value = lineHeight;
            inputFontSize.value = fontSize;
            inputBRMarginTop.value = brMarginTop;
            inputSmileyMatchLineHeight.checked = shouldSmileyAdjust?true:false;
            colorGroup.selectedIndex = bgColorIndex;


            updateStyle();
        });
    })
    
    

});

function updateStyle(){

    
    const prefs = {
        fontSize: fontSize,
        lineHeight: lineHeight,
        brMarginTop: brMarginTop,
        shouldSmileyAdjust: shouldSmileyAdjust,
        bgColorIndex: bgColorIndex
    }
    
    
    chrome.storage.local.set(prefs);

    style.textContent = `
        .d_post_content{
            line-height: `+ lineHeight + `px;
            
            font-size: `+ fontSize + `px;
            background-color: `+ bgColors[bgColorIndex] + `;
            
        }

        .d_post_content br{
            content: "";
            display: block;
            margin-top: `+ brMarginTop + `px;
        }
        

        .d_post_content .replace_div{
            text-indent: 0px;
        }

        .BDE_Smiley{
            vertical-align: text-bottom;
            width: `+ (shouldSmileyAdjust?(parseInt(fontSize)+3):30) + `px;
            height: `+ (shouldSmileyAdjust?(parseInt(fontSize)+3):30) + `px;
        }

        #myTable td{
            
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;

            display: inline-grid;
        }

        #colorGroup{
            background-color: `+ bgColors[bgColorIndex] + `;
        }

    `;
}