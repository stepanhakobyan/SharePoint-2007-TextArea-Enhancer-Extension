//console.log("NicEditInit.js");

//function addNicEdit2() {
//    console.log("starting addNicEdit2");
//    let reviewArea = document.querySelector("textarea.ms-long") as HTMLTextAreaElement;
//    if (!reviewArea) {
//        console.log("addNicEdit2 add stoped, no review area found");
//        return;
//    }

//    try {
//        new nicEditor().panelInstance(reviewArea.id);
//        console.log("addNicEdit2 succeeded");

//        addMutationObserver2();

//    } catch (ex) {
//        console.error(ex);
//        console.log("addNicEdit2 failed");
//    }
//}



//function addMutationObserver2() {
//    let mute = new MutationObserver(
//        (evnt) => {
//            console.log('findEditorfound');
//            let reviewArea = document.querySelector('textarea.ms-long') as HTMLTextAreaElement;
//            let nicEdit = nicEditors.findEditor(reviewArea.id);
//            let addArea = document.getElementById(reviewArea.id) as HTMLTextAreaElement;
//            addArea.textContent = nicEdit.getContent();
//        });

//    let nicEditArr = document.getElementsByClassName('nicEdit-main');
//    if (nicEditArr && nicEditArr.length > 0) {
//        let nicEdit = nicEditArr[0];
//        let config = { attributes: true, childList: true, characterData: true };
//        mute.observe(nicEdit, config);
//        console.log('nicEdit-main found');
//    } else {
//        console.error('nicEdit-main not found');
//    }
//}

//addNicEdit2();