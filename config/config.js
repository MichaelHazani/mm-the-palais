/* Magic Mirror Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
	address: "localhost", 	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/", 	// The URL path where MagicMirror is hosted. If you are using a Reverse proxy
					// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], 	// Set [] to allow all IP addresses
															// or add a specific IPv4 of 192.168.1.5 :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
															// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"],
	timeFormat: 24,
	units: "imperial",
	// serverOnly:  true/false/"local" ,
	// local for armv6l processors, default
	//   starts serveronly and then starts chrome browser
	// false, default for all NON-armv6l devices
	// true, force serveronly mode, because you want to.. no UI on this device

	modules: [
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_left",
			clockBold: "true"
		},
		{
			module: "calendar",
			header: "l i o n h e a r t",
			position: "top_right",
			config: {
				calendars: [
					{
						symbol: "calendar-check",
						url: "https://calendar.google.com/calendar/ical/1ecie0nb1a7d5a2suq6mva8iqs%40group.calendar.google.com/private-63488f5e4ac59a26a097f33839e4fe9e/basic.ics"
					}
				],
			},
		},
		{
			module: "currentweather",
			position: "top_left",
			config: {
				location: "Seattle",
				locationID: "5809805", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				appid: "45379c5c6739e2f01584f6f857ab12fd"
			}
		},
		{
			module: "weatherforecast",
			position: "bottom_left",
			header: "Weather Forecast",
			config: {
				location: "Seattle",
				locationID: "5809805", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				appid: "45379c5c6739e2f01584f6f857ab12fd",
				colored: "true",
				fadePoint: 1,
				maxNumberOfDays: 7,
			}
		},
		{
			module: "helloworld",
			position: "top_bar",
			config: {
				text: "The Palais"
			}
		},
			{
		module: 'MMM-Sounds',
		config: {
			startupSound:   'wobble.wav',
			quietTimeStart: '23:00',      // 11pm
			quietTimeEnd:   '07:00'       // 7am
		}
	},
		{
			module: 'MMM-eventsoundplayer',
			position: 'top_right',
			config: {
				notificationLeadTime: 1000, // 1 sec
				announcementText: 'Upcoming event',
			},
		}
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
