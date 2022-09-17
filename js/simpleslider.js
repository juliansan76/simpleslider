// Slider handling functions.

function sldMoveItem (nSlider, whereTo) {
    if (whereTo == 0) {     //previous
       if (sldsObjs[nSlider].sldItemPosition > 0) {
           sldsObjs[nSlider].sldItemPosition = sldsObjs[nSlider].sldItemPosition - 1;
       } 
    } else {                //next                
       if ((sldsObjs[nSlider].sldItemCount - sldsObjs[nSlider].sldItemPosition) > sldsObjs[nSlider].sldItemsAllowed) {
           sldsObjs[nSlider].sldItemPosition = sldsObjs[nSlider].sldItemPosition + 1;
       } 
    }
}

function sldPlaceListInWindow (nSlider) {
    let sldList = document.getElementById("sld" + nSlider + "itemslist");
    let sldListWindow = document.getElementById("sld" + nSlider + "itemswindow");
    let sldListWidth = sldList.offsetWidth;
    sldList.style.left = "-" + (sldsObjs[nSlider].sldItemPosition * sldsObjs[nSlider].sldItemWide) + "px";

    sldsObjs[nSlider].sldStartFlag = 0;
    sldsObjs[nSlider].sldEndFlag = 0;
    if (sldsObjs[nSlider].sldItemPosition == 0) sldsObjs[nSlider].sldStartFlag = 1;
    if ((sldsObjs[nSlider].sldItemCount - sldsObjs[nSlider].sldItemPosition) <= sldsObjs[nSlider].sldItemsAllowed) sldsObjs[nSlider].sldEndFlag = 1;

    let sldPrevButton = document.getElementById("sld" + nSlider + "prevbutton");
    let sldNextButton = document.getElementById("sld" + nSlider + "nextbutton");
    if (sldsObjs[nSlider].sldStartFlag == 1) {
        sldPrevButton.style.cursor = "not-allowed";
        sldPrevButton.innerHTML = "-";
    } else {
        sldPrevButton.style.cursor = "pointer";
        sldPrevButton.innerHTML = "&#10092;";
    }
    if (sldsObjs[nSlider].sldEndFlag == 1) {
        sldNextButton.style.cursor = "not-allowed";
        sldNextButton.innerHTML = "-";
    } else {
        sldNextButton.style.cursor = "pointer";
        sldNextButton.innerHTML = "&#10093;";
    }
}

function sldTouchStart(sldTouchEvent, nSlider) {
    sldsObjs[nSlider].sldTouchStartX = sldTouchEvent.changedTouches[0].pageX;
}

function sldTouchEnd(sldTouchEvent, nSlider) {
    let sldMoveDirection = 0;  // Slide default to right
    sldTouchMoveX = sldTouchEvent.changedTouches[0].pageX - sldsObjs[nSlider].sldTouchStartX;

    if (sldTouchMoveX < -50) {
         sldMoveDirection = 1; // Slide left
    }
    if (Math.abs(sldTouchMoveX) > 50) pushSld(nSlider, sldMoveDirection);
}

function sldAdjust(nSlider) {
    let sldListParent = document.getElementById("sld" + nSlider);
    let sldList = document.getElementById("sld" + nSlider + "itemslist");
    let sldListWindow = document.getElementById("sld" +nSlider + "itemswindow");
    let sldListItems = sldList.children;

    if (sldListParent.offsetWidth < sldsObjs[nSlider].sldItemWide) {
        sldsObjs[nSlider].sldItemWide = sldListParent.offsetWidth;
    }

    //Adjust slider width
    for ( i = 1; ((i * sldsObjs[nSlider].sldItemWide) <= sldListParent.offsetWidth) && (i <= sldsObjs[nSlider].sldItemCount) ; i++) {
        sldsObjs[nSlider].sldItemsAllowed = i;
    }

    //Adjust the items div widths
    for (i = 0; i < sldListItems.length; i++){
        sldListItems[i].style.width = sldsObjs[nSlider].sldItemWide + "px";
        sldListItems[i].style.height = sldsObjs[nSlider].sldItemWide + "px";
    }

    sldListWindow.style.width = (sldsObjs[nSlider].sldItemsAllowed * sldsObjs[nSlider].sldItemWide) + "px";
    if ((sldsObjs[nSlider].sldItemCount - sldsObjs[nSlider].sldItemPosition) < sldsObjs[nSlider].sldItemsAllowed) {
        sldsObjs[nSlider].sldItemPosition = sldsObjs[nSlider].sldItemCount - sldsObjs[nSlider].sldItemsAllowed;
    }
    sldPlaceListInWindow(nSlider);  
}

function sldInit(nSlider) {
    sldsObjs[nSlider].sldItemCount = sldsObjs[nSlider].sldContentArray.length;
    sldAdjust(nSlider);

}

function pushSld(nSlider, whereTo) {
   sldMoveItem(nSlider, whereTo);
   sldPlaceListInWindow(nSlider);
}



function genSlider(nSlider){
    let newSlider = document.getElementById("sld" + nSlider); // Get the new slider DIV
    let newSliderWindow = document.createElement("div");
    newSliderWindow.setAttribute("id", "sld" + nSlider + "itemswindow");
    newSliderWindow.setAttribute("class", "sld-container");
    newSliderWindow.setAttribute("ontouchstart", "sldTouchStart(event," + nSlider + ")");
    newSliderWindow.setAttribute("ontouchend", "sldTouchEnd(event," + nSlider + ")");
    let newSliderList = document.createElement("div");
    newSliderList.setAttribute("id", "sld" + nSlider + "itemslist");
    newSliderList.setAttribute("class", "sld-items-list");
    for (i = 0; i < sldsObjs[nSlider].sldContentArray.length; i++) {
         sldItemDiv = document.createElement("div");
         sldItemDiv.setAttribute("class", "sld-item");
            sldItemLink = document.createElement("a");
            sldItemLink.setAttribute("href", sldsObjs[nSlider].sldContentArray[i].imgLink);
              sldItemImg = document.createElement("img");
              sldItemImg.setAttribute("src", sldsObjs[nSlider].sldContentArray[i].imgPath);
              sldItemImg.setAttribute("width", "100%");
              sldItemImg.setAttribute("height", "auto");
            sldItemLink.appendChild(sldItemImg);
         sldItemDiv.appendChild(sldItemLink);
         sldItemDesc = document.createElement("span");
         sldItemDesc.setAttribute("class", "sld-item-description");
         sldItemDesc.innerHTML =  sldsObjs[nSlider].sldContentArray[i].descrText;
         sldItemDiv.appendChild(sldItemDesc);
         newSliderList.appendChild(sldItemDiv);
    }
    newSliderWindow.appendChild(newSliderList);
    let newSliderPrevButton = document.createElement("div");
    newSliderPrevButton.setAttribute("id", "sld" + nSlider + "prevbutton");
    newSliderPrevButton.setAttribute("class", "sld-prev-button");
    newSliderPrevButton.setAttribute("onclick", "javascript:pushSld(" + nSlider + ",0)");
    newSliderPrevButton.innerHTML = "&#10094;";
    newSliderWindow.appendChild(newSliderPrevButton);

    let newSliderNextButton = document.createElement("div");
    newSliderNextButton.setAttribute("id", "sld" + nSlider + "nextbutton");
    newSliderNextButton.setAttribute("class", "sld-next-button");
    newSliderNextButton.setAttribute("onclick", "javascript:pushSld(" + nSlider + ",1)");
    newSliderNextButton.innerHTML = "&#10095;";
    newSliderWindow.appendChild(newSliderNextButton);

    newSlider.appendChild(newSliderWindow);
}

function sldMake(nSld) {
    genSlider(nSld);
    sldInit(nSld);
}

function adjustAllSlds() {
    for (j = 0; j < sldsObjs.length; j++) {
        sldAdjust(j);
    }
}

function renderAllSliders() {
    for (m = 0; m < sldsObjs.length; m++) sldMake(m);
}
