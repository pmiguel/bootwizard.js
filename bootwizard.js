/*    BootWizard.js 1.0
*
*     A modal wizard framework based on Twitter Bootstrap
*     Creates wizard-like modals (multistage) on a modal dialog box
*
*     Dependencies: Twitter Bootstrap, jQuery
*
*     Pedro Miguel Leal
*     v1.0 - JAN 2015
*/

/* Configures the wizard's stage list with IDs. Should be handled by wizard setup */
function configureStages(wizardElement) {
      var list = wizardElement.find(".wizard-list").first();
      var wizardId = wizardElement.attr("id");
      var numNodes = 0;
      // get list of modal-content nodes
      $(list).find(".wizard-stage").each(function(index) {
            // set an unique ID for each modal-content node
            var stageCode = wizardId + "-" + index;
            $(this).attr("id", stageCode);
            numNodes++;
      });
      list.attr("data-stages", numNodes);
      return numNodes;
}

/* Sets the active stage to the one specified by the stageNo */
function setStage(wizardElement, stageNo) {
      var wizardId = wizardElement.attr("id");
      var activeDiv = wizardElement.find("#" + wizardId + "-" + "activeContainer").first();
      var stageId = "#" + wizardId + "-" + stageNo;

      var max = parseInt(wizardElement.find(".wizard-list").attr("data-stages"));
      if(stageNo >= max || stageNo < 0) {
            console.log("Bootwizard - No stage with such id.");
            return;
      }
      activeDiv.attr("data-active", stageNo);
      activeDiv.html($(stageId).clone())
}

/* configured the wizard's active container with an ID and current / max stages.
   should be handled by the setup */
function configureContainer(wizardElement) {
      var activeDiv = wizardElement.find(".modal-dialog").first();
      console.log(activeDiv);
      var wizardId = wizardElement.attr("id");
      activeDiv.attr("id", wizardId + "-" + "activeContainer");

      activeDiv.attr("data-max", wizardElement.find(".wizard-list").attr("data-stages") - 1);
      setStage(wizardElement, 0);
}


/* Configures a wizard based on the wizard's ID. */
function configureWizard(wizardId) {
      var wizardElement = $(wizardId);
      var numNodes = configureStages(wizardElement);
      if(numNodes == 0) {
            console.log("The specified wizard does not have any stages");
      }
      configureContainer(wizardElement);
}

/* Closes the button's parent wizard */
function bwClose(element) {
      var wizardElement = $(element).parents(".wizard");
      var wizardId = wizardElement.attr("id");
      var activeContainer = wizardElement.find(".wizard-active-container").first();
      wizardElement.modal('hide');
}

/* Opens wizard with set ID */
function bwOpen(wizardId) {
      setStage($(wizardId), 0);
      $(wizardId).modal('show');
}

/* Switches to the next stage, if available */
function bwNext(element) {
      var wizardElement = $(element).parents(".wizard");
      var activeContainer = wizardElement.find(".wizard-active-container").first();
      var activeStage = parseInt(activeContainer.attr("data-active"));
      var nextStageId = activeStage + 1;
      setStage(wizardElement, nextStageId);
}

/* Switches to the previous stage, if available */
function bwPrev(element) {
      var wizardElement = $(element).parents(".wizard");
      var activeContainer = wizardElement.find(".wizard-active-container").first();
      var activeStage = parseInt(activeContainer.attr("data-active"));
      var nextStageId = activeStage - 1;
      setStage(wizardElement, nextStageId);
}
