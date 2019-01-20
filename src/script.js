//@ts-check
/// <reference path="../node_modules/@types/jquery/index.d.ts" />

const userName = 'hhyyg';
const notApprovedColor = '#d3dded';

$(function () {
    page_overview();
    page_pullrequests();
});

async function page_overview() {
    if (location.pathname !== '/dashboard/overview') {
        return;
    }

    // Click Read more button
    // TODO: if exist click
    await $('p button').click();

    $("table tr[data-qa='pull-request-row']")
        .each((i, pullRequestRowElement) => {
            // const url = $(pullRequestRowElement)
            //     .find("a[data-qa='pull-request-row-link']")
            //     .attr('href');

            const userElement = $(pullRequestRowElement)
                .find(`a[href='https://bitbucket.org/${userName}/']`);

            const next = $(userElement).next();
            if (next && next.length !== 0) {
            } else {
                $(pullRequestRowElement).css('background-color', notApprovedColor);
            }
        });

}

function page_pullrequests() {

    if (location.pathname !== '/dashboard/pullrequests') {
        return;
    }

    $("table tbody tr")
        .each((i, pullRequestRowElement) => {
            const approvalMark = $(pullRequestRowElement)
                .find('.approval-link');

            const approved = $(approvalMark).hasClass('approved');
            if (!approved) {
                $(pullRequestRowElement).css('background-color', notApprovedColor);
            }
        });

}
