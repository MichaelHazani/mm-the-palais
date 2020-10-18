// almost exactly https://github.com/yashatgit/MMM-CalendarNotifications/

Module.register("MMM-eventsoundplayer", {
	defaults: {
		text: "play cal event sounds"
	},
	start: function () {
		this.sendSocketNotification("CONFIG", this.config);
		Log.info("Starting MMM-CalendarNotifications module");
	},
	notificationReceived: function (notification, payload) {
		if (notification === "CALENDAR_EVENTS") {
			this.sendSocketNotification("MMM_CALENDAR_NOTIFICATIONS", payload);
		}
	},
	getDom: function () {
		const wrapper = document.createElement("div");
		wrapper.innerHTML = ``;
		return wrapper;
	}
});
