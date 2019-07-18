// We match the end of the name using $= because the beginning of the name is 
// dynamically generated to avoid name clashes.
Behaviour.specify("input[name$=_isConfiguredByUrl]", 'GitHubSCMSourceRadioConfiguration', 0, function(e) {
    if (e.gitHubSCMSourceRadioConfiguration) {
        return;
    }

    var getNthParent = function(e, n) {
        while (n > 0) {
            if (e.parentNode) {
                e = e.parentNode;
                n--;
            } else {
                return null;
            }
        }
        return e;
    }

    // Todo: Replace with a query selector?
    var findNeighboringDynamicInput = function(e) {

        var inputTbody = getNthParent(e, 4 /*tbody > tr > td > label > input*/);
        if (inputTbody) {
            var radioblockStart = getNthParent(e, 3 /* tr > td > label > input*/);
            // input hidden is always in the 4th position
            var hiddenBlock = radioblockStart.parentNode.childNodes[4].firstElementChild.firstElementChild
            return hiddenBlock
        }
    }
    var neighboringDynamicInput = findNeighboringDynamicInput(e);
    if (neighboringDynamicInput) {
        e.onclick = function() {
            neighboringDynamicInput.value = e.value;
            // When changing to true the event is triggered.
            if(e.value == "false"){
                if (document.createEvent) {
                    oEvent = document.createEvent("HTMLEvents");
                    oEvent.initEvent("change");
                    var repoOwner = getNthParent(e, 3).nextElementSibling.nextElementSibling.nextElementSibling.childNodes[2].firstElementChild
                    if( repoOwner != null) {
                        repoOwner.dispatchEvent(oEvent);
                    }
                }
            }
        };
    }
    e.gitHubSCMSourceRadioConfiguration = true;
});
