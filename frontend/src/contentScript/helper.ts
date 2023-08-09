interface AppData {
	pos: string;
	company: string;
	loc: string;
	remote: string;
	jd: string;
}

const configureData = (document: Document) => {
	console.log(document.body);

	return ""
};

chrome.runtime.onMessage.addListener((msg, sender, callback) => {
	console.log("Message received from extension: " + msg);
	const data = configureData(document);
	callback({ data: data });
});
