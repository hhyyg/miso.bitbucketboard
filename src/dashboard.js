/// <reference path="../node_modules/@types/jquery/index.d.ts" />

const space = "&nbsp;";

const data = window.__initial_state__;
const pullRequests = data.dashboard.overview.pullRequests;
const userName = data.global.currentUser.username;
const notApprovedColor = "#d3dded";

function getSpanDay(x, y) {
  return Math.ceil((y - x) / 86400000);
}

function addOpendDaysText(pullRequestRowElement, created_on) {
  if (!created_on) {
    return;
  }

  const spanDay = getSpanDay(new Date(created_on), new Date());
  $(pullRequestRowElement)
    .find("small")
    .prepend(
      `<span>opened${space}<bold>${spanDay}</bold>${space}days ago,${space}</span>`
    );
}

function highLightingNotApproved(pullRequestRowElement, reviewing) {
  const notApproved =
    reviewing.participants.filter(value => {
      return value.user.username === userName && value.approved === false;
    }).length !== 0;

  if (notApproved) {
    $(pullRequestRowElement).css("background-color", notApprovedColor);
  }
}

// pull requests to review
$("section:eq(0) table tr[data-qa='pull-request-row']").each(
  (pullRequestRowIndex, pullRequestRowElement) => {
    const reviewing = pullRequests.reviewing[pullRequestRowIndex];

    addOpendDaysText(pullRequestRowElement, reviewing.created_on);
    highLightingNotApproved(pullRequestRowElement, reviewing);
  }
);

// your pull requests
$("section:eq(1) table tr[data-qa='pull-request-row']").each(
  (pullRequestRowIndex, pullRequestRowElement) => {
    const myPullRequest = pullRequests.authored[pullRequestRowIndex];
    addOpendDaysText(pullRequestRowElement, myPullRequest.created_on);
  }
);
