var menuObj = {
    opened: 0,   // 0 for closed, 1 or opened

    menuElement: {},
    setState: function(isOpened) {
         this.opened = isOpened;
         this.updateStyle();
    },
    getState : function() {
         return this.opened;
    },
    updateStyle: function() {
         let menuParent = document.getElementById("menu-container");
         if (menuParent.offsetWidth < menuElement.offsetWidth) {
              menuElement.style.width = "200px";
         } else {
              menuElement.style.width = "250px";
         }
         if (this.getState() == 0) {
              menuElement.style.left = (menuParent.offsetWidth + 10) + "px";
              menuElement.style.visibility = "hidden";
         }
         else {
              menuElement.style.left = (menuParent.offsetWidth - menuElement.offsetWidth) + "px";
              menuElement.style.visibility = "visible";
         }
    },

    init : function() {
         menuElement = document.getElementById("menu-items-container");
         this.setState(0);
    }
}

function fixMenu() {
    menuObj.updateStyle();
}

