const simpleSliders = {
    "simpleSliderMovingWindows" : [],
    "simpleSlidersTouchesStart" : [],
    getSliders : function (){
        this.simpleSliderMovingWindows = document.getElementsByClassName ("simpleslider-moving-part"); 
        for (i = 0; i < this.simpleSliderMovingWindows.length; i++) {
	    this.simpleSlidersTouchesStart.push(0);
	}
    },
    getSliderLeftPos : function (nslider) {
        actualPosLeft = this.simpleSliderMovingWindows["simpleslider-moving-part" + nslider].offsetLeft;
	return actualPosLeft;
    },
    initSliders : function () {
        for (i = 0; i < this.simpleSliderMovingWindows.length; i++) {
	    this.setSliderPos(i, 0);
	    this.simpleSliderMovingWindows[i].addEventListener("touchstart", this.touchStartHandler);
	    this.simpleSliderMovingWindows[i].addEventListener("touchmove", this.touchEndHandler);
	}
    },
    getSliderWidth: function (nslider) {
        actualWidth = this.simpleSliderMovingWindows["simpleslider-moving-part" + nslider].offsetWidth;
	return actualWidth;
    },
    getSliderParentWidth : function (nslider) {
        actualParentWidth = this.simpleSliderMovingWindows["simpleslider-moving-part" + nslider].parentElement.offsetWidth;
	return actualParentWidth;
    },
    setSliderWidth : function (nslider, sliderWidth) {
        this.simpleSliderMovingWindows["simpleslider-moving-part" + nslider].parentElement.style.width = sliderWidth + "px";
    },
    fitSliderWindow : function (nslider) {
        parent = this.simpleSliderMovingWindows["simpleslider-moving-part" + nslider].parentElement;
        parentWidth = parent.parentElement.offsetWidth;
        theWidth = 0;
        for (i = 1; this.getItemsWidth(nslider) * i < parentWidth; i++) {
            theWidth = theWidth + this.getItemsWidth(nslider);
        }
        this.setSliderWidth(nslider,theWidth);
    },
    getSliderRightPos : function (nslider) {
        actualPosRight =  this.getSliderParentWidth (nslider) - this.getSliderLeftPos (nslider) - this.getSliderWidth (nslider);
	return actualPosRight;
    },
    setSliderPos : function (nslider, position) {
	this.simpleSliderMovingWindows["simpleslider-moving-part" + nslider].style.left = position + "px";
    },
    setItemsDims : function (nslider, itemWidth, itemHeight) {
           this.simpleSliderMovingWindows["simpleslider-moving-part" + nslider].style.height = itemHeight + "px";
               this.simpleSliderMovingWindows["simpleslider-moving-part" + nslider].parentElement.style.height = itemHeight + "px";
           for (i = 0; i < this.simpleSliderMovingWindows["simpleslider-moving-part" + nslider].children.length; i++) {
               this.simpleSliderMovingWindows["simpleslider-moving-part" + nslider].children[i].style.width = itemWidth + "px";
               this.simpleSliderMovingWindows["simpleslider-moving-part" + nslider].children[i].style.height = itemHeight + "px";
               }
    },
    fixSliderPos : function (nslider) {
        if (this.getSliderLeftPos(nslider) > 0) {
	    this.setSliderPos(0);
	} else if (this.getSliderRightPos(nslider) > 0) {
	    this.setSliderPos(nslider, this.getSliderLeftPos(nslider) + this.getSliderRightPos(nslider));
	}
    },
    getItemsWidth : function (nslider) {
        imWidth = this.simpleSliderMovingWindows["simpleslider-moving-part" + nslider].children[0].offsetWidth;
	return imWidth;
    },
    moveSlider : function (nslider, step) {       
        stepWide =  this.getItemsWidth(nslider);
        if (step < 0) {
	    if (this.getSliderRightPos(nslider) >= 0) {
		stepWide = this.getSliderRightPos(nslider);
		step = 0 - step;
	    } else {
                stepOffset = Math.abs(this.getSliderRightPos(nslider)) % stepWide;
                if (stepOffset > 0) { stepWide = stepOffset; }
	    }
	} else if (step > 0) {
	    if (this.getSliderLeftPos(nslider) >= 0) {
		stepWide = this.getSliderLeftPos(nslider);
		step = 0 - step;
	    } else {
                stepOffset = Math.abs(this.getSliderLeftPos(nslider)) % stepWide;
                if (stepOffset > 0) { stepWide = stepOffset; }
	    }
	}
        this.setSliderPos (nslider, this.getSliderLeftPos(nslider) + (step * stepWide));
    },
    touchStartHandler : function (eventObj) {
        eventObj.preventDefault();
	touchWhere = eventObj.touches[0].clientX;
        touchWho = eventObj.currentTarget.id;
	touchWhoIndex = parseInt(touchWho.substring(24));
        simpleSliders.simpleSlidersTouchesStart[touchWhoIndex] = touchWhere;
    },
    touchEndHandler : function (eventObj) {
       eventObj.preventDefault();
        touchWhere = eventObj.touches[0].clientX;
        touchWho = eventObj.currentTarget.id;
	touchWhoIndex = parseInt(touchWho.substring(24));
        if (touchWhere < simpleSliders.simpleSlidersTouchesStart[touchWhoIndex]) {
	    simpleSliders.moveSlider(touchWhoIndex, -1);
	} else if (touchWhere > simpleSliders.simpleSlidersTouchesStart[touchWhoIndex]) {
	    simpleSliders.moveSlider(touchWhoIndex, 1);
	}
    },
    resizeHandler : function (eventObj) {
        eventObj.preventDefault();
	for (i = 0; i < simpleSliders.simpleSliderMovingWindows.length; i++) {
            a = i;
            simpleSliders.fitSliderWindow(a);
            simpleSliders.fixSliderPos(a);
	}
    }
}

window.onresize = simpleSliders.resizeHandler;
