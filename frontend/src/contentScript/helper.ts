import axios from "axios";

const getHTMLBody = async (url: string) => {
    const axiosResponse = await axios.get(url)
    return axiosResponse.data
}

const parseHtml = (url: string) => {

    const data = {
        position: "",
        company: "",
        location: ""
    }

    switch (url) {
        case "linkedin": {
            const jobDetailsContainer = document.getElementsByClassName('jobs-unified-top-card__content--two-pane')[0] as HTMLElement;
            const locationText = jobDetailsContainer
                .querySelector(".jobs-unified-top-card__primary-description")!.children![0].textContent!.trim()
            const locationPattern = /·\s*(.+?)\s+\(.+?\)/;
            const match = locationText.match(locationPattern);

            data.location = match ? match[1] : "Location not found";
            data.position = jobDetailsContainer.querySelector('.jobs-unified-top-card__job-title')!.textContent!.trim();
            data.company = jobDetailsContainer.querySelector('a.app-aware-link')!.textContent!.trim();
        }
    }

    return data;
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    let msgData = JSON.parse(request);
    console.log(msgData)
    if (msgData.msg === "request") {
        const sendData = parseHtml(msgData.url);
        sendResponse(sendData);
    }
    return true;
});
