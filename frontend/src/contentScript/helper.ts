import axios from "axios";

const getHTMLBody = async (url: string) => {
    const axiosResponse = await axios.get(url)
    return axiosResponse.data
}

const parseHtml = () => {

    const jobDetailsContainer = document.getElementsByClassName('jobs-unified-top-card__content--two-pane')[0] as HTMLElement;

    const position = jobDetailsContainer.querySelector('.jobs-unified-top-card__job-title')!.textContent!.trim();
    const company = jobDetailsContainer.querySelector('a.app-aware-link')!.textContent!.trim();
    const locationText = jobDetailsContainer
        .querySelector(".jobs-unified-top-card__primary-description")!.children![0].textContent!.trim()

    const locationPattern = /·\s*(.+?)\s+\(.+?\)/;

    const match = locationText.match(locationPattern);
    const location = match ? match[1] : "Location not found";

    return {
        position: position,
        company: company,
        location: location
    }
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    let msgData = JSON.parse(request);
    if (msgData.msg === "request") {
        const sendData = parseHtml();
        sendResponse(sendData);
    }
    return true;
});
