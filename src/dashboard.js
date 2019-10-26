/// <reference path="../node_modules/@types/jquery/index.d.ts" />

const space = "&nbsp;";

const data = window.__initial_state__;
const pullRequests = data.dashboard.overview.pullRequests;
const currentUserNickName = data.global.currentUser.nickname;
const notApprovedColor = "#d3dded";

function getSpanDay(x, y) {
  return Math.ceil((y - x) / 86400000);
}

/**
 * Insert text 'opened * days ago,'
 * @param {*} pullRequestRowElement 
 * @param {*} created_on 
 */
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
      return value.user.nickname === currentUserNickName && value.approved === false;
    }).length !== 0;

  if (notApproved) {
    $(pullRequestRowElement).css("background-color", notApprovedColor);
  }
}

// pull requests to review
const DecoratioPullRequestsToReview = () => {
  $("section:eq(0) table tr[data-qa='pull-request-row']").each(
    (pullRequestRowIndex, pullRequestRowElement) => {
      console.log(pullRequestRowIndex);
      const reviewing = pullRequests.reviewing[pullRequestRowIndex];

      addOpendDaysText(pullRequestRowElement, reviewing.created_on);
      highLightingNotApproved(pullRequestRowElement, reviewing);
    }
  );
}

// your pull requests
const DecorationYourPullRequests = () => {
  $("section:eq(1) table tr[data-qa='pull-request-row']").each(
    (pullRequestRowIndex, pullRequestRowElement) => {
      const myPullRequest = pullRequests.authored[pullRequestRowIndex];
      addOpendDaysText(pullRequestRowElement, myPullRequest.created_on);
    }
  );
}

const clickReadmoreButtonIfExist = setInterval(() => {
  if ($('p button').length) {
      $('p button').click();
      clearInterval(clickReadmoreButtonIfExist);
  }
}, 1000);

setTimeout(DecoratioPullRequestsToReview, 2000);
setTimeout(DecorationYourPullRequests, 2000);
