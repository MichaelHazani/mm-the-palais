// almost exactly https://github.com/yashatgit/MMM-CalendarNotifications/

const NodeHelper = require("node_helper");
const _ = require("lodash");
// const player = require("play-sound")((opts = {}));
const Sound = require('aplay');
let config = null;
const eventsInMemoryCache = {};

var exec = require('child_process').exec;
exec('echo aplay ./audio/alert.wav');

const registerEventNotification = (eventStartingIn, event) => {
	// console.log(`notifying in ${eventStartingIn} millis`);

	let announcementMessage = config.announcementText;
	if (Array.isArray(config.announcementText)) {
		announcementMessage = config.announcementText[Math.floor(Math.random() * config.announcementText.length)];
	}
	setTimeout(() => {
		console.log(event.title);
	this.sendSocketNotification('PLAY_SOUND', 'wobble.wav');
	}, eventStartingIn);
};

const registerEventNotifications = (events) => {
	const currentTimeInMillis = +new Date();
	_.forEach(events, (event) => {
		const eventTimeInMillis = parseInt(event.startDate);
		const pendingMillisForEvent = eventTimeInMillis - currentTimeInMillis - config.notificationLeadTime;
		if (pendingMillisForEvent > 0 && pendingMillisForEvent < 86400000 && !eventsInMemoryCache[eventTimeInMillis]) {
			registerEventNotification(pendingMillisForEvent, event);
			eventsInMemoryCache[eventTimeInMillis] = true; //to prevent registering event for same time
		}
	});
};

module.exports = NodeHelper.create({
	socketNotificationReceived: (notification, payload) => {
		if (notification === "CONFIG") {
			if (!config) {
				config = payload;
			}
		}
		if (notification === "MMM_CALENDAR_NOTIFICATIONS" && config) {
			//registerEventNotifications(sampleEvents);
			registerEventNotifications(payload);
		}
	}
});
